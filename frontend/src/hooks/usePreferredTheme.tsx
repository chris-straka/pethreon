import { useMediaQuery } from "./useMediaQuery"

export const usePreferredTheme = (): 'light' | 'dark' =>
  useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
