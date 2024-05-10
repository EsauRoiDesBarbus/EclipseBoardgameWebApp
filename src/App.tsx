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

import type { FormValues, SimulationResult } from './types'
import { getShipImage } from './getShipImage'
import { getSimulationResult } from './api/getSimulationResult'
import { ProbabilityDiagram } from './ProbabilityDiagram'
import { useState } from 'react'
import { formatPercent } from './utils/formatPercent'
import { defaultBlueprint } from './blueprints'
import { AddBlueprintButton } from './AddBlueprintButton'
import { getNpcBlueprint } from './getNpcBlueprint'
import { TrashBinIcon } from './icons/TrashBinIcon'
import { basicShipsDemo, optimalDamageSplittingDemo } from './demos'
import { AboutModal } from './AboutModal'

const attackerBlueprints = ['interceptor', 'cruiser', 'dreadnought'] as const
const defenderBlueprints = ['interceptor', 'cruiser', 'dreadnought', 'starbase'] as const
const npcBlueprints = ['ancient', 'gardian', 'gcds'] as const

function App() {
  const [simulationResult, setSimulationResult] = useState<SimulationResult | undefined>()
  const [showModal, setShowModal] = useState(false)

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
    const result = await getSimulationResult(data)
    setSimulationResult(result)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <AboutModal show={showModal} onClose={() => setShowModal(false)} />
      <h1>Eclipse Battle Simulator</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
          <button
            type="button"
            onClick={() => {
              setShowModal(true)
            }}>
            About
          </button>
          <button
            type="button"
            onClick={() => {
              attackerShipReplace([])
              defenderShipReplace([])
              setSimulationResult(undefined)
            }}>
            Clear
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
          <label>Load a demo:</label>
          <button
            type="button"
            onClick={() => {
              attackerShipReplace(basicShipsDemo.attackerShips)
              defenderShipReplace(basicShipsDemo.defenderShips)
            }}>
            Basic ships
          </button>
          <button
            type="button"
            onClick={() => {
              attackerShipReplace(optimalDamageSplittingDemo.attackerShips)
              defenderShipReplace(optimalDamageSplittingDemo.defenderShips)
            }}>
            Optimal damage splitting
          </button>
        </div>
      </div>
      {(['attackerShips', 'defenderShips'] as const).map((shipSide) => (
        <div key={shipSide}>
          <h2>{shipSide === 'attackerShips' ? 'Attack' : 'Defense'}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              className="elevation-1"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 16px 16px 16px',
              }}>
              <h3>
                Add blueprint on {shipSide === 'attackerShips' ? 'attacker' : 'defender'} side
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                {(shipSide === 'attackerShips' ? attackerBlueprints : defenderBlueprints).map(
                  (shipType) => (
                    <AddBlueprintButton
                      shipType={shipType}
                      key={`add-${shipSide}-${shipType}`}
                      onClick={() => {
                        appendFunctions[shipSide]({ ...defaultBlueprint, type: shipType })
                      }}
                    />
                  )
                )}
              </div>
              {shipSide === 'defenderShips' ? (
                <>
                  <div style={{ height: 8 }} />
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                    {npcBlueprints.map((shipType) => (
                      <AddBlueprintButton
                        shipType={shipType}
                        key={`add-${shipSide}-${shipType}`}
                        onClick={() => {
                          appendFunctions[shipSide](getNpcBlueprint(shipType))
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : null}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        <option value="interceptor">Interceptor</option>
                        <option value="cruiser">Cruiser</option>
                        <option value="dreadnought">Dreadnought</option>
                        <option value="starbase">Starbase</option>
                        {shipSide === 'defenderShips' ? <option value="npc">NPC</option> : null}
                      </select>
                    </div>
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.count`}
                      min={1}
                      label="Number"
                      accessibilityLabel="increase number of ships"
                      image={getShipImage(shipTypeValue)}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.initiative`}
                      label="Initiative"
                      accessibilityLabel="increase initiative"
                      image={InitiativeImage}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.hull`}
                      label="Hull"
                      accessibilityLabel="increase hull"
                      image={HullImage}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.computer`}
                      label="Computer"
                      accessibilityLabel="increase computer"
                      image={ComputerImage}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.shield`}
                      label="Shield"
                      accessibilityLabel="increase shield"
                      image={ShieldImage}
                    />
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 'fit-content',
                        padding: 4,
                      }}
                      onClick={() => {
                        removeFunctions[shipSide](index)
                      }}>
                      <TrashBinIcon />
                    </button>
                  </div>
                  <div
                    className="elevation-2"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(6, 1fr)',
                      padding: 8,
                      gap: 16,
                    }}>
                    <label style={{ display: 'flex', alignSelf: 'center', justifySelf: 'center' }}>
                      Cannons
                    </label>
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.cannon.yellow`}
                      accessibilityLabel="increase yellow cannon"
                      image={YellowWeaponImage}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.cannon.orange`}
                      accessibilityLabel="increase orange cannon"
                      image={OrangeWeaponImage}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.cannon.blue`}
                      accessibilityLabel="increase blue cannon"
                      image={BlueWeaponImage}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.cannon.red`}
                      accessibilityLabel="increase red cannon"
                      image={RedWeaponImage}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.cannon.pink`}
                      accessibilityLabel="increase rift cannon"
                      image={PinkWeaponImage}
                    />
                    <label style={{ display: 'flex', alignSelf: 'center', justifySelf: 'center' }}>
                      Missiles
                    </label>
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.missile.yellow`}
                      accessibilityLabel="increase yellow missile"
                      image={YellowWeaponImage}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.missile.orange`}
                      accessibilityLabel="increase orange missile"
                      image={OrangeWeaponImage}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.missile.blue`}
                      accessibilityLabel="increase blue missile"
                      image={BlueWeaponImage}
                    />
                    <NumberInput
                      control={control}
                      name={`${shipSide}.${index}.missile.red`}
                      accessibilityLabel="increase red missile"
                      image={RedWeaponImage}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div style={{ height: 20 }} />
      <button type="submit">Submit</button>

      {simulationResult && (
        <div>
          <h2>Results</h2>
          <p>Attacker wins: {formatPercent(simulationResult.winChance)}</p>
          <ProbabilityDiagram survivalChances={simulationResult.survivalChances} />
        </div>
      )}
    </form>
  )
}

export default App
