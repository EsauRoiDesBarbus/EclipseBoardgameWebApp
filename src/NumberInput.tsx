import { ComponentProps, FunctionComponent, forwardRef } from 'react'

const BUTTON_SIZE = 30

type Props = {
  id: string
  name: string
  accessibilityLabel: string
  image: any
  onIncrement: () => void
} & ComponentProps<'input'>

type Ref = HTMLInputElement

export const NumberInput: FunctionComponent<Props> = forwardRef<Ref, Props>(
  ({ id, name, accessibilityLabel, image, onIncrement, ...inputProps }, ref) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label htmlFor={id}>{name}</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input id={id} type="number" ref={ref} min={0} {...inputProps} style={{ width: 30 }} />
        <button
          type="button"
          onClick={onIncrement}
          style={{ display: 'flex', padding: 2, backgroundColor: 'rgba(0,0,0,0)' }}>
          <img src={image} height={BUTTON_SIZE} width={BUTTON_SIZE} alt={accessibilityLabel} />
        </button>
      </div>
    </div>
  )
)
