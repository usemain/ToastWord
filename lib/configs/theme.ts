import { IThemeColor, IThemeData } from '../types/theme.ts'

export const ThemeData: IThemeData[] = [
  {
    title: '浅色',
    type: 'light'
  },
  {
    title: '深色',
    type: 'dark'
  }
]

// 主题颜色配置
export const ThemeColors: IThemeColor = {
  light: {
    dark: false,
    colors: {
      primary: '#000000',
      background: '#FFFFFF',
      card: '#FFFFFF',
      text: '#000000',
      border: '#FFFFFF00',
      notification: '#000000'
    }
  },
  dark: {
    dark: true,
    colors: {
      primary: '#FFFFFF',
      background: '#0f0f15',
      card: '#0f0f15',
      text: '#FFFFFF',
      border: '#00000000',
      notification: '#000000'
    }
  }
}
