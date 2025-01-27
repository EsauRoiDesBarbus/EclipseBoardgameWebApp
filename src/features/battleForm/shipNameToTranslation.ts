import { msg } from '@lingui/macro'

import { MessageDescriptor } from '../i18n/types'
import { ShipTypeWithNpc } from './types'

export const shipNameToTranslation = {
  interceptor: msg`Interceptor`,
  cruiser: msg`Cruiser`,
  dreadnought: msg`Dreadnought`,
  starbase: msg`Starbase`,
  npc: msg`NPC`,
  ancientAVariant: msg`Ancient`,
  ancientBVariant: msg`Ancient`,
  ancientCVariant: msg`Ancient`,
  guardianAVariant: msg`Guardian`,
  guardianBVariant: msg`Guardian`,
  guardianCVariant: msg`Guardian`,
  gcdsAVariant: msg`GCDS`,
  gcdsBVariant: msg`GCDS`,
  gcdsCVariant: msg`GCDS`,
} as const satisfies Record<ShipTypeWithNpc, MessageDescriptor>
