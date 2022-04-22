import { useQuery } from "react-query"

export function useAtomValue<Value>(key: string) {
  const { data } = useQuery(key, () => {
    const value = localStorage.getItem(key)
    return value === null || value === undefined
      ? value
      : (JSON.parse(value) as Value)
  })
  return data
}
