import { Side, SimulationResult, SurvivalChance } from '../types'
import { SimulationResultResponse } from './types'

const adaptSideSurvivalChance = (
  survivalChances: SimulationResultResponse['attackShipsStillAlive'],
  side: Side
) =>
  survivalChances.reduce((previous, shipModel, i) => {
    shipModel.forEach((survivalChance, j) => {
      previous.push({
        label: `${side === 'attack' ? 'Attack' : 'Defense'} ship ${i + 1} - ${j + 1} or more survived`,
        value: survivalChance,
        side,
      })
    })
    return previous
  }, [] as SurvivalChance[])

export const adaptSimulationResult = (
  simulationResult: SimulationResultResponse
): SimulationResult => {
  return {
    winChance: simulationResult.winChance,
    survivalChances: adaptSideSurvivalChance(
      simulationResult.attackShipsStillAlive,
      'attack'
    ).concat(adaptSideSurvivalChance(simulationResult.defenseShipsStillAlive, 'defense')),
  }
}
