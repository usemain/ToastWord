export type ToastIconTextType = 'info' | 'success' | 'error'

export type ToastDataType = {
  content: string
  type?: ToastIconTextType
}

export type ToastIconType = {
  icon: string
  color: string
}

export type UseToastType = {
  open: (data: ToastDataType) => void
}
