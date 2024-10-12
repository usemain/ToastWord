import { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RealmProvider } from '@realm/react'
import { IThemeName } from './lib/types/theme.ts'
import { NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { ThemeColors } from './lib/configs/theme.ts'
import LearningDictionaryModel from './lib/dao/models/learningDictionary.tsx'
import LearningDaysModel from './lib/dao/models/learningDays.tsx'
import CollectionWordModel from './lib/dao/models/collectionWord.tsx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useSysStore from './lib/store/sys.store.ts'
import providers from './lib/providers'
import Layout from './lib/screens/layout.tsx'

const root = providers.reduce((child, Parent) => {
  return <Parent children={child} />
}, <Layout />)

const App = () => {
  const { theme, setTheme } = useSysStore()

  useEffect(() => {
    AsyncStorage.getItem('theme').then((theme) => {
      setTheme(theme as IThemeName || 'light')
    })
  }, [])

  return (
    <RealmProvider schema={[LearningDictionaryModel, LearningDaysModel, CollectionWordModel]}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ThemeProvider value={ThemeColors[theme]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
            {root}
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </RealmProvider>
  )
}

export default App
