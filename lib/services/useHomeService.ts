import useDao from '../dao/useDao.ts'
import useSysStore from '../store/sys.store.ts'
import useDictionaryStore from '../store/dictionary.store.ts'
import { usePicker } from '../context/picker.tsx'
import { useToast } from '../context/toast.tsx'
import LearningDictionaryModel, { LearningDictionaryData } from '../dao/models/learningDictionary.tsx'
import {
  getCalculateChapterIndex,
  getCalculateNumberOfChunks,
  getChapterAndPage,
  getDataByIndex
} from '../utils/classification.ts'
import { useNavigation } from '@react-navigation/native'
import { useDialog } from '../context/dialog.tsx'

const useHomeService = () => {
  const toast = useToast()
  const dialog = useDialog()
  const picker = usePicker()
  const { getQuery } = useDao()
  const { navigate } = useNavigation()
  const { data, dictionaryData, learningDictionary } = useSysStore()
  const { dictionaryTitle } = useDictionaryStore()

  // 打开词库选择器
  const openDictionaryTitlePicker = () => {
    picker.open({
      value: data?.title as string,
      data: dictionaryTitle.map((item) => ({
        value: item,
        label: item
      })),
      ok: (e) => {
        navigate(
          'CategorizedMenu' as never,
          { title: e.value } as never
        )
      }
    })
  }

  // 打开章节选择器
  const openChapterPicker = () => {
    if (data) {
      // 当前词库学习数据
      let res = getQuery<LearningDictionaryData[]>(LearningDictionaryModel, {
        label: 'dictionaryId', query: data.dictionaryResource.id
      })
      // 计算出当前词库学习章节
      let length = getCalculateNumberOfChunks(dictionaryData, 20)
      picker.open({
        value: res.length === 0 ? 0 : getCalculateChapterIndex(dictionaryData.length, 20, res[0].learning),
        data: Array.from({ length }, (_, index) => index).map((_, index) => ({
          value: index,
          label: `第${index + 1}章`
        })),
        ok: (e) => {
          navigate(
            'Catalogue' as never,
            {
              title: e.label,
              wordData: getDataByIndex(dictionaryData, e.value as number, 20)
            } as never
          )
        }
      })
    } else {
      toast.open({
        content: '请先选择词库',
        type: 'error'
      })
    }
  }

  // 开始阅读单词
  const openPlay = () => {
    if (data) {
      if (learningDictionary?.learning === data.dictionaryResource.length) {
        dialog.open({
          content: '您已学完该词库全部的单词!'
        })
        return
      }
      // 当前词库学习数据
      let res = getQuery<LearningDictionaryData[]>(LearningDictionaryModel, {
        label: 'dictionaryId', query: data.dictionaryResource.id
      })
      // 计算出学习位置所在的章节索引
      let length = res.length === 0 ? 0 : getCalculateChapterIndex(dictionaryData.length, 20, res[0].learning)
      // 获取章节的单词并开始学习
      let currentIndex = getChapterAndPage(dictionaryData.length, res.length === 0 ? 0 : res[0].learning, 20)
      navigate('Play' as never, {
        data: getDataByIndex(dictionaryData, length as number, 20),
        currentIndex: currentIndex[1],
        length: length
      } as never)
    } else {
      toast.open({
        content: '请先选择词库',
        type: 'error'
      })
    }
  }

  // 打开收藏详情
  const openFavorite = () => {
    if (data) {
      navigate('Favorite' as never)
    } else {
      toast.open({
        content: '请先选择词库',
        type: 'error'
      })
    }
  }

  return {
    openPlay,
    openFavorite,
    openChapterPicker,
    openDictionaryTitlePicker
  }
}

export default useHomeService
