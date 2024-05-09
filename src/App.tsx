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
import { getWinChance } from './api/getWinChance'

const defaultShip = {
  count: 1,
  initiative: 0,
  hull: 0,
  computer: 0,
  shield: 0,
  cannon: {
    yellow: 0,
    orange: 0,
    blue: 0,
    red: 0,
    pink: 0,
  },
  missile: {
    yellow: 0,
    orange: 0,
    blue: 0,
    red: 0,
  },
}

function App() {
  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      attackerShips: Array(2).fill(defaultShip),
      defenderShips: Array(2).fill(defaultShip),
    },
  })

  const { fields: attackerShipFields } = useFieldArray({
    control,
    name: 'attackerShips',
  })
  const { fields: defenderShipFields } = useFieldArray({
    control,
    name: 'defenderShips',
  })
  const fields = { attackerShips: attackerShipFields, defenderShips: defenderShipFields }

  const onSubmit = async (data: FormValues) => {
    const winChance = getWinChance(data)
    console.log(winChance)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {(['attackerShips', 'defenderShips'] as const).map((shipType) => (
        <div key={shipType}>
          <h2>{shipType === 'attackerShips' ? 'Attack' : 'Defense'}</h2>
          {fields[shipType].map((field, index) => {
            const shipTypeValue = watch(`${shipType}.${index}.type`)
            return (
              <div
                key={field.id}
                style={{
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  backgroundColor: '#333333',
                  padding: 16,
                  borderRadius: 8,
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
                      {...register(`${shipType}.${index}.type`)}
                      id={`${shipType}.${index}.type`}
                      style={{ display: 'flex', flexGrow: 1, maxHeight: 36 }}>
                      <option value="interceptor">Interceptor</option>
                      <option value="cruiser">Cruiser</option>
                      <option value="dreadnought">Dreadnought</option>
                      <option value="starbase">Star base</option>
                    </select>
                  </div>
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.count`}
                    label="Number"
                    accessibilityLabel="increase number of ships"
                    image={getShipImage(shipTypeValue)}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.initiative`}
                    label="Initiative"
                    accessibilityLabel="increase initiative"
                    image={InitiativeImage}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.hull`}
                    label="Hull"
                    accessibilityLabel="increase hull"
                    image={HullImage}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.computer`}
                    label="Computer"
                    accessibilityLabel="increase computer"
                    image={ComputerImage}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.shield`}
                    label="Shield"
                    accessibilityLabel="increase shield"
                    image={ShieldImage}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    padding: 8,
                    gap: 16,
                    backgroundColor: '#4A4A4A',
                    borderRadius: 8,
                  }}>
                  <label style={{ display: 'flex', alignSelf: 'center', justifySelf: 'center' }}>
                    Cannons
                  </label>
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.cannon.yellow`}
                    accessibilityLabel="increase yellow cannon"
                    image={YellowWeaponImage}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.cannon.orange`}
                    accessibilityLabel="increase orange cannon"
                    image={OrangeWeaponImage}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.cannon.blue`}
                    accessibilityLabel="increase blue cannon"
                    image={BlueWeaponImage}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.cannon.red`}
                    accessibilityLabel="increase red cannon"
                    image={RedWeaponImage}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.cannon.pink`}
                    accessibilityLabel="increase rift cannon"
                    image={PinkWeaponImage}
                  />
                  <label style={{ display: 'flex', alignSelf: 'center', justifySelf: 'center' }}>
                    Missiles
                  </label>
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.missile.yellow`}
                    accessibilityLabel="increase yellow missile"
                    image={YellowWeaponImage}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.missile.orange`}
                    accessibilityLabel="increase orange missile"
                    image={OrangeWeaponImage}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.missile.blue`}
                    accessibilityLabel="increase blue missile"
                    image={BlueWeaponImage}
                  />
                  <NumberInput
                    control={control}
                    name={`${shipType}.${index}.missile.red`}
                    accessibilityLabel="increase red missile"
                    image={RedWeaponImage}
                  />
                </div>
              </div>
            )
          })}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  )
}

export default App
