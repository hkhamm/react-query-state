import { QueryClient } from "react-query"

let keyCount = 0

export function atom<T>(initialValue?: T) {
  const queryClient = new QueryClient()
  const key = `react-query-state-atom-${keyCount++}`
  queryClient.setQueryData(key, initialValue)
  const existingValue = localStorage.getItem(key)
  if (initialValue && existingValue === null) {
    localStorage.setItem(key, JSON.stringify(initialValue))
  }
  return key
}
