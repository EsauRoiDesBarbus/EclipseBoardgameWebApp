import { ComponentProps, FunctionComponent } from 'react'
import { ShipType } from './types'
import { getShipImage } from './getShipImage'

type Props = {
  shipType: ShipType
} & ComponentProps<'button'>

export const AddBlueprintButton: FunctionComponent<Props> = ({ shipType, ...buttonProps }) => (
  <button
    type="button"
    style={{
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      gap: 8,
      maxWidth: 180,
    }}
    {...buttonProps}>
    Add {shipType}
    <img src={getShipImage(shipType)} height={30} width={30} alt={`add ${shipType}`} />
  </button>
)
