import { categorizedDictionaryDataMap, categorizedDictionaryMap, dictionaryMap } from '../resources/dictionary.ts'
import { Categories, CategoriesLabel, DictionaryCategories, DictionaryResource } from '../types/resources.ts'
import LearningDictionaryModel, { LearningDictionaryData } from '../dao/models/learningDictionary.tsx'
import useDictionaryStore from '../store/dictionary.store.ts'
import useSysStore from '../store/sys.store.ts'
import useDao from '../dao/useDao.ts'

const useDictionary = () => {
  const { getQuery } = useDao()
  const { data, learningDictionary } = useSysStore()
  const { dictionaryItemLabel } = useDictionaryStore()

  /**
   * 词典筛选
   */
  const getCategorizedDictionaryMap = Object.keys(dictionaryMap).reduce((pre: DictionaryCategories, cur: string) => {
    pre[cur] = dictionaryMap[cur].reduce((categories: Categories, exam: DictionaryResource) => {
      exam.tags.forEach(tag => {
        if (categories[tag]) {
          categories[tag].push(exam)
        } else {
          categories[tag] = [exam]
        }
      })
      return categories
    }, {})
    return pre
  }, {})

  /**
   * 字典标题分类
   * @return string[] 标签列表
   */
  const getCategorizedDictionaryTitle = Object.keys(categorizedDictionaryMap)

  /**
   * 根据字典标题获取对应的类目的标签
   */
  const getCategorizedDictionaryItemLabel: CategoriesLabel = Object.keys(dictionaryMap).reduce((pre: CategoriesLabel, cur: string) => {
    pre[cur] = dictionaryMap[cur].reduce((categories: string[], exam: DictionaryResource) => {
      exam.tags.forEach(tag => {
        if (!categories.includes(tag)) {
          categories.push(tag)
        }
      })
      return categories
    }, [])
    return pre
  }, {})

  /**
   * 根据标签获取对应的词库标记
   * @param label 词库标签
   * @return string[] 标签列表
   */
  const getCategorizedItemLabelData = (label: string) => {
    return Array.from(new Set(categorizedDictionaryMap[label]
        .map((item: string) => dictionaryItemLabel[item])
        .reduce((acc, curr) => acc.concat(curr), [])
        .sort((a, b) => (a === '其他' ? 1 : b === '其他' ? -1 : 0))
      )
    ) || []
  }

  /**
   * 根据传递标签获取对应的数据
   * @param label 词库标签
   */
  const getSelectItemLabelData = (label: string) => {
    dictionaryMap[label].reduce((categories: Categories, exam: DictionaryResource) => {
      exam.tags.forEach(tag => {
        if (categories[tag]) {
          categories[tag].push(exam)
        } else {
          categories[tag] = [exam]
        }
      })
      return categories
    }, {})
  }

  /**
   * 根据标签获取对应的词库列表
   * @param label 词库标签
   * @param tags 词库标记
   * @return DictionaryResource[] 词库列表
   */
  const getCategorizedDictionaryData = (label: string, tags: string) => {
    return categorizedDictionaryDataMap[label].filter((item) => {
      return item.tags.includes(tags)
    }) || []
  }

  /**
   * 根据词库Id和词库数量计算出学习进度
   * @param id 词库Id
   * @param length 词库数量
   * @return number 百分比进度
   */
  const getProgress = (id: string, length: number) => {
    const res = getQuery<LearningDictionaryData[]>(LearningDictionaryModel, {
      label: 'dictionaryId', query: id
    })
    const rawProgress = res.length > 0 ? (res[0].learning / length) * 100 : 0
    return parseFloat(Math.min(100, rawProgress).toFixed(2))
  }

  /**
   * 根据词库Id和词库数量计算出首页学习进度
   * @return number 百分比进度
   */
  const getHomeProgress = () => {
    const length = (data?.dictionaryResource.length || 0)
    const rawProgress = learningDictionary !== null ? (learningDictionary.learning / length) * 100 : 0
    return parseFloat(Math.min(100, rawProgress).toFixed(2))
  }

  return {
    getCategorizedDictionaryMap,
    getCategorizedDictionaryTitle,
    getCategorizedDictionaryItemLabel,
    getSelectItemLabelData,
    getCategorizedItemLabelData,
    getCategorizedDictionaryData,
    getProgress,
    getHomeProgress
  }
}

export default useDictionary
