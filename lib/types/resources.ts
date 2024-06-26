export type Categories = {
  [key: string]: DictionaryResource[]
}

export type CategoriesDictionaryMap = {
  [key: string]: string[]
}

export type CategoriesDictionaryDataMap = {
  [key: string]: DictionaryResource[]
}

export type DictionaryJsonMap = {
  [key: string]: () => Word[]
}

export type CategoriesLabel = {
  [key: string]: string[]
}

export type DictionaryCategories = {
  [key: string]: Categories
}

export type LanguageType = 'en' | 'romaji' | 'zh' | 'ja' | 'code' | 'de'

export type LanguageCategoryType = 'en' | 'ja' | 'de' | 'code'

export type DictionaryResource = {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  url: string
  length: number
  language: LanguageType
  languageCategory: LanguageCategoryType
  defaultPronIndex?: number
}

export type Word = {
  name: string
  trans: string[]
  usphone: string
  ukphone: string
  notation?: string
}
