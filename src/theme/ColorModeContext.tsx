import React, { useState, useCallback, useEffect, useMemo, type ReactNode } from 'react'

const storageKey = 'theme-color-mode'

export const ColorModes = {
  light: 'light',
  dark: 'dark',
} as const

export type ColorMode = (typeof ColorModes)[keyof typeof ColorModes]

export type ContextValue = {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
}

export const ColorModeContext = React.createContext<ContextValue | undefined>(undefined)

// Ensure to always return a valid colorMode even if input is invalid
const coerceToColorMode = (colorMode?: string | null): ColorMode =>
  colorMode === ColorModes.light ? ColorModes.light : ColorModes.dark

const getInitialColorMode = (): ColorMode => {
  const storedColor = localStorage.getItem(storageKey)
  if (storedColor) return coerceToColorMode(storedColor)

  return coerceToColorMode(document.documentElement.getAttribute('data-theme'))
}

const storeColorMode = (newColorMode: ColorMode) => {
  localStorage.setItem(storageKey, coerceToColorMode(newColorMode))
}

function useContextValue(): ContextValue {
  const [colorMode, setColorModeState] = useState(getInitialColorMode())

  const setColorMode = useCallback(
    (newColorMode: ColorMode) => {
      if (newColorMode) {
        setColorModeState(newColorMode)
        storeColorMode(newColorMode)
      } else {
        setColorModeState(
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? ColorModes.dark
            : ColorModes.light
        )
      }
    },
    [setColorModeState]
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', coerceToColorMode(colorMode))
  }, [colorMode])

  return useMemo(
    () => ({
      colorMode,
      setColorMode,
    }),
    [colorMode, setColorMode]
  )
}

export function ColorModeProvider({ children }: { children: ReactNode }): JSX.Element {
  const value = useContextValue()
  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>
}
