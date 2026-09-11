import fs from "node:fs";
import path from "node:path";

export interface LlmConfig {
  provider: "gemini" | "openai" | "anthropic" | "nvidia";
  apiKey: string;
  model: string;
  endpoint?: string;
}

export interface LlmRequest {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  jsonMode?: boolean;
  timeoutMs?: number;
}

function loadEnvKeys(): Record<string, string> {
  const env: Record<string, string> = { ...process.env } as Record<string, string>;
  const envPaths = ["/root/.env", path.resolve(process.cwd(), ".env")];
  for (const p of envPaths) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, "utf8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eq = trimmed.indexOf("=");
          if (eq > 0) {
            const k = trimmed.slice(0, eq).trim();
            const v = trimmed.slice(eq + 1).trim();
            if (!env[k]) env[k] = v;
          }
        }
      } catch {}
    }
  }
  return env;
}

export function resolveLlmConfig(): LlmConfig | null {
  const env = loadEnvKeys();

  if (env.GEMINI_API_KEY || env.GOOGLE_API_KEY) {
    return {
      provider: "gemini",
      apiKey: env.GEMINI_API_KEY || env.GOOGLE_API_KEY,
      model: "gemini-3-flash-preview",
    };
  }

  if (env.NVIDIA_API_KEY) {
    return {
      provider: "nvidia",
      apiKey: env.NVIDIA_API_KEY,
      model: "meta/llama-3.3-70b-instruct",
      endpoint: "https://integrate.api.nvidia.com/v1",
    };
  }

  if (env.OPENAI_API_KEY) {
    return {
      provider: "openai",
      apiKey: env.OPENAI_API_KEY,
      model: "gpt-4o-mini",
      endpoint: env.OPENAI_BASE_URL || "https://api.openai.com/v1",
    };
  }

  if (env.ANTHROPIC_API_KEY) {
    return {
      provider: "anthropic",
      apiKey: env.ANTHROPIC_API_KEY,
      model: "claude-3-5-haiku-latest",
    };
  }

  return null;
}

export async function callLlm(req: LlmRequest, customConfig?: LlmConfig): Promise<string> {
  const config = customConfig ?? resolveLlmConfig();
  if (!config) {
    throw new Error("No LLM API key found in environment or /root/.env");
  }

  const timeoutMs = req.timeoutMs ?? 60000;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);

  try {
    if (config.provider === "gemini") {
      const modelsToTry = [config.model, "gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
      let lastGeminiErr: any = null;

      for (const m of modelsToTry) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${config.apiKey}`;
        const payload: Record<string, unknown> = {
          contents: [
            {
              role: "user",
              parts: [{ text: `${req.systemPrompt}\n\nTask:\n${req.userPrompt}` }],
            },
          ],
          generationConfig: {
            temperature: req.temperature ?? 0.2,
          },
        };

        if (req.jsonMode) {
          (payload.generationConfig as Record<string, unknown>).responseMimeType = "application/json";
        }

        for (let attempt = 0; attempt < 2; attempt++) {
          const attemptCtrl = new AbortController();
          const attemptTimer = setTimeout(() => attemptCtrl.abort(), req.timeoutMs ?? 30000);

          try {
            const res = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
              signal: attemptCtrl.signal,
            });

            if (res.status === 503 || res.status === 429) {
              const waitMs = (attempt + 1) * 1000;
              await new Promise((r) => setTimeout(r, waitMs));
              continue;
            }

            if (!res.ok) {
              const errText = await res.text();
              throw new Error(`Gemini API HTTP ${res.status}: ${errText.slice(0, 300)}`);
            }

            const data = (await res.json()) as {
              candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
            };
            const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (resultText) return resultText;
          } catch (e: any) {
            lastGeminiErr = e;
          } finally {
            clearTimeout(attemptTimer);
          }
        }
      }

      throw lastGeminiErr || new Error("Gemini API call failed after trying all fallback models");
    }

    if (config.provider === "openai" || config.provider === "nvidia") {
      const url = (config.endpoint ?? "https://api.openai.com/v1") + "/chat/completions";
      const messages = [
        { role: "system", content: req.systemPrompt },
        { role: "user", content: req.userPrompt },
      ];

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model,
          messages,
          temperature: req.temperature ?? 0.2,
          response_format: req.jsonMode ? { type: "json_object" } : undefined,
        }),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`${config.provider} HTTP ${res.status}: ${errText.slice(0, 300)}`);
      }

      const data = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      return data.choices?.[0]?.message?.content ?? "";
    }

    if (config.provider === "anthropic") {
      const url = "https://api.anthropic.com/v1/messages";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: config.model,
          max_tokens: 4000,
          system: req.systemPrompt,
          messages: [{ role: "user", content: req.userPrompt }],
          temperature: req.temperature ?? 0.2,
        }),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Anthropic HTTP ${res.status}: ${errText.slice(0, 300)}`);
      }

      const data = (await res.json()) as {
        content?: Array<{ type?: string; text?: string }>;
      };
      return data.content?.find((c) => c.type === "text")?.text ?? "";
    }

    throw new Error(`Unsupported provider: ${config.provider}`);
  } finally {
    clearTimeout(timer);
  }
}

export function parseLlmJson<T = any>(raw: string): T {
  if (!raw || typeof raw !== "string") {
    throw new Error("Cannot parse empty or non-string LLM response");
  }

  // 1. If wrapped in markdown code fence (```json ... ``` or ``` ... ```)
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  let text = fenceMatch ? fenceMatch[1].trim() : raw.trim();

  // 2. Try direct parsing
  try {
    return JSON.parse(text) as T;
  } catch (initialErr) {
    // 3. Fallback: extract substring between first { and last }, or first [ and last ]
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(text.substring(firstBrace, lastBrace + 1)) as T;
      } catch (_) {}
    }

    const firstBracket = text.indexOf("[");
    const lastBracket = text.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket > firstBracket) {
      try {
        return JSON.parse(text.substring(firstBracket, lastBracket + 1)) as T;
      } catch (_) {}
    }

    // 4. Try scanning raw string in case fence matching sliced incorrectly
    const rawFirstBrace = raw.indexOf("{");
    const rawLastBrace = raw.lastIndexOf("}");
    if (rawFirstBrace !== -1 && rawLastBrace > rawFirstBrace) {
      try {
        return JSON.parse(raw.substring(rawFirstBrace, rawLastBrace + 1)) as T;
      } catch (_) {}
    }

    throw new Error(
      `Failed to parse JSON from LLM response (${(initialErr as Error).message}). Snippet: ${text.slice(0, 150)}...`
    );
  }
}
