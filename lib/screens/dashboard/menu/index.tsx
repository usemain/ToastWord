import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ThemedText } from '../../../components/ThemedText.tsx'

const Menu = () => {
  const { navigate } = useNavigation()

  return (
    <View style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Pressable onPress={() => navigate('Theme' as never)}>
        <ThemedText>Menu</ThemedText>
      </Pressable>
    </View>
  )
}

export default Menu
