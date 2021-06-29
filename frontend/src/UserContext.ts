import { createContext } from 'react';

export const UserContext = createContext<{
  user: string | null,
  setUser: any | null // TODO
}>({
  user: null,
  setUser: null
})