export type Side = 'attack' | 'defense'

export type SurvivalChance = { value: number; shipType: string; side: Side; survivedNumber: number }

export type CalculationResult = {
  winChance: number
  survivalChances: SurvivalChance[]
}
