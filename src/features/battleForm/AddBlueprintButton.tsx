import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ComponentProps, FunctionComponent } from 'react'

import { getShipImage } from './getShipImage'
import { shipNameToTranslation } from './shipNameToTranslation'

type Props = {
  shipType: Parameters<typeof getShipImage>[0]
} & ComponentProps<'button'>

export const AddBlueprintButton: FunctionComponent<Props> = ({ shipType, ...buttonProps }) => {
  const { _ } = useLingui()
  return (
    <button
      type="button"
      title={_(msg`Add ${_(shipNameToTranslation[shipType])}`)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
      {...buttonProps}>
      {_(shipNameToTranslation[shipType])}
      <img src={getShipImage(shipType)} width={30} />
    </button>
  )
}
