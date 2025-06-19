export function trimObject<T>(obj: Record<string, string>) {
  for (const key in obj) {
    obj[key] = obj[key].trim();
  }
  return obj as T;
}
