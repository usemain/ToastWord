import { create } from 'zustand'
import { Data } from '../types/home.ts'
import { Word } from '../types/resources.ts'
import { LearningDictionaryData } from '../dao/models/learningDictionary.tsx'
import { IThemeName } from '../types/theme.ts'

type Props = {
  data: Data | null
  setData: (e: Data) => void
  learningDictionary: LearningDictionaryData | null
  setLearningDictionary: (e: LearningDictionaryData | null) => void
  dictionaryData: Word[]
  setDictionaryData: (e: Word[]) => void
  theme: IThemeName
  setTheme: (theme: IThemeName) => void
}

const useSysStore = create<Props>((set) => ({
  // 选中的词库参数
  data: null,
  setData: (e) => set(() => ({ data: e })),

  // 当前词库学习进度
  learningDictionary: null,
  setLearningDictionary: (e: LearningDictionaryData | null) => set(() => ({ learningDictionary: e })),

  // 当前词库Json
  dictionaryData: [],
  setDictionaryData: (e: Word[]) => set(() => ({ dictionaryData: e })),

  // 当前主题色
  theme: 'light',
  setTheme: (theme: IThemeName) => set(() => ({ theme }))
}))

export default useSysStore
