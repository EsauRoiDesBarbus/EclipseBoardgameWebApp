import AncientImage from 'src/assets/ship/ancient.png'
import CruiserImage from 'src/assets/ship/cruiser.png'
import DreadnoughtImage from 'src/assets/ship/dreadnought.png'
import GcdsImage from 'src/assets/ship/gcds.png'
import GuardianImage from 'src/assets/ship/guardian.png'
import InterceptorImage from 'src/assets/ship/interceptor.png'
import StarbaseImage from 'src/assets/ship/starbase.png'

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
