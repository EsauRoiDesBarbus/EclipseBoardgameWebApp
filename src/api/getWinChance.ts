import { Ship } from "../types"
import { parseShip } from "./parseShip"

const API_BASE_URL = 'http://localhost:5000'

type Params = {
  attackerShips: Ship[]
  defenderShips: Ship[]
}

export const getWinChance = ({attackerShips, defenderShips}: Params) => {
  const attacker = attackerShips.map(parseShip).join(' + ')
  const defender = defenderShips.map(parseShip).join(' + ')
  const battleInfo = `${attacker} vs ${defender}`

  const url = new URL(`${API_BASE_URL}/winChance`)
  url.searchParams.append('battleInfo', battleInfo)

  console.log({battleInfo})
  console.log({url})

  return fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      console.log("Received response:", response)
      return response.text})
    .catch((error) => {
      console.error('Error:', error)
      return 0
    })
}
