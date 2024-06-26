import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { DictionaryResource } from '../types/resources.ts'
import useDictionary from '../hooks/useDictionary.ts'
import dictionaryJsonMap from '../resources/dictionaryJson.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useSysStore from '../store/sys.store.ts'
import LearningDictionaryModel, { LearningDictionaryData } from '../dao/models/learningDictionary.tsx'
import useDao from '../dao/useDao.ts'

const useCategorizedMenu = () => {
  const { getQuery } = useDao()
  const { setOptions } = useNavigation()
  const { title } = useRoute().params as { title: string }
  const { setData, setDictionaryData, setLearningDictionary } = useSysStore()
  const { getCategorizedDictionaryData, getCategorizedItemLabelData } = useDictionary()
  const [active, setActive] = useState(0)
  const [categorizedLabelData, setCategorizedLabelData] = useState<string[]>([])
  const [categorizedDictionaryData, setCategorizedDictionaryData] = useState<DictionaryResource[]>([])

  useEffect(() => {
    setOptions({ title })
    const res = getCategorizedItemLabelData(title)
    setCategorizedDictionaryData(getCategorizedDictionaryData(title, res[active]))
    setCategorizedLabelData(res)
  }, [])

  const onMenuChange = (e: number) => {
    setActive(e)
    setCategorizedDictionaryData(getCategorizedDictionaryData(title, categorizedLabelData[e]))
  }

  const onDictionaryChange = async (e: DictionaryResource) => {
    const rawData = {
      title: title,
      label: categorizedLabelData[active],
      dictionaryResource: e
    }
    const res = getQuery<LearningDictionaryData[]>(LearningDictionaryModel, {
      label: 'dictionaryId', query: e.id
    })
    if (res.length === 0) {
      setLearningDictionary(null)
    } else {
      setLearningDictionary(res[0])
    }
    setData(rawData)
    setDictionaryData(dictionaryJsonMap[e.url]())

    await AsyncStorage.setItem('$DATA', JSON.stringify(rawData))
  }

  return {
    active,
    categorizedLabelData,
    categorizedDictionaryData,
    onMenuChange,
    onDictionaryChange
  }
}

export default useCategorizedMenu
