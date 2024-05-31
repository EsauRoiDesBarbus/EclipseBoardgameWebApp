import InterceptorImage from './assets/ship/interceptor.png'
import CruiserImage from './assets/ship/cruiser.png'
import DreadnoughtImage from './assets/ship/dreadnought.png'
import StarbaseImage from './assets/ship/starbase.png'
import AncientImage from './assets/ship/ancient.png'
import GuardianImage from './assets/ship/guardian.png'
import GcdsImage from './assets/ship/gcds.png'

import type { ShipType } from './types'

export const getShipImage = (shipType: ShipType | 'ancient' | 'guardian' | 'gcds') => {
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
    case 'guardian':
      return GuardianImage
    case 'gcds':
      return GcdsImage
    default:
      return InterceptorImage
  }
}
