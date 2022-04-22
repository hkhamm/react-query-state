import { QueryClient } from "react-query"

export function atom<Value>({
  key,
  initialValue,
}: {
  key: string
  initialValue: Value
}) {
  const queryClient = new QueryClient()
  queryClient.setQueryData(key, initialValue)
  const existingValue = localStorage.getItem(key) as unknown as
    | Value
    | null
    | undefined
  if (existingValue === null || existingValue === undefined) {
    localStorage.setItem(key, JSON.stringify(initialValue))
  }
  return key
}
