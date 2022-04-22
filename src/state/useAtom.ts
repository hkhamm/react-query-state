import { UseMutateFunction } from "react-query"
import { useAtomValue } from "./useAtomValue"
import { useSetAtom } from "./useSetAtom"

export function useAtom<Value>(
  key: string
): [
  Value | null | undefined,
  UseMutateFunction<Value, unknown, Value, unknown>
] {
  return [useAtomValue<Value>(key), useSetAtom<Value>(key)]
}
