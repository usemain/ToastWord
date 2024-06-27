import { ThemeColors } from '../configs/theme.ts'
import useSysStore from '../store/sys.store.ts'

export function useThemeColor(
  colorName: keyof typeof ThemeColors.light.colors & keyof typeof ThemeColors.dark.colors
) {
  const { theme } = useSysStore()
  return ThemeColors[theme].colors[colorName]
}
