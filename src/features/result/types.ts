export type Side = 'attack' | 'defense'

export type SurvivalChance = { label: string; value: number; side: Side }

export type CalculationResult = {
  winChance: number
  survivalChances: SurvivalChance[]
}
