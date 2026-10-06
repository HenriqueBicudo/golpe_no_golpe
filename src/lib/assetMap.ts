const modules = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const byFilename: Record<string, string> = {};
for (const path in modules) {
  const filename = path.split("/").pop();
  if (filename) byFilename[filename] = modules[path];
}

export function assetUrl(filename: string): string {
  return byFilename[filename] ?? "";
}
