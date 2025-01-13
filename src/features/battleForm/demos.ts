import { FormValues } from './types'

export const basicShipsDemo: FormValues = {
  attackerShips: [
    {
      type: 'cruiser',
      count: 2,
      initiative: 2,
      hull: 1,
      computer: 1,
      shield: 0,
      cannon: { yellow: 2, orange: 0, blue: 0, red: 0, pink: 0 },
      missile: { yellow: 0, orange: 0, blue: 0, red: 0 },
    },
  ],
  defenderShips: [
    {
      type: 'interceptor',
      count: 1,
      initiative: 3,
      hull: 0,
      computer: 0,
      shield: 0,
      cannon: { yellow: 1, orange: 0, blue: 0, red: 0, pink: 0 },
      missile: { yellow: 0, orange: 0, blue: 0, red: 0 },
    },
    {
      type: 'starbase',
      count: 1,
      initiative: 4,
      hull: 2,
      computer: 1,
      shield: 0,
      cannon: { yellow: 1, orange: 0, blue: 0, red: 0, pink: 0 },
      missile: { yellow: 0, orange: 0, blue: 0, red: 0 },
    },
  ],
}

export const optimalDamageSplittingDemo: FormValues = {
  attackerShips: [
    {
      type: 'cruiser',
      count: 1,
      initiative: 2,
      hull: 0,
      computer: 2,
      shield: 0,
      cannon: { yellow: 0, orange: 0, blue: 0, red: 0, pink: 0 },
      missile: { yellow: 0, orange: 2, blue: 0, red: 0 },
    },
    {
      type: 'interceptor',
      count: 1,
      initiative: 3,
      hull: 0,
      computer: 2,
      shield: 0,
      cannon: { yellow: 0, orange: 0, blue: 0, red: 0, pink: 0 },
      missile: { yellow: 2, orange: 0, blue: 0, red: 0 },
    },
  ],
  defenderShips: [
    {
      type: 'cruiser',
      count: 2,
      initiative: 2,
      hull: 2,
      computer: 1,
      shield: 0,
      cannon: { yellow: 1, orange: 0, blue: 0, red: 0, pink: 0 },
      missile: { yellow: 0, orange: 0, blue: 0, red: 0 },
    },
  ],
}
