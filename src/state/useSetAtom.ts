import { useMutation, useQuery, useQueryClient } from "react-query"

export function useSetAtom<Value>(key: string) {
  const queryClient = useQueryClient()
  const { data } = useQuery(key, () => localStorage.getItem(key))

  const { mutate: setAtom } = useMutation(
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

  return setAtom
}
