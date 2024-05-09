import { Ship } from "../types"
import { parseShip } from "./parseShip"

const API_BASE_URL = window.location.href

type Params = {
  attackerShips: Ship[]
  defenderShips: Ship[]
}

type Response = {
  winChance: number
}

export const getWinChance = async ({attackerShips, defenderShips}: Params) => {
  const attacker = attackerShips.map(parseShip).join(' + ')
  const defender = defenderShips.map(parseShip).join(' + ')
  const battleInfo = `${attacker} vs ${defender}`

  const url = new URL(`${API_BASE_URL}/winChance`)
  url.searchParams.append('battleInfo', battleInfo)

  const response = await fetch(url)
  console.log({response});
  
  const json: Response = await response.json()
  console.log({json});
  return json.winChance
}
