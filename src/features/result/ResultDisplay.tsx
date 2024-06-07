import { FunctionComponent } from 'react'
import { Trans } from '@lingui/macro'
import { formatPercent } from '../../utils/formatPercent'
import { CalculationResult } from './types'
import { ProbabilityDiagram } from './ProbabilityDiagram'

type Props = {
  result: CalculationResult
}

export const ResultDisplay: FunctionComponent<Props> = ({ result }) => (
  <div>
    <h2>
      <Trans>Results</Trans>
    </h2>
    <p>
      <Trans>Attacker wins:</Trans> {formatPercent(result.winChance)}
    </p>
    <ProbabilityDiagram
      survivalChances={result.survivalChances}
      height={400}
      width={Math.min(1096, window.innerWidth - 64)}
    />
  </div>
)
