import { useEffect, useRef, useState } from 'react'
import { BackHandler, FlatList } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Word } from '../types/resources.ts'
import CollectionWordModel, {
  CollectionWordData
} from '../dao/models/collectionWord.tsx'
import LearningDictionaryModel, {
  LearningDictionaryData
} from '../dao/models/learningDictionary.tsx'
import useSysStore from '../store/sys.store.ts'
import useDao from '../dao/useDao.ts'
import useAudio from '../hooks/useAudio.ts'

const usePlay = () => {
  const params = useRoute().params as {
    data: Word[]
    currentIndex: number
    length: number
    type?: string
  }
  const flatListRef = useRef<FlatList>(null)
  const { onAudioPlay } = useAudio()
  const { goBack } = useNavigation()
  const { data, learningDictionary, setLearningDictionary } = useSysStore()
  const { getQuery, setQuery, delQuery, updateLearningDictionaryQuery } =
    useDao()
  const [isCollection, setIsCollection] = useState(false)
  const [playingIndex, setPlayingIndex] = useState<number>(-1)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true
      }
    )
    return () => backHandler.remove()
  }, [])

  // 使用按钮切换单词
  const goToNextPage = (oldPage: number, newPage: number) => {
    if (!flatListRef.current) return

    if (newPage !== params.data.length && newPage >= 0) {
      flatListRef.current.scrollToIndex({ animated: true, index: newPage })
    }

    if (oldPage > newPage) {
      getUpdateLearningDictionary('del')
    } else if (newPage === params.data.length) {
      // 此章节结束最后一次增加学习量并返回上一页
      getUpdateLearningDictionary('add')
      goBack()
    } else {
      if (learningDictionary == null) {
        initializeLearningDictionary()
      } else {
        getUpdateLearningDictionary('add')
      }
    }
  }

  // 创建新的学习字典记录
  const initializeLearningDictionary = () => {
    let form = {
      dictionaryId: data?.dictionaryResource.id as string,
      learning: 1
    } as LearningDictionaryData
    setLearningDictionary(form)
    setQuery<LearningDictionaryData>(LearningDictionaryModel, form)
  }

  // 更新学习进度
  const getUpdateLearningDictionary = (type: 'add' | 'del') => {
    let res = getQuery<LearningDictionaryData[]>(LearningDictionaryModel, {
      label: 'dictionaryId',
      query: data?.dictionaryResource.id
    })
    if (res.length > 0) {
      let learning
      if (type === 'add') {
        learning = Math.min(
          res[0].learning + 1,
          data?.dictionaryResource.length as number
        )
      } else {
        // 判断如果一直点击上一个,最小边界是当前章数第0项
        learning = Math.max(res[0].learning - 1, params.length * 20)
      }
      setLearningDictionary({
        dictionaryId: data?.dictionaryResource.id as string,
        learning: learning
      })
      updateLearningDictionaryQuery(res[0], learning)
    }
  }

  // 确认/取消此单词收藏
  const onCollection = (page: number) => {
    if (isCollection) {
      delQuery<CollectionWordData[]>(selected(page))
      setIsCollection(false)
      if (params.type === 'favorite') goBack()
    } else {
      let form = {
        _id: new Date().getTime(),
        dictionaryId: data?.dictionaryResource.id,
        ...params.data[page]
      } as CollectionWordData
      setQuery<CollectionWordData>(CollectionWordModel, form)
      setIsCollection(true)
    }
  }

  // 查询是否收藏
  const selected = (page: number) => {
    return getQuery<CollectionWordData[]>(
      CollectionWordModel,
      {
        label: 'name',
        query: params.data[page].name
      },
      {
        label: 'dictionaryId',
        query: data?.dictionaryResource.id as string
      }
    )
  }

  // 播放单词
  const onWordPlay = async (index: number, word: Word) => {
    setPlayingIndex(index)
    await onAudioPlay(word, () => {
      setPlayingIndex(-1)
    })
  }

  return {
    setIsCollection,
    selected,
    onCollection,
    onWordPlay,
    goToNextPage,
    flatListRef,
    playingIndex,
    isCollection,
    params
  }
}

export default usePlay
