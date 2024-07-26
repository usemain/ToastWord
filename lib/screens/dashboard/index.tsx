import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Tabs from './tabs'
import Home from './home'
import Card from './card'
import Msg from './msg'
import Menu from './menu'

const { Navigator, Screen } = createBottomTabNavigator()

const Dashboard = () => {

  return (
    <Navigator
      backBehavior={'none'}
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
