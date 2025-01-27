import AncientImage from 'src/assets/ship/ancient.png'
import AncientAImage from 'src/assets/ship/ancientA.png'
import AncientBImage from 'src/assets/ship/ancientB.png'
import AncientCImage from 'src/assets/ship/ancientC.png'
import CruiserImage from 'src/assets/ship/cruiser.png'
import DreadnoughtImage from 'src/assets/ship/dreadnought.png'
import GcdsAImage from 'src/assets/ship/gcdsA.png'
import GcdsBImage from 'src/assets/ship/gcdsB.png'
import GcdsCImage from 'src/assets/ship/gcdsC.png'
import GuardianAImage from 'src/assets/ship/guardianA.png'
import GuardianBImage from 'src/assets/ship/guardianB.png'
import GuardianCImage from 'src/assets/ship/guardianC.png'
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
      return AncientAImage
    case 'ancientBVariant':
      return AncientBImage
    case 'ancientCVariant':
      return AncientCImage
    case 'npc':
      return AncientImage
    case 'guardianAVariant':
      return GuardianAImage
    case 'guardianBVariant':
      return GuardianBImage
    case 'guardianCVariant':
      return GuardianCImage
    case 'gcdsAVariant':
      return GcdsAImage
    case 'gcdsBVariant':
      return GcdsBImage
    case 'gcdsCVariant':
      return GcdsCImage
    default:
      return InterceptorImage
  }
}
