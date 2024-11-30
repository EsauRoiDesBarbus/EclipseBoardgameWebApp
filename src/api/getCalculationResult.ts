import type { Ship } from 'src/features/battleForm/types'
import type { CalculationResult } from 'src/features/result/types'

import { adaptCalculationResult } from './adaptCalculationResult'
import { mockGetCalculationResult } from './mock'
import { parseShip } from './parseShip'
import type { CalculationResultResponse } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

type Params = {
  attackerShips: Ship[]
  defenderShips: Ship[]
}

export const getCalculationResult = async ({
  attackerShips,
  defenderShips,
}: Params): Promise<CalculationResult> => {
  const attacker = attackerShips.map(parseShip).join(' + ')
  const defender = defenderShips.map(parseShip).join(' + ')
  const battleInfo = `${attacker} vs ${defender}`

  const url = new URL(`${API_BASE_URL}winChance`)
  url.searchParams.append('battleInfo', battleInfo)

  let json: CalculationResultResponse
  if (process.env.NODE_ENV === 'development') {
    json = await mockGetCalculationResult()
  } else {
    const response = await fetch(url)
    json = (await response.json()) as CalculationResultResponse
  }

  return adaptCalculationResult(
    json,
    attackerShips.map((ship) => ship.type),
    defenderShips.map((ship) => ship.type)
  )
}
