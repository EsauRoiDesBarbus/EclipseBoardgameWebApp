import './App.css'

import { useForm, useFieldArray } from 'react-hook-form'
import { NumberInput } from './NumberInput'

import InitiativeImage from './assets/initiative.png'
import HullImage from './assets/hull.png'
import ComputerImage from './assets/computer.png'
import ShieldImage from './assets/shield.png'

import YellowWeaponImage from './assets/weaponYellow.png'
import OrangeWeaponImage from './assets/weaponOrange.png'
import BlueWeaponImage from './assets/weaponBlue.png'
import RedWeaponImage from './assets/weaponRed.png'
import PinkWeaponImage from './assets/weaponPink.png'

import type { FormValues } from './types'
import { getShipImage } from './getShipImage'
import { getCalculationResult } from './api/getCalculationResult'
import { useEffect, useState } from 'react'
import { defaultBlueprint } from './blueprints'
import { AddBlueprintButton } from './AddBlueprintButton'
import { getNpcBlueprint } from './getNpcBlueprint'
import { TrashBinIcon } from './icons/TrashBinIcon'
import { basicShipsDemo, optimalDamageSplittingDemo } from './demos'
import { Trans, msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ResultDisplay } from './features/result/ResultDisplay'
import { CalculationResult } from './features/result/types'
import { Header } from './Header'

const attackerBlueprints = ['interceptor', 'cruiser', 'dreadnought'] as const
const defenderBlueprints = ['interceptor', 'cruiser', 'dreadnought', 'starbase'] as const
const npcBlueprints = ['ancient', 'guardian', 'gcds'] as const

function App() {
  const [calculationResult, setCalculationResult] = useState<CalculationResult | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const { _ } = useLingui()

  useEffect(() => {
    if (calculationResult) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }, [calculationResult])

  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      attackerShips: [],
      defenderShips: [],
    },
  })

  const {
    fields: attackerShipFields,
    append: attackerShipAppend,
    remove: attackerShipRemove,
    replace: attackerShipReplace,
  } = useFieldArray({
    control,
    name: 'attackerShips',
  })
  const {
    fields: defenderShipFields,
    append: defenderShipAppend,
    remove: defenderShipRemove,
    replace: defenderShipReplace,
  } = useFieldArray({
    control,
    name: 'defenderShips',
  })
  const fields = { attackerShips: attackerShipFields, defenderShips: defenderShipFields }
  const appendFunctions = { attackerShips: attackerShipAppend, defenderShips: defenderShipAppend }
  const removeFunctions = { attackerShips: attackerShipRemove, defenderShips: defenderShipRemove }

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    const result = await getCalculationResult(data)
    setCalculationResult(result)
    setIsLoading(false)
  }

  return (
    <>
      <h1>
        <Trans>Eclipse Battle Calculator</Trans>
      </h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <Header />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}>
          <label>
            <Trans>Load a demo:</Trans>
          </label>
          <button
            type="button"
            onClick={() => {
              attackerShipReplace(basicShipsDemo.attackerShips)
              defenderShipReplace(basicShipsDemo.defenderShips)
            }}>
            <Trans>Basic ships</Trans>
          </button>
          <button
            type="button"
            onClick={() => {
              attackerShipReplace(optimalDamageSplittingDemo.attackerShips)
              defenderShipReplace(optimalDamageSplittingDemo.defenderShips)
            }}>
            <Trans>Optimal damage splitting</Trans>
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
        {(['attackerShips', 'defenderShips'] as const).map((shipSide) => (
          <div key={shipSide}>
            <h2>{_(shipSide === 'attackerShips' ? msg`Attack` : msg`Defense`)}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div
                className="elevation-1"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0px 16px 16px 16px',
                }}>
                <h3>
                  <Trans>
                    Add blueprint on{' '}
                    {_(shipSide === 'attackerShips' ? msg`attacker` : msg`defender`)} side
                  </Trans>
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridGap: 16,
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  }}>
                  {(shipSide === 'attackerShips' ? attackerBlueprints : defenderBlueprints).map(
                    (shipType) => {
                      const ships = watch(shipSide)
                      return (
                        <AddBlueprintButton
                          shipType={shipType}
                          key={`add-${shipSide}-${shipType}`}
                          onClick={() => {
                            appendFunctions[shipSide]({ ...defaultBlueprint, type: shipType })
                          }}
                          disabled={ships.some(
                            (ship) => ship.type === shipType || ship.type == 'npc' // a NPC can only fight alone
                          )}
                        />
                      )
                    }
                  )}
                  {shipSide === 'defenderShips' &&
                    npcBlueprints.map((shipType) => (
                      <AddBlueprintButton
                        shipType={shipType}
                        key={`add-${shipSide}-${shipType}`}
                        onClick={() => {
                          appendFunctions[shipSide](getNpcBlueprint(shipType))
                        }}
                        disabled={fields[shipSide].length > 0} // a NPC can only fight alone
                      />
                    ))}
                </div>
              </div>
              {fields[shipSide].map((field, index) => {
                const shipTypeValue = watch(`${shipSide}.${index}.type`)
                return (
                  <div
                    key={field.id}
                    className="elevation-1"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 16,
                      padding: 16,
                    }}>
                    <div
                      style={{
                        display: 'grid',
                        gap: 16,
                        gridTemplateColumns: 'repeat(auto-fit, minmax(82px, 1fr))',
                      }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                          justifyContent: 'space-between',
                        }}>
                        <label htmlFor={`ships.${index}.type`}>Type</label>
                        <select
                          {...register(`${shipSide}.${index}.type`)}
                          id={`${shipSide}.${index}.type`}
                          style={{ display: 'flex', flexGrow: 1, maxHeight: 36 }}>
                          <option value="interceptor">
                            <Trans>Interceptor</Trans>
                          </option>
                          <option value="cruiser">
                            <Trans>Cruiser</Trans>
                          </option>
                          <option value="dreadnought">
                            <Trans>Dreadnought</Trans>
                          </option>
                          <option value="starbase">
                            <Trans>Starbase</Trans>
                          </option>
                          {shipSide === 'defenderShips' ? (
                            <option value="npc">
                              <Trans>NPC</Trans>
                            </option>
                          ) : null}
                        </select>
                      </div>
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.count`}
                        min={1}
                        label={_(msg`Number`)}
                        title={_(msg`increase number of ships`)}
                        image={getShipImage(shipTypeValue)}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.initiative`}
                        label={_(msg`Initiative`)}
                        title={_(msg`increase initiative`)}
                        image={InitiativeImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.hull`}
                        label={_(msg`Hull`)}
                        title={_(msg`increase hull`)}
                        image={HullImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.computer`}
                        label={_(msg`Computer`)}
                        title={_(msg`increase computer`)}
                        image={ComputerImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.shield`}
                        label={_(msg`Shield`)}
                        title={_(msg`increase shield`)}
                        image={ShieldImage}
                      />
                    </div>
                    <div
                      className="elevation-2"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(82px, 1fr))',
                        padding: 8,
                        gap: 16,
                      }}>
                      <label
                        style={{ display: 'flex', alignSelf: 'center', justifySelf: 'center' }}>
                        <Trans>Cannons</Trans>
                      </label>
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.cannon.yellow`}
                        title="increase yellow cannon"
                        image={YellowWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.cannon.orange`}
                        title="increase orange cannon"
                        image={OrangeWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.cannon.blue`}
                        title="increase blue cannon"
                        image={BlueWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.cannon.red`}
                        title="increase red cannon"
                        image={RedWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.cannon.pink`}
                        title="increase rift cannon"
                        image={PinkWeaponImage}
                      />
                    </div>
                    <div
                      className="elevation-2"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(82px, 1fr))',
                        padding: 8,
                        gap: 16,
                      }}>
                      <label
                        style={{ display: 'flex', alignSelf: 'center', justifySelf: 'center' }}>
                        <Trans>Missiles</Trans>
                      </label>
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.missile.yellow`}
                        title="increase yellow missile"
                        image={YellowWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.missile.orange`}
                        title="increase orange missile"
                        image={OrangeWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.missile.blue`}
                        title="increase blue missile"
                        image={BlueWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.missile.red`}
                        title="increase red missile"
                        image={RedWeaponImage}
                      />
                    </div>
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignSelf: 'flex-end',
                        justifyContent: 'center',
                        padding: 4,
                        width: '100%',
                        maxWidth: 100,
                      }}
                      onClick={() => {
                        removeFunctions[shipSide](index)
                      }}>
                      <TrashBinIcon />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', marginTop: 20, gap: 32 }}>
          <button
            type="button"
            style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
            onClick={() => {
              attackerShipReplace([])
              defenderShipReplace([])
              setCalculationResult(undefined)
            }}>
            <Trans>Clear</Trans>
          </button>
          <button
            type="submit"
            className="primary"
            style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            {isLoading ? (
              <img
                src="/gcds-icon.png"
                width={26}
                className="loader"
                style={{ margin: '-0.3em 0' }}
              />
            ) : (
              <Trans>Battle!</Trans>
            )}
          </button>
        </div>
      </form>
      {calculationResult && <ResultDisplay result={calculationResult} />}
    </>
  )
}

export default App
