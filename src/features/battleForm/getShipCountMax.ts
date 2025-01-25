import { ShipType } from './types'

export const getShipCountMax = (shipType: ShipType): number => {
  switch (shipType) {
    case 'interceptor':
      return 8
    case 'cruiser':
      return 4
    case 'dreadnought':
      return 2
    case 'starbase':
      return 4
    case 'npc':
      return 4
  }
}
