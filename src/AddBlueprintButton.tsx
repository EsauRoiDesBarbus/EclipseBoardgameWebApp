import { ComponentProps, FunctionComponent } from 'react'
import { getShipImage } from './getShipImage'

type Props = {
  shipType: Parameters<typeof getShipImage>[0]
} & ComponentProps<'button'>

export const AddBlueprintButton: FunctionComponent<Props> = ({ shipType, ...buttonProps }) => (
  <button
    type="button"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    }}
    {...buttonProps}>
    Add {shipType}
    <img src={getShipImage(shipType)} width={30} alt={`add ${shipType}`} />
  </button>
)
