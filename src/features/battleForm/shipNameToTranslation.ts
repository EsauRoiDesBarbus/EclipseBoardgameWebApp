import { msg } from '@lingui/macro'

import { MessageDescriptor } from '../i18n/types'
import { ShipTypeWithNpc } from './types'

export const shipNameToTranslation = {
  interceptor: msg`Interceptor`,
  cruiser: msg`Cruiser`,
  dreadnought: msg`Dreadnought`,
  starbase: msg`Starbase`,
  npc: msg`NPC`,
  ancient: msg`Ancient`,
  ancientAVariant: msg`Ancient A Variant`,
  ancientBVariant: msg`Ancient B Variant`,
  guardian: msg`Guardian`,
  guardianAVariant: msg`Guardian A Variant`,
  guardianBVariant: msg`Guardian B Variant`,
  gcds: msg`GCDS`,
  gcdsAVariant: msg`GCDS A Variant`,
  gcdsBVariant: msg`GCDS B Variant`,
} as const satisfies Record<ShipTypeWithNpc, MessageDescriptor>
