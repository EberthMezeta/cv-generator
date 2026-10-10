import { useEffect, useState } from 'react'

function readStoredValue<T>(key: string): T | null {
  try {
    const storedJson = localStorage.getItem(key)
    return storedJson === null ? null : (JSON.parse(storedJson) as T)
  } catch {
    return null
  }
}

function writeStoredValue<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return
  }
}

export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStoredValue<T>(key) ?? initialValue)

  useEffect(() => writeStoredValue(key, value), [key, value])

  return [value, setValue] as const
}
