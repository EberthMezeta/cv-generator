import { useEffect, useState } from 'react'

function readStoredValue(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStoredValue(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    return
  }
}

export function usePersistentState(key: string, initialValue: string) {
  const [value, setValue] = useState(() => readStoredValue(key) ?? initialValue)

  useEffect(() => writeStoredValue(key, value), [key, value])

  return [value, setValue] as const
}
