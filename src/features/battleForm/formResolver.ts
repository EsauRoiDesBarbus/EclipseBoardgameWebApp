import { t } from '@lingui/macro'

import { FormValues } from './types'

export const formResolver = (data: FormValues) => {
  if (data.attackerShips.length === 0 || data.defenderShips.length === 0) {
    return {
      values: data,
      errors: {
        attackerShips: {
          message: t`Missing attacker ships.`,
        },
        defenderShips: {
          message: t`Missing defender ships.`,
        },
      },
    }
  }
  return { values: data, errors: {} }
}
