import { create } from 'zustand'
import { CategoriesLabel } from '../types/resources.ts'

type Props = {
  dictionaryTitle: string[]
  setDictionaryTitle: (e: string[]) => void
  dictionaryItemLabel: CategoriesLabel
  setDictionaryItemLabel: (e: CategoriesLabel) => void
}

const useDictionaryStore = create<Props>((set) => ({
  // 字典标题分类
  dictionaryTitle: [],
  setDictionaryTitle: (e) => set(() => ({ dictionaryTitle: e })),

  // 字典分类标签
  dictionaryItemLabel: {},
  setDictionaryItemLabel: (e) => set(() => ({ dictionaryItemLabel: e }))
}))

export default useDictionaryStore
