import { QueryClient } from "react-query"

export function atom<T>({
  key,
  initialValue,
}: {
  key: string
  initialValue?: T
}) {
  const queryClient = new QueryClient()
  queryClient.setQueryData(key, initialValue)
  const existingValue = localStorage.getItem(key)
  if (initialValue && existingValue === null) {
    localStorage.setItem(key, JSON.stringify(initialValue))
  }
  return key
}
