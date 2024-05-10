import { Ship } from './types'

export const defaultBlueprint = {
  count: 1,
  type: 'interceptor',
  initiative: 0,
  hull: 0,
  computer: 0,
  shield: 0,
  cannon: {
    yellow: 0,
    orange: 0,
    blue: 0,
    red: 0,
    pink: 0,
  },
  missile: {
    yellow: 0,
    orange: 0,
    blue: 0,
    red: 0,
  },
} as const satisfies Ship

export const ancientBlueprint = {
  count: 1,
  type: 'npc',
  initiative: 2,
  hull: 1,
  computer: 1,
  shield: 0,
  cannon: {
    yellow: 2,
    orange: 0,
    blue: 0,
    red: 0,
    pink: 0,
  },
  missile: {
    yellow: 0,
    orange: 0,
    blue: 0,
    red: 0,
  },
} as const satisfies Ship

export const gardianBlueprint = {
  count: 1,
  type: 'npc',
  initiative: 3,
  hull: 2,
  computer: 2,
  shield: 0,
  cannon: {
    yellow: 3,
    orange: 0,
    blue: 0,
    red: 0,
    pink: 0,
  },
  missile: {
    yellow: 0,
    orange: 0,
    blue: 0,
    red: 0,
  },
} as const satisfies Ship

export const gcdsBlueprint = {
  count: 1,
  type: 'npc',
  initiative: 0,
  hull: 7,
  computer: 2,
  shield: 0,
  cannon: {
    yellow: 4,
    orange: 0,
    blue: 0,
    red: 0,
    pink: 0,
  },
  missile: {
    yellow: 0,
    orange: 0,
    blue: 0,
    red: 0,
  },
} as const satisfies Ship
