import { Trans } from '@lingui/macro'
import { FunctionComponent, useState } from 'react'

import { AboutModal } from 'src/features/about/AboutModal'
import { LocaleSelect } from 'src/features/i18n/LocaleSelect'
import { ColorModeToggle } from 'src/theme/ColorModeToggle'

export const Header: FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 16,
      }}>
      <button
        type="button"
        onClick={() => {
          setShowModal(true)
        }}>
        <Trans>About</Trans>
      </button>
      <AboutModal
        show={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      />
      <ColorModeToggle />
      <LocaleSelect />
      <a href="https://forms.gle/Ud5MHFKXUMSHkwhW9" target="_blank" rel="noreferrer">
        <Trans>Feedback</Trans>
      </a>
    </div>
  )
}
