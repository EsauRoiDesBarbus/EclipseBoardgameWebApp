import { msg } from '@lingui/macro'

import { FormValues } from './types'

const missingAttackerShips = msg`Missing attacker ships.`
const missingDefenderShips = msg`Missing defender ships.`

export const formResolver = (data: FormValues) => {
  if (data.attackerShips.length === 0 && data.defenderShips.length === 0) {
    return {
      values: data,
      errors: {
        attackerShips: {
          message: missingAttackerShips,
        },
        defenderShips: {
          message: missingDefenderShips,
        },
      },
    }
  } else if (data.attackerShips.length === 0) {
    return {
      values: data,
      errors: {
        attackerShips: {
          message: missingAttackerShips,
        },
      },
    }
  } else if (data.defenderShips.length === 0) {
    return {
      values: data,
      errors: {
        defenderShips: {
          message: missingDefenderShips,
        },
      },
    }
  }
  return { values: data, errors: {} }
}
