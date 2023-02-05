import { useState, useEffect } from "react"

export const usePreferredMotion = () => {
  const [motion, setMotion] = useState<'reduced' | 'default'>('default')

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const preferredMotion = reducedMotionQuery.matches ? 'reduced' : 'default'
    setMotion(preferredMotion)

    const handleMediaChange = (event: MediaQueryListEvent) => {
      const updatedMotion = event.matches ? 'reduced' : 'default'
      setMotion(updatedMotion)
    }

    reducedMotionQuery.addEventListener('change', handleMediaChange)

    return () => {
      reducedMotionQuery.removeEventListener('change', handleMediaChange)
    }

  }, [])

  return motion
}