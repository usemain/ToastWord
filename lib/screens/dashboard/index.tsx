import { useEffect } from 'react'
import { BackHandler, NativeEventSubscription } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Navigation } from '../../types/common.ts'
import Tabs from './tabs'
import Home from './home'
import Card from './card'
import Msg from './msg'
import Menu from './menu'

const { Navigator, Screen } = createBottomTabNavigator()

type Props = {
  navigation: Navigation
}

const Dashboard = ({ navigation }: Props) => {
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
      <Screen name="Card" component={Card} />
      <Screen name="Msg" component={Msg} />
      <Screen name="Menu" component={Menu} />
    </Navigator>
  )
}

export default Dashboard
