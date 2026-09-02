export function createStyleRegistry(packs) {
    return new Map(packs.map((p) => [p.id, p]));
}
export function resolveStyle(registry, id = "casually-explained") {
    const style = registry.get(id);
    if (!style) {
        throw new Error(`Unknown style '${id}'. Available: ${[...registry.keys()].join(", ")}`);
    }
    return style;
}
