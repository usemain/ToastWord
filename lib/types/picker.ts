export type PICKER_DATA = {
  label: string
  value: string | number
  item?: any
}

export type PICKER_TYPE = {
  value?: string | number
  data: PICKER_DATA[]
  ok: (item: PICKER_DATA) => void
}

export type USE_PICKER_TYPE = {
  open: (data: PICKER_TYPE) => void
}
