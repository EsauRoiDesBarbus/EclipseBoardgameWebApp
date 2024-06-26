export type Weapon = {
  yellow: number
  orange: number
  blue: number
  red: number
  pink: number
}

export type ShipType = 'interceptor' | 'cruiser' | 'dreadnought' | 'starbase' | 'npc'

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

export type Side = 'attack' | 'defense'

export type SurvivalChance = { label: string; value: number; side: Side }

export type CalculationResult = {
  winChance: number
  survivalChances: SurvivalChance[]
}
