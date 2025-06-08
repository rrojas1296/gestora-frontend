export function debounce<T extends (...args: string[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number,
) {
  let timer: NodeJS.Timeout;
  let pendingPromise: { resolve: (value: any) => void } | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (pendingPromise) {
      clearTimeout(timer);
    }

    return new Promise((resolve) => {
      pendingPromise = { resolve };
      timer = setTimeout(async () => {
        const result = await fn(...args);
        pendingPromise?.resolve(result);
        pendingPromise = null;
      }, delay);
    });
  };
}
