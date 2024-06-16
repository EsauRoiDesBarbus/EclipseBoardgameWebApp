import { ComponentProps, FunctionComponent } from 'react'
import { Trans } from '@lingui/macro'

import { Modal } from 'src/ui/Modal'

type Props = Omit<ComponentProps<typeof Modal>, 'children'>

export const AboutModal: FunctionComponent<Props> = ({ ...props }) => (
  <Modal {...props}>
    <h1>
      <Trans>About</Trans>
    </h1>
    <div style={{ textAlign: 'start' }}>
      <p>
        <Trans>
          I don’t use random simulations, I use advanced tools of decision theory known as
        </Trans>{' '}
        <a href="https://en.wikipedia.org/wiki/Bellman_equation" target="_blank" rel="noreferrer">
          <Trans>Bellman value function programming</Trans>
        </a>{' '}
        <Trans>
          to compute win chance of{' '}
          <a
            href="https://boardgamegeek.com/boardgame/72125/eclipse"
            target="_blank"
            rel="noreferrer">
            Eclipse
          </a>{' '}
          battles, with:
        </Trans>
      </p>
      <ul>
        <li>
          <Trans>floating point precision (the UI truncates it for readability),</Trans>
        </li>
        <li>
          <Trans>graph with the probability of survival of each ship,</Trans>
        </li>
        <li>
          <Trans>
            optimal targeting: player ships deal damage in the way that maximizes their chance of
            winning, like a human player (non player ships follow non player targeting rules), check
            out the <i>Optimal damage splitting</i> demo for a tricky battle where damage needs to
            be split between 2 ships.
          </Trans>
        </li>
      </ul>
      <Trans>Any question, suggestion, bug report, use the feedback button.</Trans>
      <h2>
        <Trans>Credits</Trans>
      </h2>
      <ul>
        <li>
          <Trans>Etienne Bertin (aka. esauroidesbarbus) for the maths and the backend,</Trans>
        </li>
        <li>
          <a href="https://github.com/voisinhugo/" target="_blank" rel="noreferrer">
            Hugo Voisin
          </a>{' '}
          <Trans>for the frontend,</Trans>
        </li>
        <li>
          <Trans>FiF for OPS.</Trans>
        </li>
      </ul>
    </div>
  </Modal>
)
