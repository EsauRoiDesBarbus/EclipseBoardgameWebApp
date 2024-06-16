import { Trans, msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

import { getCalculationResult } from 'src/api/getCalculationResult'
import ComputerImage from 'src/assets/computer.png'
import HullImage from 'src/assets/hull.png'
import { TrashBinIcon } from 'src/assets/icons/TrashBinIcon'
import InitiativeImage from 'src/assets/initiative.png'
import ShieldImage from 'src/assets/shield.png'
import BlueWeaponImage from 'src/assets/weaponBlue.png'
import OrangeWeaponImage from 'src/assets/weaponOrange.png'
import PinkWeaponImage from 'src/assets/weaponPink.png'
import RedWeaponImage from 'src/assets/weaponRed.png'
import YellowWeaponImage from 'src/assets/weaponYellow.png'
import { AddBlueprintButton } from 'src/features/battleForm/AddBlueprintButton'
import { NumberInput } from 'src/features/battleForm/NumberInput'
import { defaultBlueprint } from 'src/features/battleForm/blueprints'
import { basicShipsDemo, optimalDamageSplittingDemo } from 'src/features/battleForm/demos'
import { getNpcBlueprint } from 'src/features/battleForm/getNpcBlueprint'
import { getShipImage } from 'src/features/battleForm/getShipImage'
import type { FormValues } from 'src/features/battleForm/types'
import { ResultDisplay } from 'src/features/result/ResultDisplay'
import { CalculationResult } from 'src/features/result/types'

import './App.css'
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
    try {
      const result = await getCalculationResult(data)
      setCalculationResult(result)
    } catch (error) {
      console.error(error)
      alert(_(msg`An error occurred. Please try again.`))
    } finally {
      setIsLoading(false)
    }
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
            title={_(msg`Load basic ships demo`)}
            onClick={() => {
              attackerShipReplace(basicShipsDemo.attackerShips)
              defenderShipReplace(basicShipsDemo.defenderShips)
            }}>
            <Trans>Basic ships</Trans>
          </button>
          <button
            type="button"
            title={_(msg`Load optimal damage splitting demo`)}
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
                            (ship) => ship.type === shipType || ship.type === 'npc' // a NPC can only fight alone
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
                          {shipSide === 'defenderShips' ? (
                            <>
                              <option value="starbase">
                                <Trans>Starbase</Trans>
                              </option>
                              <option value="npc">
                                <Trans>NPC</Trans>
                              </option>
                            </>
                          ) : null}
                        </select>
                      </div>
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.count`}
                        min={1}
                        label={_(msg`Number`)}
                        title={_(msg`Increase number of ships`)}
                        image={getShipImage(shipTypeValue)}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.initiative`}
                        label={_(msg`Initiative`)}
                        title={_(msg`Increase initiative`)}
                        image={InitiativeImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.hull`}
                        label={_(msg`Hull`)}
                        title={_(msg`Increase hull`)}
                        image={HullImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.computer`}
                        label={_(msg`Computer`)}
                        title={_(msg`Increase computer`)}
                        image={ComputerImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.shield`}
                        label={_(msg`Shield`)}
                        title={_(msg`Increase shield`)}
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
                        label={_(msg`Yellow cannon`)}
                        labelHidden
                        title={_(msg`Increase yellow cannon`)}
                        image={YellowWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.cannon.orange`}
                        label={_(msg`Orange cannon`)}
                        labelHidden
                        title={_(msg`Increase orange cannon`)}
                        image={OrangeWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.cannon.blue`}
                        label={_(msg`Blue cannon`)}
                        labelHidden
                        title={_(msg`Increase blue cannon`)}
                        image={BlueWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.cannon.red`}
                        label={_(msg`Red cannon`)}
                        labelHidden
                        title={_(msg`Increase red cannon`)}
                        image={RedWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.cannon.pink`}
                        label={_(msg`Rift cannon`)}
                        labelHidden
                        title={_(msg`Increase rift cannon`)}
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
                        label={_(msg`Yellow missile`)}
                        labelHidden
                        title={_(msg`Increase yellow missile`)}
                        image={YellowWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.missile.orange`}
                        label={_(msg`Orange missile`)}
                        labelHidden
                        title={_(msg`Increase orange missile`)}
                        image={OrangeWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.missile.blue`}
                        label={_(msg`Blue missile`)}
                        labelHidden
                        title={_(msg`Increase blue missile`)}
                        image={BlueWeaponImage}
                      />
                      <NumberInput
                        control={control}
                        name={`${shipSide}.${index}.missile.red`}
                        label={_(msg`Red missile`)}
                        labelHidden
                        title={_(msg`Increase red missile`)}
                        image={RedWeaponImage}
                      />
                    </div>
                    <button
                      type="button"
                      title={_(msg`Remove ship`)}
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
