import { ComponentProps, FunctionComponent } from 'react'
import { getShipImage } from './getShipImage'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'

type Props = {
  shipType: Parameters<typeof getShipImage>[0]
} & ComponentProps<'button'>

const getShipName = {
  interceptor: msg`Interceptor`,
  cruiser: msg`Cruiser`,
  dreadnought: msg`Dreadnought`,
  starbase: msg`Starbase`,
  npc: msg`NPC`,
  ancient: msg`Ancient`,
  guardian: msg`Guardian`,
  gcds: msg`GCDS`,
} as const

export const AddBlueprintButton: FunctionComponent<Props> = ({ shipType, ...buttonProps }) => {
  const { _ } = useLingui()
  return (
    <button
      type="button"
      title={_(msg`Add ${_(getShipName[shipType])}`)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
      {...buttonProps}>
      {_(getShipName[shipType])}
      <img src={getShipImage(shipType)} width={30} />
    </button>
  )
}
