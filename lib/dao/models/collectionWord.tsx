import Realm, { ObjectSchema } from 'realm'

export type CollectionWordData = {
  _id: number
  dictionaryId: string,
  name: string
  trans: string[]
  usphone?: string
  ukphone?: string
  notation?: string
}

class CollectionWordModel extends Realm.Object {
  static schema: ObjectSchema = {
    name: 'CollectionWordModel',
    primaryKey: '_id',
    properties: {
      _id: 'int',
      dictionaryId: 'string',
      name: 'string',
      trans: 'string[]',
      usphone: 'string?',
      ukphone: 'string?',
      notation: 'string?'
    }
  }
}

export default CollectionWordModel
