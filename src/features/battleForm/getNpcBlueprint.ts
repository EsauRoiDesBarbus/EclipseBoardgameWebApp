import {
  ancientBlueprint,
  ancientAVariantBlueprint,
  ancientBVariantBlueprint,
  guardianBlueprint,
  guardianAVariantBlueprint,
  guardianBVariantBlueprint,
  gcdsBlueprint,
  gcdsAVariantBlueprint,
  gcdsBVariantBlueprint,
} from './blueprints'
import { NpcShipType, Ship } from './types'

export const getNpcBlueprint = (shipType: NpcShipType): Ship => {
  switch (shipType) {
    case 'ancient':
      return ancientBlueprint
    case 'ancientAVariant':
      return ancientAVariantBlueprint
    case 'ancientBVariant':
      return ancientBVariantBlueprint
    case 'guardian':
      return guardianBlueprint
    case 'guardianAVariant':
      return guardianAVariantBlueprint
    case 'guardianBVariant':
      return guardianBVariantBlueprint
    case 'gcds':
      return gcdsBlueprint
    case 'gcdsAVariant':
      return gcdsAVariantBlueprint
    case 'gcdsBVariant':
      return gcdsBVariantBlueprint
  }
}
