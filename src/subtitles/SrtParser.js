export function cleanSrtEncoding(raw) {
    let text = raw
        .replace(/^(\s*\.)+\s*/, '')
        .replace(/Ifyouâve youâ€™ve/g, "If you've")
        .replace(/If you've you've/gi, "If you've")
        .replace(/youâve/g, "you've")
        .replace(/youâ€™ve/g, "you've")
        .replace(/theyâre/g, "they're")
        .replace(/theyâ€™re/g, "they're")
        .replace(/weâve/g, "we've")
        .replace(/weâ€™ve/g, "we've")
        .replace(/donât/g, "don't")
        .replace(/donâ€™t/g, "don't")
        .replace(/friendâs/g, "friend's")
        .replace(/friendâ€™s/g, "friend's")
        .replace(/trendâkind/g, "trend - kind")
        .replace(/trendâ€”kind/g, "trend - kind")
        .replace(/regularworkingclass/g, "regular working-class")
        .replace(/shallowaestheticobsessed/g, "shallow, aesthetic-obsessed")
        .replace(/inlowpoly/g, "in low-poly")
        .replace(/lowrise/g, "low-rise")
        .replace(/Miu Miumicroskirt/g, "Miu Miu micro-skirt")
        .replace(/â€™/g, "'")
        .replace(/â€”/g, " - ")
        .replace(/—/g, " - ")
        .replace(/â€œ/g, '"')
        .replace(/â€/g, '"')
        .replace(/\b(you've)\s+(you've)\b/gi, '$1')
        .replace(/\s+/g, ' ')
        .trim();
    // Strip leading punctuation that breaks sentence aesthetic (e.g. ", Emma Stone" or "? The aggressive")
    text = text.replace(/^[,;?!\-–—.\s]+/, '').trim();
    return text;
}
function timeStringToSeconds(tStr) {
    // Format: "00:01:23,456"
    const [hms, ms] = tStr.trim().split(",");
    const [h, m, s] = hms.split(":").map(Number);
    return h * 3600 + m * 60 + s + (parseInt(ms || "0", 10) / 1000);
}
export function parseSrt(srtContent) {
    const normalized = srtContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const blocks = normalized.split(/\n\n+/);
    const items = [];
    for (const block of blocks) {
        const lines = block.trim().split("\n");
        if (lines.length < 2)
            continue;
        const id = parseInt(lines[0].trim(), 10);
        const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
        if (!timeMatch)
            continue;
        const start = timeStringToSeconds(timeMatch[1]);
        const end = timeStringToSeconds(timeMatch[2]);
        const textLines = lines.slice(2).join(" ");
        const clean = cleanSrtEncoding(textLines);
        if (clean.length > 0) {
            items.push({
                id,
                start,
                end,
                text: textLines,
                cleanText: clean,
                words: clean.split(" ").filter(w => w.length > 0),
            });
        }
    }
    return items;
}
export function getActiveSubtitle(subtitles, timeSec) {
    for (const sub of subtitles) {
        if (timeSec >= sub.start && timeSec <= sub.end) {
            return sub;
        }
    }
    return null;
}
