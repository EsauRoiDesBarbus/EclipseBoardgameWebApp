import { Trans } from '@lingui/macro'
import { AboutModal } from './features/about/AboutModal'
import { ColorModeToggle } from './theme/ColorModeToggle'
import { LocaleSelect } from './LocaleSelect'
import { FunctionComponent, useState } from 'react'

export const Header: FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
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
        <ColorModeToggle />
        <LocaleSelect />
        <a href="https://forms.gle/Ud5MHFKXUMSHkwhW9" target="_blank" rel="noreferrer">
          <Trans>Feedback</Trans>
        </a>
      </div>
      <AboutModal
        show={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      />
    </>
  )
}
