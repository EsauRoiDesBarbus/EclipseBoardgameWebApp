import { ComponentProps, FunctionComponent } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'
import type { FormValues } from './types'

const BUTTON_SIZE = 30

type NumberFieldNames = Exclude<
  UseControllerProps<FormValues>['name'],
  | 'ships'
  | `ships.${number}`
  | `ships.${number}.type`
  | `ships.${number}.cannon`
  | `ships.${number}.missile`
>

type Props = {
  name: NumberFieldNames
  control: UseControllerProps<FormValues>['control']
  label?: string
  accessibilityLabel: string
  image: string
} & ComponentProps<'input'>

export const NumberInput: FunctionComponent<Props> = ({
  name,
  control,
  label,
  accessibilityLabel,
  image,
  ...inputProps
}) => {
  const { field } = useController({ name, control })

  const onIncrement = () => {
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
      {label ? <label htmlFor={name}>{label}</label> : null}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          id={name}
          type="number"
          min={0}
          {...field}
          {...inputProps}
          style={{ margin: 3, maxWidth: BUTTON_SIZE - 6, textAlign: 'center' }}
        />
        <button
          type="button"
          onClick={onIncrement}
          style={{ display: 'flex', padding: 2, backgroundColor: 'rgba(0,0,0,0)' }}>
          <img src={image} height={BUTTON_SIZE} width={BUTTON_SIZE} alt={accessibilityLabel} />
        </button>
      </div>
    </div>
  )
}
