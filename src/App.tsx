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

import InterceptorImage from './assets/ship/interceptor.png'
import CruiserImage from './assets/ship/cruiser.png'
import DreadnoughtImage from './assets/ship/dreadnought.png'
import StarbaseImage from './assets/ship/starbase.png'

type Weapon = {
  yellow: number
  orange: number
  blue: number
  red: number
  pink: number
}

type ShipType = 'interceptor' | 'cruiser' | 'dreadnought' | 'starbase'

type Ship = {
  count: number
  type: ShipType
  initiative: number
  hull: number
  computer: number
  shield: number
  cannon: Weapon
  missile: Omit<Weapon, 'pink'>
}

type FormData = { ships: Ship[] }

function App() {
  const { register, control, handleSubmit, getValues, setValue, watch } = useForm<FormData>({
    defaultValues: {
      ships: Array(2).fill({
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
      }),
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'ships',
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const incrementValue = (
    field: `ships.${number}.${Exclude<keyof Ship, 'type' | 'cannon' | 'missile'>}`
  ) => {
    const currentHullValue = getValues(field)
    setValue(field, Number(currentHullValue) + 1)
  }

  const incrementArmamentValue = (
    field:
      | `ships.${number}.cannon.${keyof Weapon}`
      | `ships.${number}.missile.${Exclude<keyof Weapon, 'pink'>}`
  ) => {
    const currentHullValue = getValues(field)
    setValue(field, Number(currentHullValue) + 1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        const shipType = watch(`ships.${index}.type`)
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
                  {...register(`ships.${index}.type`)}
                  id={`ships.${index}.type`}
                  style={{ display: 'flex', flexGrow: 1, maxHeight: 36 }}>
                  <option value="interceptor">Interceptor</option>
                  <option value="cruiser">Cruiser</option>
                  <option value="dreadnought">Dreadnought</option>
                  <option value="starbase">Star base</option>
                </select>
              </div>
              <NumberInput
                {...register(`ships.${index}.count`)}
                id={`ships.${index}.count`}
                name="Number"
                accessibilityLabel="increase number of ships"
                image={getShipImage(shipType)}
                onIncrement={() => incrementValue(`ships.${index}.count`)}
              />
              <NumberInput
                {...register(`ships.${index}.initiative`)}
                id={`ships.${index}.initiative`}
                name="Initiative"
                accessibilityLabel="increase initiative"
                image={InitiativeImage}
                onIncrement={() => incrementValue(`ships.${index}.initiative`)}
              />
              <NumberInput
                {...register(`ships.${index}.hull`)}
                id={`ships.${index}.hull`}
                name="Hull"
                accessibilityLabel="increase hull"
                image={HullImage}
                onIncrement={() => incrementValue(`ships.${index}.hull`)}
              />
              <NumberInput
                {...register(`ships.${index}.computer`)}
                id={`ships.${index}.computer`}
                name="Computer"
                accessibilityLabel="increase computer"
                image={ComputerImage}
                onIncrement={() => incrementValue(`ships.${index}.computer`)}
              />
              <NumberInput
                {...register(`ships.${index}.shield`)}
                id={`ships.${index}.shield`}
                name="Shield"
                accessibilityLabel="increase shield"
                image={ShieldImage}
                onIncrement={() => incrementValue(`ships.${index}.shield`)}
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
                {...register(`ships.${index}.cannon.yellow`)}
                accessibilityLabel="increase yellow cannon"
                image={YellowWeaponImage}
                onIncrement={() => incrementArmamentValue(`ships.${index}.cannon.yellow`)}
              />
              <NumberInput
                {...register(`ships.${index}.cannon.orange`)}
                accessibilityLabel="increase orange cannon"
                image={OrangeWeaponImage}
                onIncrement={() => incrementArmamentValue(`ships.${index}.cannon.orange`)}
              />
              <NumberInput
                {...register(`ships.${index}.cannon.blue`)}
                accessibilityLabel="increase blue cannon"
                image={BlueWeaponImage}
                onIncrement={() => incrementArmamentValue(`ships.${index}.cannon.blue`)}
              />
              <NumberInput
                {...register(`ships.${index}.cannon.red`)}
                accessibilityLabel="increase red cannon"
                image={RedWeaponImage}
                onIncrement={() => incrementArmamentValue(`ships.${index}.cannon.red`)}
              />
              <NumberInput
                {...register(`ships.${index}.cannon.pink`)}
                accessibilityLabel="increase rift cannon"
                image={PinkWeaponImage}
                onIncrement={() => incrementArmamentValue(`ships.${index}.cannon.pink`)}
              />
              <label style={{ display: 'flex', alignSelf: 'center', justifySelf: 'center' }}>
                Missiles
              </label>
              <NumberInput
                {...register(`ships.${index}.missile.yellow`)}
                accessibilityLabel="increase yellow missile"
                image={YellowWeaponImage}
                onIncrement={() => incrementArmamentValue(`ships.${index}.missile.yellow`)}
              />
              <NumberInput
                {...register(`ships.${index}.missile.orange`)}
                accessibilityLabel="increase orange missile"
                image={OrangeWeaponImage}
                onIncrement={() => incrementArmamentValue(`ships.${index}.missile.orange`)}
              />
              <NumberInput
                {...register(`ships.${index}.missile.blue`)}
                accessibilityLabel="increase blue missile"
                image={BlueWeaponImage}
                onIncrement={() => incrementArmamentValue(`ships.${index}.missile.blue`)}
              />
              <NumberInput
                {...register(`ships.${index}.missile.red`)}
                accessibilityLabel="increase red missile"
                image={RedWeaponImage}
                onIncrement={() => incrementArmamentValue(`ships.${index}.missile.red`)}
              />
            </div>
          </div>
        )
      })}
      <button type="submit">Submit</button>
    </form>
  )
}

const getShipImage = (shipType: ShipType) => {
  switch (shipType) {
    case 'interceptor':
      return InterceptorImage
    case 'cruiser':
      return CruiserImage
    case 'dreadnought':
      return DreadnoughtImage
    case 'starbase':
      return StarbaseImage
    default:
      return InterceptorImage
  }
}

export default App
