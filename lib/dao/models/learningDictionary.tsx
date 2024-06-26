import Realm, { ObjectSchema } from 'realm'

export type LearningDictionaryData = {
  dictionaryId: string
  learning: number
}

class LearningDictionaryModel extends Realm.Object {
  static schema: ObjectSchema = {
    name: 'LearningDictionaryModel',
    primaryKey: 'dictionaryId',
    properties: {
      dictionaryId: 'string',
      learning: 'int'
    }
  }
}

export default LearningDictionaryModel
