import { View } from 'react-native'
import Header from './header.tsx'
import Body from './body.tsx'

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Body />
    </View>
  )
}

export default Home
