import { ComponentProps, FunctionComponent } from 'react'
import { useController } from 'react-hook-form'

const BUTTON_SIZE = 30

type Props = {
  name: string
  control: any
  label?: string
  accessibilityLabel: string
  image: any
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
    field.onChange((field.value || 0) + 1)
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
        <input id={name} type="number" min={0} {...field} {...inputProps} style={{ width: 30 }} />
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
