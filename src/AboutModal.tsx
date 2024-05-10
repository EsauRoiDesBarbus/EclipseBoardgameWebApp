import { ComponentProps, FunctionComponent } from 'react'
import { Modal } from './Modal'

type Props = Omit<ComponentProps<typeof Modal>, 'children'>

export const AboutModal: FunctionComponent<Props> = ({ ...props }) => (
  <Modal {...props}>
    <h1>About</h1>
    <p style={{ textAlign: 'start' }}>
      I'm a lil' Raspberry Pi doing some big maths.
      <br />
      <br />I don't use random simulations, I use advanced tools of decision theory known as{' '}
      <a href="https://en.wikipedia.org/wiki/Bellman_equation" target="_blank" rel="noreferrer">
        Bellman value function programming
      </a>{' '}
      to compute win chance of{' '}
      <a href="https://boardgamegeek.com/boardgame/72125/eclipse" target="_blank" rel="noreferrer">
        Eclipse
      </a>{' '}
      battles, with:
      <ul>
        <li>floating point precision (the UI truncs it for readability),</li>
        <li>graph with the probability of survival of each ship,</li>
        <li>
          optimal targeting: player ships deal damage in the way that maximizes their chance of
          winning, like a human player (non player ships follow non player targeting rules), check
          out the <i>Optimal damage splitting</i> demo for a tricky battle where damage needs to be
          split between 2 ships.
        </li>
      </ul>
      Any question, suggestion, bug report, use the feedback button.
      <h2>Credits</h2>
      <ul>
        <li>Etienne Bertin (aka. esauroidesbarbus) for the maths and the backend,</li>
        <li>
          <a href="https://github.com/voisinhugo/" target="_blank" rel="noreferrer">
            Hugo Voisin
          </a>{' '}
          for the frontend.
        </li>
      </ul>
    </p>
  </Modal>
)
