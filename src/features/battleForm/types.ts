type Weapon = {
  yellow: number
  orange: number
  blue: number
  red: number
  pink: number
}

export type ShipType = 'interceptor' | 'cruiser' | 'dreadnought' | 'starbase' | 'npc'
export type NpcShipType =
  | 'ancient'
  | 'ancientAVariant'
  | 'ancientBVariant'
  | 'guardian'
  | 'guardianAVariant'
  | 'guardianBVariant'
  | 'gcds'
  | 'gcdsAVariant'
  | 'gcdsBVariant'
export type ShipTypeWithNpc = ShipType | NpcShipType

export type Ship = {
  count: number
  type: ShipType
  initiative: number
  hull: number
  computer: number
  shield: number
  cannon: Weapon
  missile: Omit<Weapon, 'pink'>
}

export type FormValues = { attackerShips: Ship[]; defenderShips: Ship[] }
