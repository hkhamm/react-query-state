import { useMutation, useQuery, useQueryClient } from "react-query"

export function useAtom<T>(key: string): [T | null, (value: T | null) => void] {
  const queryClient = useQueryClient()
  const { data } = useQuery(key, () => {
    const value = localStorage.getItem(key)
    return value === null ? value : (JSON.parse(value) as T)
  })
  const { mutate } = useMutation(
    (value: T | null) =>
      new Promise(() => localStorage.setItem(key, JSON.stringify(value))),
    {
      onMutate: (mutatedData) => {
        const current = data
        queryClient.setQueryData(key, mutatedData)
        return current
      },
      onError: (_, __, rollback) => {
        queryClient.setQueryData(key, rollback)
      },
    }
  )
  return [data as T, (value: T | null) => mutate(value)]
}
