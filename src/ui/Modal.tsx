import { Trans } from '@lingui/macro'
import { FunctionComponent, PropsWithChildren } from 'react'

import './modal.css'

type Props = PropsWithChildren<{
  show: boolean
  onClose: () => void
}>

export const Modal: FunctionComponent<Props> = ({ show, onClose, children }) => (
  <div
    aria-modal="true"
    role="dialog"
    className="modal"
    style={show ? {} : { display: 'none' }}
    onClick={onClose}>
    <section
      autoFocus
      className="modal-main"
      onClick={(e) => {
        e.stopPropagation()
      }}>
      {children}
      <button
        type="button"
        onClick={onClose}
        className="primary"
        style={{ marginTop: 20, width: 'fit-content', alignSelf: 'center' }}>
        <Trans>Close</Trans>
      </button>
    </section>
  </div>
)
