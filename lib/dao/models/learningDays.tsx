import Realm, { ObjectSchema } from 'realm'

export type LearningDaysData = {
  dictionaryId: string
  learning: number
}

class LearningDaysModel extends Realm.Object {
  static schema: ObjectSchema = {
    name: 'LearningDaysModel',
    primaryKey: 'date',
    properties: {
      date: 'string',
      nums: 'int'
    }
  }
}

export default LearningDaysModel
