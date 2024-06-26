import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { ToastDataType, UseToastType } from '../types/toast.ts'
import { emptyFn } from '../configs/consts.ts'
import Toast from '../plugin/toast.tsx'

const Context = createContext<UseToastType>({
  open: emptyFn
})

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<ToastDataType | undefined>(undefined)

  const open = (data: ToastDataType) => {
    setData(data)
  }

  return (
    <Context.Provider value={{ open }}>
      {children}
      {data && <Toast data={data} close={() => setData(undefined)} />}
    </Context.Provider>
  )
}

export default ToastProvider

export const useToast = (): UseToastType => {
  return useContext(Context)
}
