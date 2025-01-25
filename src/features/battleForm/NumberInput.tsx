import { ComponentProps, FunctionComponent } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'

import type { FormValues } from './types'

const BUTTON_SIZE = 30

type NumberFieldNames = Exclude<
  UseControllerProps<FormValues>['name'],
  | 'attackerShips'
  | 'defenderShips'
  | `${'attackerShips' | 'defenderShips'}.${number}`
  | `${'attackerShips' | 'defenderShips'}.${number}.type`
  | `${'attackerShips' | 'defenderShips'}.${number}.isNpc`
  | `${'attackerShips' | 'defenderShips'}.${number}.cannon`
  | `${'attackerShips' | 'defenderShips'}.${number}.missile`
>

type Props = {
  name: NumberFieldNames
  control: UseControllerProps<FormValues>['control']
  label: string
  labelHidden?: boolean
  title: string
  image: string
} & ComponentProps<'input'>

export const NumberInput: FunctionComponent<Props> = ({
  name,
  control,
  label,
  labelHidden = false,
  title,
  image,
  ...inputProps
}) => {
  const { field } = useController({ name, control })

  const onIncrement = () => {
    if (inputProps.max && field.value >= Number(inputProps.max)) return

    field.onChange((Number(field.value) || 0) + 1)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <label htmlFor={name} hidden={labelHidden}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: 8, flexGrow: 1 }}>
        <input
          id={name}
          type="number"
          aria-label={label}
          min={0}
          {...field}
          {...inputProps}
          style={{ margin: 3, width: BUTTON_SIZE - 6, textAlign: 'center' }}
        />
        <button
          type="button"
          title={title}
          onClick={onIncrement}
          style={{
            display: 'flex',
            padding: 2,
            backgroundColor: 'rgba(0,0,0,0)',
            alignSelf: 'center',
          }}>
          <img src={image} width={BUTTON_SIZE} />
        </button>
      </div>
    </div>
  )
}
