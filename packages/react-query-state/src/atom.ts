import { QueryClient } from "react-query"

export function atom<Value>({ key, read }: { key: string; read: Value }) {
  const queryClient = new QueryClient()
  queryClient.setQueryData(key, read)
  const value = localStorage.getItem(key) as unknown as Value | null | undefined
  if (value === null || value === undefined) {
    localStorage.setItem(key, JSON.stringify(read))
  }
  return key
}
