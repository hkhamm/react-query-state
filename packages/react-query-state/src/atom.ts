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
  const existingValue = localStorage.getItem(key) as unknown as
    | T
    | null
    | undefined
  if (initialValue && (existingValue === null || existingValue === undefined)) {
    localStorage.setItem(key, JSON.stringify(initialValue))
  }
  return key
}
