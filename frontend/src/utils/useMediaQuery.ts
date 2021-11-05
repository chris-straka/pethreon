import { useEffect, useState } from "react"

// https://samuelkraft.com/blog/responsive-animation-framer-motion
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)
    media.addEventListener("MediaQueryListEvent", () => {
      setMatches(media.matches)
    })
  }, [matches, query])

  return matches
}