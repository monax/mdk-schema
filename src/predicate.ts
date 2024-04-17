export function splitOnPredicate<T, F>(
  predicate: (t: T | F) => t is T,
): (ts: (T | F)[]) => { trues: T[]; falses: F[] } {
  return (ts) => {
    const trues: T[] = [];
    const falses: F[] = [];
    for (const t of ts) {
      if (predicate(t)) {
        trues.push(t);
      } else {
        falses.push(t);
      }
    }
    return { trues, falses };
  };
}
