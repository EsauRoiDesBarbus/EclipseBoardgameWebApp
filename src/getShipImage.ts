import InterceptorImage from './assets/ship/interceptor.png'
import CruiserImage from './assets/ship/cruiser.png'
import DreadnoughtImage from './assets/ship/dreadnought.png'
import StarbaseImage from './assets/ship/starbase.png'
import AncientImage from './assets/ship/ancient.png'
import GardianImage from './assets/ship/guardian.png'
import GcdsImage from './assets/ship/gcds.png'

import type { ShipType } from './types'

export const getShipImage = (shipType: ShipType | 'ancient' | 'gardian' | 'gcds') => {
  switch (shipType) {
    case 'interceptor':
      return InterceptorImage
    case 'cruiser':
      return CruiserImage
    case 'dreadnought':
      return DreadnoughtImage
    case 'starbase':
      return StarbaseImage
    case 'ancient':
    case 'npc':
      return AncientImage
    case 'gardian':
      return GardianImage
    case 'gcds':
      return GcdsImage
    default:
      return InterceptorImage
  }
}
