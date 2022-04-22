import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query"

export function useAtom<T>(key: string): [T, (value: T) => void] {
  const queryClient = useQueryClient()
  const { data } = useQuery(key, () => localStorage.getItem(key))

  const { mutate: setValue } = useMutation(
    async (value: T) =>
      new Promise<T>((resolve) => {
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

  return [(data ? JSON.parse(data) : undefined) as T, setValue]
}

export function atom<T>({
  key,
  defaultValue,
}: {
  key: string
  defaultValue?: T
}) {
  const queryClient = new QueryClient()
  queryClient.setQueryData(key, defaultValue)
  localStorage.setItem(key, JSON.stringify(defaultValue))
  return key
}

export const testAtom = atom<string>({
  key: "test",
  defaultValue: "1",
})

export const TestInput: React.FC = () => {
  const [value, setValue] = useAtom<string>(testAtom)
  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}
