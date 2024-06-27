// 主题名称
export type IThemeName = 'light' | 'dark'

// 主题颜色
export type ITheme = {
  primary: string
  background: string
  card: string
  text: string
  border: string
  notification: string
}

// 用于获取全部主题颜色
export type IThemeColor = {
  [key in IThemeName]: IThemeColorItem
}

// 用于获取主题颜色
export type IThemeColorItem = {
  // 是否暗色
  dark: boolean
  colors: ITheme
}

// 主题数据
export type IThemeData = {
  title: string
  type: IThemeName
}
