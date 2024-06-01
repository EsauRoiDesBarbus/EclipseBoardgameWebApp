import { ancientBlueprint, guardianBlueprint, gcdsBlueprint } from './blueprints'

export const getNpcBlueprint = (shipType: 'ancient' | 'guardian' | 'gcds') => {
  switch (shipType) {
    case 'ancient':
      return ancientBlueprint
    case 'guardian':
      return guardianBlueprint
    case 'gcds':
      return gcdsBlueprint
  }
}
