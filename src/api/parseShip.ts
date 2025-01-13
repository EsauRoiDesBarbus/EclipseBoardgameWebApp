import type { Ship } from 'src/features/battleForm/types'

type ApiShip = 'int' | 'cru' | 'dre' | 'sba' | 'npc'

const getApiShipType = (type: Ship['type']): ApiShip => {
  switch (type) {
    case 'interceptor':
      return 'int'
    case 'cruiser':
      return 'cru'
    case 'dreadnought':
      return 'dre'
    case 'starbase':
      return 'sba'
    case 'npc':
      return 'npc'
    default:
      return 'int'
  }
}

export const parseShip = (ship: Ship): string => {
  return `${ship.count} ${getApiShipType(ship.type)} ${ship.initiative} ${ship.hull} ${ship.computer} ${ship.shield} ${ship.cannon.yellow} ${ship.cannon.orange} ${ship.cannon.blue} ${ship.cannon.red} ${ship.cannon.pink} ${ship.missile.yellow} ${ship.missile.orange} ${ship.missile.blue} ${ship.missile.red} 0`
}
