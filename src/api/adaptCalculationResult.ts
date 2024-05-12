import { Side, CalculationResult, SurvivalChance } from '../types'
import { CalculationResultResponse } from './types'

const adaptSideSurvivalChance = (
  survivalChances: CalculationResultResponse['attackShipsStillAlive'],
  side: Side
) =>
  survivalChances.reduce((previous, shipModel, i) => {
    shipModel.forEach((survivalChance, j) => {
      previous.push({
        label: `${side === 'attack' ? 'Attack' : 'Defense'} ship ${i + 1} - ${j + 1} or more survived`,
        value: survivalChance,
        side,
      })
    })
    return previous
  }, [] as SurvivalChance[])

export const adaptCalculationResult = (
  calculationResult: CalculationResultResponse
): CalculationResult => {
  return {
    winChance: calculationResult.winChance,
    survivalChances: adaptSideSurvivalChance(
      calculationResult.attackShipsStillAlive,
      'attack'
    ).concat(adaptSideSurvivalChance(calculationResult.defenseShipsStillAlive, 'defense')),
  }
}
