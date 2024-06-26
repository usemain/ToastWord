export type DialogDataType = {
  content: string
  okText?: string
  emitText?: string
  okColor?: string
  emitColor?: string
  ok?: () => void
  emit?: () => void
  gotIt?: () => void
}

export type UseDialogType = {
  open: (data: DialogDataType) => void
}
