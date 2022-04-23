import { useMutation, useQuery, useQueryClient } from "react-query"

export function useAtom<T>(
  key: string
): [T | undefined, (value: T | undefined) => void] {
  const queryClient = useQueryClient()
  const { data } = useQuery(key, () => {
    const value = localStorage.getItem(key)
    return value === null || value === undefined
      ? undefined
      : (JSON.parse(value) as T)
  })
  const { mutate } = useMutation(
    (value: T | undefined) =>
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
  return [data as T, (value: T | undefined) => mutate(value)]
}
