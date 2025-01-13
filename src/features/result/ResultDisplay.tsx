import { Trans } from '@lingui/macro'
import { FunctionComponent } from 'react'

import { formatPercent } from 'src/utils/formatPercent'

import { ProbabilityDiagram } from './ProbabilityDiagram'
import type { CalculationResult } from './types'

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
