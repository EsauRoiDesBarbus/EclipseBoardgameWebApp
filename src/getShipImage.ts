import InterceptorImage from './assets/ship/interceptor.png'
import CruiserImage from './assets/ship/cruiser.png'
import DreadnoughtImage from './assets/ship/dreadnought.png'
import StarbaseImage from './assets/ship/starbase.png'

import type { ShipType } from "./types"

export const getShipImage = (shipType: ShipType) => {
  switch (shipType) {
    case 'interceptor':
      return InterceptorImage
    case 'cruiser':
      return CruiserImage
    case 'dreadnought':
      return DreadnoughtImage
    case 'starbase':
      return StarbaseImage
    default:
      return InterceptorImage
  }
}
