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
    <section className="modal-main" onClick={(e) => e.stopPropagation()}>
      {children}
      <button type="button" onClick={onClose} style={{ marginTop: 20 }}>
        Close
      </button>
    </section>
  </div>
)
