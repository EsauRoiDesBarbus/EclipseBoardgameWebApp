import { useContext } from 'react'
import { ColorModeContext, ContextValue } from './ColorModeContext'

export function useColorMode(): ContextValue {
  const context = useContext(ColorModeContext)
  if (context == null) {
    throw new Error('ColorModeProvider is null')
  }
  return context
}
