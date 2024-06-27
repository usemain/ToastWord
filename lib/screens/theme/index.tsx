import { Pressable, View } from 'react-native'
import { ThemedText } from '../../components/ThemedText.tsx'
import { useThemeColor } from '../../hooks/useThemeColor.ts'
import { ThemeData } from '../../configs/theme.ts'
import { IThemeData, IThemeName } from '../../types/theme.ts'
import Loading from '../../components/LoadingView.tsx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useSysStore from '../../store/sys.store.ts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from '../../styles/theme.ts'

const Theme = () => {
  const { theme, setTheme } = useSysStore()

  const setThemePress = async (type: IThemeName) => {
    if (theme === type) return
    await AsyncStorage.setItem('theme', type)
    setTheme(type)
  }

  return (
    <Loading>
      <View style={styles.container}>
        {
          ThemeData.map((item: IThemeData) => (
            <Pressable key={item.type} style={styles.box} onPress={() => setThemePress(item.type)}>
              <ThemedText style={styles.text}>{item.title}</ThemedText>
              <View style={styles.check}>
                {
                  theme === item.type && (
                    <MaterialIcons name={'check'} size={20} color={useThemeColor('text')} />
                  )
                }
              </View>
            </Pressable>
          ))
        }
      </View>
    </Loading>
  )
}

export default Theme
