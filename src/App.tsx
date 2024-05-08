import './App.css'

import { useForm, useFieldArray } from 'react-hook-form'
import { NumberInput } from './NumberInput'

import InitiativeImage from './assets/initiative.png'
import HullImage from './assets/hull.png'
import ComputerImage from './assets/computer.png'
import ShieldImage from './assets/shield.png'

type Weapon = {
  cannonY: number
  cannonO: number
  cannonB: number
  cannonR: number
  cannonP: number
}

type ShipType = 'interceptor' | 'cruiser' | 'dreadnought' | 'starbase'

type Ship = {
  type: ShipType
  initiative: number
  hull: number
  computer: number
  shield: number
  weapon: Weapon
  missile: Omit<Weapon, 'cannonP'>
}

function App() {
  const { register, control, handleSubmit, getValues, setValue } = useForm<{ ships: Ship[] }>({
    defaultValues: {
      ships: Array(4).fill({
        initiative: 0,
        hull: 0,
        computer: 0,
        shield: 0,
        weapon: {
          cannonY: 0,
          cannonO: 0,
          cannonB: 0,
          cannonR: 0,
          cannonP: 0,
        },
        missile: {
          cannonY: 0,
          cannonO: 0,
          cannonB: 0,
          cannonR: 0,
        },
      }),
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'ships',
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  const incrementValue = (
    path: `ships.${number}.${Exclude<keyof Ship, 'type' | 'weapon' | 'missile'>}`
  ) => {
    const currentHullValue = getValues(path)
    setValue(path, Number(currentHullValue) + 1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
          }}>
          <label>Ship {index + 1}</label>
          <select {...register(`ships.${index}.type`)}>
            <option value="interceptor">Interceptor</option>
            <option value="cruiser">Cruiser</option>
            <option value="dreadnought">Dreadnought</option>
            <option value="starbase">Star base</option>
          </select>
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
          {/* <input type="number" {...register(`ships.${index}.weapon`)} placeholder="Weapon" />
          <input type="number" {...register(`ships.${index}.missile`)} placeholder="Missile" /> */}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  )
}

export default App
