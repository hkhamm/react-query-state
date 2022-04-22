import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query"

export function useAtom<Value>(
  key: string
): [Value | null | undefined, UseMutateFunction<Value, unknown, Value>] {
  const queryClient = useQueryClient()
  const { data } = useQuery(key, () => {
    const value = localStorage.getItem(key)
    return value === null || value === undefined
      ? value
      : (JSON.parse(value) as Value)
  })
  const { mutate } = useMutation(
    async (value: Value) =>
      new Promise<Value>((resolve) => {
        localStorage.setItem(key, JSON.stringify(value))
        resolve(value)
      }),
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
  return [data, mutate]
}
