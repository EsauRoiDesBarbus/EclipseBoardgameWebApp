import {
  ancientAVariantBlueprint,
  ancientBVariantBlueprint,
  ancientCVariantBlueprint,
  guardianAVariantBlueprint,
  guardianBVariantBlueprint,
  guardianCVariantBlueprint,
  gcdsAVariantBlueprint,
  gcdsBVariantBlueprint,
  gcdsCVariantBlueprint,
} from './blueprints'
import { NpcShipType, Ship } from './types'

export const getNpcBlueprint = (shipType: NpcShipType): Ship => {
  switch (shipType) {
    case 'ancientAVariant':
      return ancientAVariantBlueprint
    case 'ancientBVariant':
      return ancientBVariantBlueprint
    case 'ancientCVariant':
      return ancientCVariantBlueprint
    case 'guardianAVariant':
      return guardianAVariantBlueprint
    case 'guardianBVariant':
      return guardianBVariantBlueprint
    case 'guardianCVariant':
      return guardianCVariantBlueprint
    case 'gcdsAVariant':
      return gcdsAVariantBlueprint
    case 'gcdsBVariant':
      return gcdsBVariantBlueprint
    case 'gcdsCVariant':
      return gcdsCVariantBlueprint
  }
}
