import { Word } from '../types/resources.ts'

/**
 * 根据传递的索引和章节长度获取显示第几章的数据
 * @param array 数据项
 * @param index 索引
 * @param chapterLength 每个章节的长度
 * @returns Word[]
 */
const getDataByIndex = (array: Word[], index: number, chapterLength: number): Word[] => {
  const startIndex = index * chapterLength
  const endIndex = Math.min(startIndex + chapterLength, array.length)
  return array.slice(startIndex, endIndex)
}

/**
 * 根据数据项和传递章节数计算出有多少章
 * @param array 数据项
 * @param chunkSize 章节展示的数量计算出一共有多少章
 * @return number 章节数
 */
const getCalculateNumberOfChunks = (array: Word[], chunkSize: number) => {
  return Math.ceil(array.length / chunkSize)
}

/**
 * 计算学习位置所在的章节索引
 * @param totalLength 总长度
 * @param chunkSize 每章长度
 * @param studyLength 学习长度
 * @returns number 学习位置所在的章节索引
 */
const getCalculateChapterIndex = (totalLength: number, chunkSize: number, studyLength: number): number => {
  // 计算章节数
  const totalChunks = Math.ceil(totalLength / chunkSize)

  // 计算学习位置所在的章节索引
  const chapterIndex = Math.floor(studyLength / chunkSize)

  // 确保章节索引不超过总章节数
  return Math.min(chapterIndex, totalChunks - 1)
}

/**
 * 根据总长度、当前学习进度和每章页数计算学习位置所在的章节和页数
 * @param totalLength 总长度
 * @param studyProgress 当前学习进度
 * @param pageSize 每章页数
 * @returns [number, number] 学习位置所在的章节和页数
 */
const getChapterAndPage = (totalLength: number, studyProgress: number, pageSize: number): [number, number] => {
  // 计算当前学习进度所在的章节
  const totalChapters = Math.ceil(totalLength / pageSize)
  let chapter = Math.floor(studyProgress / pageSize) + 1
  chapter = Math.min(chapter, totalChapters) // 确保不超过总章节数

  // 计算当前学习进度在章节中的页数
  const page = studyProgress % pageSize

  return [chapter, page]
}

export {
  getDataByIndex,
  getCalculateNumberOfChunks,
  getCalculateChapterIndex,
  getChapterAndPage
}
