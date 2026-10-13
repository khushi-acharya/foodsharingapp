import { createContext, useContext } from 'react'

export const FoodContext = createContext(null)

export function useFood() {
  const context = useContext(FoodContext)
  if (!context) {
    throw new Error('useFood must be used inside the FoodContext provider')
  }
  return context
}
