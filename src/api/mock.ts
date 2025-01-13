import type { CalculationResultResponse } from './types'

const mock: CalculationResultResponse = {
  winChance: 0.79,
  attackShipsStillAlive: [[0.2]],
  defenseShipsStillAlive: [[0.5, 0.32, 0.09], [0.8]],
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockGetCalculationResult = async () => {
  await sleep(1500)

  return mock
}
