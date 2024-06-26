import { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from '../../styles/play'
import usePlay from '../../services/usePlay.ts'

type Props = {
  page: number
}

const Header = ({ page }: Props) => {
  const insets = useSafeAreaInsets()
  const { goBack } = useNavigation()
  const { isCollection, onCollection, selected, setIsCollection } = usePlay()

  useEffect(() => {
    setIsCollection(selected(page).length > 0)
  }, [page])

  return (
    <View style={[styles.header, { marginTop: insets.top + 10 }]}>
      <Pressable onPress={goBack} style={styles.headerBtn}>
        <MaterialIcons name={'close'} size={25} color={'rgba(0,0,0,0.7)'} />
      </Pressable>

      <Pressable onPress={() => onCollection(page)} style={styles.headerBtn}>
        <MaterialIcons
          name={'favorite'}
          size={21}
          color={isCollection ? 'rgba(248,19,19,0.6)' : 'rgba(151,151,151,0.6)'}
        />
      </Pressable>
    </View>
  )
}

export default Header
