import { ancientBlueprint, gardianBlueprint, gcdsBlueprint } from './blueprints'

export const getNpcBlueprint = (shipType: 'ancient' | 'gardian' | 'gcds') => {
  switch (shipType) {
    case 'ancient':
      return ancientBlueprint
    case 'gardian':
      return gardianBlueprint
    case 'gcds':
      return gcdsBlueprint
  }
}
