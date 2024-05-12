import { Ship, CalculationResult } from '../types'
import { adaptCalculationResult } from './adaptCalculationResult'
import { parseShip } from './parseShip'
import { CalculationResultResponse } from './types'

const API_BASE_URL = window.location.href

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

  const response = await fetch(url)
  const json = (await response.json()) as CalculationResultResponse
  return adaptCalculationResult(json)
}
