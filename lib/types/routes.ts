import { JSX } from 'react'

export type RoutesType = {
  name: string
  component: () => JSX.Element
  options?: RoutesOptionsType
  initialParams?: RoutesInitialParamsType
}

export type RoutesOptionsType = {
  title?: string
  headerShown?: boolean
}

export type RoutesInitialParamsType = {
  auth?: boolean
}
