import { Word } from '../types/resources.ts'

function getVisibleItems(array: Word[], length: number) {
  const startIndex = Math.max(0, length - 20)
  const endIndex = Math.min(array.length, length + 20)
  return array.slice(startIndex, endIndex)
}

const array: Word[] = []

// 初始化时获取前20个元素
let length = 0
let visibleItems = getVisibleItems(array, length)

// 当需要更新可见项时，传入当前页码或长度
function updateVisibleItems(newLength: number) {
  // 如果剩余不足20个元素，则重新获取
  if (array.length - newLength <= 10 || newLength <= 10) {
    visibleItems = getVisibleItems(array, newLength)
  }
  // 更新当前长度
  length = newLength
  return visibleItems
}

// 例如向前翻页
const previousPage = () => {
  if (length > 0) {
    const newLength = Math.max(0, length - 20)
    return updateVisibleItems(newLength)
  }
  return visibleItems
}

// 例如向后翻页
const nextPage = () => {
  if (length < array.length) {
    const newLength = Math.min(array.length, length + 20)
    return updateVisibleItems(newLength)
  }
  return visibleItems
}
