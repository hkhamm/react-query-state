import { QueryClient } from "react-query"

let keyCount = 0

export function atom<T>(initialValue?: T) {
  const queryClient = new QueryClient()
  const key = `react-query-state-atom-${keyCount++}`
  const existingValue = localStorage.getItem(key)
  queryClient.setQueryData(key, existingValue === null ?? initialValue)
  if (initialValue && existingValue === null) {
    localStorage.setItem(key, JSON.stringify(initialValue))
  }
  return key
}
