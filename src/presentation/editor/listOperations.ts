export function replaceAt<T>(items: readonly T[], index: number, item: T): T[] {
  return items.map((current, currentIndex) => (currentIndex === index ? item : current))
}

export function removeAt<T>(items: readonly T[], index: number): T[] {
  return items.filter((_, currentIndex) => currentIndex !== index)
}

export function moveItem<T>(items: readonly T[], fromIndex: number, toIndex: number): T[] {
  const reordered = [...items]
  const [moved] = reordered.splice(fromIndex, 1)
  reordered.splice(toIndex, 0, moved)
  return reordered
}
