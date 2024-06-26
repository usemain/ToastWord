import { useRealm } from '@realm/react'
import { Queries } from '../types/dao.ts'
import { LearningDictionaryData } from './models/learningDictionary.tsx'

const useDao = () => {
  const realm = useRealm()

  const getQuery = <T>(model: Realm.ObjectClass, ...queries: Queries[]): T => {
    let filterString = ''
    const values: any[] = []

    queries.forEach(({ label, query }, index) => {
      filterString += `${label} = $${index} && `
      values.push(query)
    })

    filterString = filterString.slice(0, -3)

    return realm.objects(model).filtered(filterString, ...values) as unknown as T
  }

  const setQuery = <T extends object>(model: Realm.ObjectClass, data: T) => {
    realm.write(() => {
      realm.create(model, data)
    })
  }

  const updateLearningDictionaryQuery = (model: LearningDictionaryData, value: number) => {
    realm.write(() => {
      model.learning = value
    })
  }

  const delQuery = <T>(data: T) => {
    realm.write(() => {
      realm.delete(data)
    })
  }


  return {
    getQuery,
    setQuery,
    delQuery,
    updateLearningDictionaryQuery
  }
}

export default useDao
