import AncientImage from 'src/assets/ship/ancient.png'
import CruiserImage from 'src/assets/ship/cruiser.png'
import DreadnoughtImage from 'src/assets/ship/dreadnought.png'
import GcdsImage from 'src/assets/ship/gcds.png'
import GuardianImage from 'src/assets/ship/guardian.png'
import InterceptorImage from 'src/assets/ship/interceptor.png'
import StarbaseImage from 'src/assets/ship/starbase.png'

import type { ShipTypeWithNpc } from './types'

export const getShipImage = (shipType: ShipTypeWithNpc) => {
  switch (shipType) {
    case 'interceptor':
      return InterceptorImage
    case 'cruiser':
      return CruiserImage
    case 'dreadnought':
      return DreadnoughtImage
    case 'starbase':
      return StarbaseImage
    case 'ancientAVariant':
    case 'ancientBVariant':
    case 'ancientCVariant':
    case 'npc':
      return AncientImage
    case 'guardianAVariant':
    case 'guardianBVariant':
    case 'guardianCVariant':
      return GuardianImage
    case 'gcdsAVariant':
    case 'gcdsBVariant':
    case 'gcdsCVariant':
      return GcdsImage
    default:
      return InterceptorImage
  }
}
