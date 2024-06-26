import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { emptyFn } from '../configs/consts.ts'
import { DialogDataType, UseDialogType } from '../types/dialog.ts'
import Dialog from '../plugin/dialog.tsx'

const Context = createContext<UseDialogType>({
  open: emptyFn
})

const DialogProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [data, setData] = useState<DialogDataType | undefined>(undefined)

  const open = (data: DialogDataType) => {
    setData(data)
    setVisible(true)
  }

  const close = () => {
    setData(undefined)
    setVisible(false)
  }

  return (
    <Context.Provider value={{ open }}>
      {children}
      {data && <Dialog visible={visible} data={data} close={close} />}
    </Context.Provider>
  )
}

export default DialogProvider

export const useDialog = (): UseDialogType => {
  return useContext(Context)
}
