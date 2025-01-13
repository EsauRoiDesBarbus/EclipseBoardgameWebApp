import { MoonIcon } from 'src/assets/icons/MoonIcon'
import { SunIcon } from 'src/assets/icons/SunIcon'

import { ColorModeProvider, ColorModes } from './ColorModeContext'
import { useColorMode } from './useColorMode'

const Component = () => {
  const { colorMode, setColorMode } = useColorMode()
  const nextColorMode = colorMode === ColorModes.light ? ColorModes.dark : ColorModes.light

  return (
    <button
      type="button"
      title={`Switch between dark and light mode (currently ${colorMode} mode)`}
      onClick={() => setColorMode(nextColorMode)}
      style={{ display: 'flex', padding: 8 }}>
      {colorMode === ColorModes.light ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export const ColorModeToggle = () => (
  <ColorModeProvider>
    <Component />
  </ColorModeProvider>
)
