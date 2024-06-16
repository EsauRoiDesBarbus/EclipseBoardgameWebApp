import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { ShipType } from '../features/battleForm/types'
import type { CalculationResult, Side, SurvivalChance } from '../features/result/types'
import { shipNameToTranslation } from '../features/battleForm/shipNameToTranslation'
import type { CalculationResultResponse } from './types'

const getSurvivalChanceLabel = (side: Side, shipType: ShipType, nSurvived: number) => {
  const firstHalf =
    side === 'attack'
      ? t`Attack ${i18n._(shipNameToTranslation[shipType])}`
      : t`Defense ${i18n._(shipNameToTranslation[shipType])}`
  const secondHalf = t`${nSurvived + 1} or more survived`

  return `${firstHalf} - ${secondHalf}`
}

const adaptSideSurvivalChance = (
  survivalChances: CalculationResultResponse['attackShipsStillAlive' | 'defenseShipsStillAlive'],
  side: Side,
  shipTypes: ShipType[]
) =>
  survivalChances.reduce((adaptedChances, shipModel, i) => {
    shipModel.forEach((survivalChance, j) => {
      adaptedChances.push({
        label: getSurvivalChanceLabel(side, shipTypes[i], j),
        value: survivalChance,
        side,
      })
    })
    return adaptedChances
  }, [] as SurvivalChance[])

export const adaptCalculationResult = (
  calculationResult: CalculationResultResponse,
  attackShipTypes: ShipType[],
  defenseShipTypes: ShipType[]
): CalculationResult => {
  return {
    winChance: calculationResult.winChance,
    survivalChances: adaptSideSurvivalChance(
      calculationResult.attackShipsStillAlive,
      'attack',
      attackShipTypes
    ).concat(
      adaptSideSurvivalChance(calculationResult.defenseShipsStillAlive, 'defense', defenseShipTypes)
    ),
  }
}
