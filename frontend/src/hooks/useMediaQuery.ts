import { useCallback, useSyncExternalStore } from "react"

/**
 * Subscribes to a CSS media query.
 *
 * useSyncExternalStore is the right tool here: matchMedia is an external store,
 * so React reads it during render instead of the old
 * useState + useEffect + setState dance, which reported a wrong value on the
 * first paint and then triggered a second cascading render to correct it.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const list = window.matchMedia(query)
    list.addEventListener("change", onStoreChange)
    return () => list.removeEventListener("change", onStoreChange)
  }, [query])

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  // No matchMedia when prerendering: fall back to "does not match".
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
