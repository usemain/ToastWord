import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { PICKER_TYPE, USE_PICKER_TYPE } from '../types/picker.ts'
import { emptyFn } from '../configs/consts.ts'
import Picker from '../plugin/picker.tsx'

const Context = createContext<USE_PICKER_TYPE>({
  open: emptyFn
})

const PickerProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [data, setData] = useState<PICKER_TYPE | undefined>(undefined)

  const open = (data: PICKER_TYPE) => {
    setData(data)
    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setData(undefined)
  }

  return (
    <Context.Provider value={{ open }}>
      {children}
      {data && <Picker visible={visible} data={data} close={close} />}
    </Context.Provider>
  )
}

export default PickerProvider

export const usePicker = (): USE_PICKER_TYPE => {
  return useContext(Context)
}
