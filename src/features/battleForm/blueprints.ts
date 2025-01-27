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

export const ancientAVariantBlueprint = {
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

export const ancientBVariantBlueprint = {
  count: 1,
  type: 'npc',
  initiative: 1,
  hull: 2,
  computer: 1,
  shield: 0,
  cannon: {
    yellow: 0,
    orange: 1,
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

export const ancientCVariantBlueprint = {
  count: 1,
  type: 'npc',
  initiative: 3,
  hull: 1,
  computer: 2,
  shield: 0,
  cannon: {
    yellow: 1,
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

export const guardianAVariantBlueprint = {
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

export const guardianBVariantBlueprint = {
  count: 1,
  type: 'npc',
  initiative: 1,
  hull: 3,
  computer: 1,
  shield: 0,
  cannon: {
    yellow: 0,
    orange: 0,
    blue: 0,
    red: 1,
    pink: 0,
  },
  missile: {
    yellow: 0,
    orange: 2,
    blue: 0,
    red: 0,
  },
} as const satisfies Ship

export const guardianCVariantBlueprint = {
  count: 1,
  type: 'npc',
  initiative: 2,
  hull: 3,
  computer: 1,
  shield: 1,
  cannon: {
    yellow: 0,
    orange: 2,
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

export const gcdsAVariantBlueprint = {
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

export const gcdsBVariantBlueprint = {
  count: 1,
  type: 'npc',
  initiative: 2,
  hull: 3,
  computer: 2,
  shield: 0,
  cannon: {
    yellow: 0,
    orange: 0,
    blue: 0,
    red: 1,
    pink: 0,
  },
  missile: {
    yellow: 4,
    orange: 0,
    blue: 0,
    red: 0,
  },
} as const satisfies Ship

export const gcdsCVariantBlueprint = {
  count: 1,
  type: 'npc',
  initiative: 3,
  hull: 4,
  computer: 2,
  shield: 2,
  cannon: {
    yellow: 0,
    orange: 2,
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
