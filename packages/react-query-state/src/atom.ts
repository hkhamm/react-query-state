let keyCount = 0

export function atom<T>(initialValue?: T | null) {
  const key = `react-query-state-atom-${keyCount++}`
  const existingValue = localStorage.getItem(key)
  if (
    initialValue !== null &&
    initialValue !== undefined &&
    existingValue === null
  ) {
    localStorage.setItem(key, JSON.stringify(initialValue))
  }
  return key
}
