import { useEffect } from 'react'
import { BackHandler, NativeEventSubscription } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Navigation } from '../../types/common.ts'
import Tabs from './tabs'
import Home from './home'
import Search from './search'
import Chart from './chart'
import My from './my'

const { Navigator, Screen } = createBottomTabNavigator()

type Props = {
  navigation: Navigation
}

const TabBar = ({ navigation }: Props) => {
  useEffect(() => {
    const backAction = (): boolean => {
      if (navigation.getState().routes.length === 1) {
        BackHandler.exitApp()
        return true
      }
      return false
    }

    const backHandler: NativeEventSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [navigation.getState().routes])

  return (
    <Navigator
      tabBar={(props) => <Tabs tabData={props} />}
      screenOptions={() => ({ headerShown: false })}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Search" component={Search} />
      <Screen name="Chart" component={Chart} />
      <Screen name="My" component={My} />
    </Navigator>
  )
}

export default TabBar
