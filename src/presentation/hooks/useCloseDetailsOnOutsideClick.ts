import { useEffect, type RefObject } from 'react'

export function useCloseDetailsOnOutsideClick(detailsRef: RefObject<HTMLDetailsElement | null>) {
  useEffect(() => {
    const closeWhenClickedOutside = (event: PointerEvent) => {
      const details = detailsRef.current
      if (details?.open && !details.contains(event.target as Node)) details.open = false
    }
    document.addEventListener('pointerdown', closeWhenClickedOutside)
    return () => document.removeEventListener('pointerdown', closeWhenClickedOutside)
  }, [detailsRef])
}
