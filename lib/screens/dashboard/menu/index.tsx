import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Navigation } from '../../../types/common.ts'
import { ThemedText } from '../../../components/ThemedText.tsx'

const Menu = () => {
  const navigation: Navigation = useNavigation()

  return (
    <View style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Pressable onPress={() => navigation.navigate('Theme' as never)}>
        <ThemedText>Menu</ThemedText>
      </Pressable>
    </View>
  )
}

export default Menu
