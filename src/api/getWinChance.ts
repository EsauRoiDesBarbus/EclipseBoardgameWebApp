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
  const ships = `${attacker} vs ${defender}`

  console.log(ships)

  // return fetch(`${API_BASE_URL}/winChance`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: ships,
  // })
  //   .then((response) => response.json())
  //   .then((data) => data.winChance)
  //   .catch((error) => {
  //     console.error('Error:', error)
  //     return 0
  //   })
}
