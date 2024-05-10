import { Ship, SimulationResult } from '../types'
import { adaptSimulationResult } from './adaptSimulationResult'
import { parseShip } from './parseShip'
import { SimulationResultResponse } from './types'

const API_BASE_URL = window.location.href

type Params = {
  attackerShips: Ship[]
  defenderShips: Ship[]
}

export const getSimulationResult = async ({
  attackerShips,
  defenderShips,
}: Params): Promise<SimulationResult> => {
  const attacker = attackerShips.map(parseShip).join(' + ')
  const defender = defenderShips.map(parseShip).join(' + ')
  const battleInfo = `${attacker} vs ${defender}`

  const url = new URL(`${API_BASE_URL}winChance`)
  url.searchParams.append('battleInfo', battleInfo)

  const response = await fetch(url)
  const json: SimulationResultResponse = await response.json()  
  
  const adapted = adaptSimulationResult(json)
  console.log("Adapted response:", adapted)
  return adapted
}
