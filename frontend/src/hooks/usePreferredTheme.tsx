import { useState, useEffect } from "react"

export const usePreferredTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const preferredTheme = prefersDarkQuery.matches ? 'dark' : 'light'
    setTheme(preferredTheme)

    const handleMediaChange = (event: MediaQueryListEvent) => {
      const updatedTheme = event.matches ? 'dark' : 'light'
      setTheme(updatedTheme)
    }

    prefersDarkQuery.addEventListener('change', handleMediaChange)

    return () => {
      prefersDarkQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return theme
}