import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COMMON_COLOR_DEFAULT } from '../../../configs/colors.ts'
import useHomeService from '../../../services/useHomeService.ts'
import ProgressCircle from '../../../components/progress/circle.tsx'
import useDictionary from '../../../hooks/useDictionary.ts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from '../../../styles/tabbarStyles/home.ts'
import globalStyles from '../../../configs/globalStyles.ts'
import useSysStore from '../../../store/sys.store.ts'

const Header = () => {
  const insets = useSafeAreaInsets()
  const { data, learningDictionary } = useSysStore()
  const { getHomeProgress } = useDictionary()
  const { openDictionaryTitlePicker, openChapterPicker, openFavorite } = useHomeService()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(getHomeProgress())
  }, [data, learningDictionary])

  const ActionBar = () => (
    <View style={[styles.actionBar, { top: insets.top + 10 }]}>
      <Pressable onPress={openDictionaryTitlePicker} style={globalStyles.flexRowBox}>
        <MaterialIcons name={'g-translate'} size={16} color={COMMON_COLOR_DEFAULT} />
        <Text style={styles.title}>词库</Text>
      </Pressable>
      <View style={globalStyles.flexRowBox}>
        <Pressable style={{ marginRight: 15 }} onPress={openFavorite}>
          <MaterialIcons name={'favorite-border'} size={19} color={COMMON_COLOR_DEFAULT} />
        </Pressable>

        <Pressable onPress={openChapterPicker}>
          <MaterialIcons name={'menu'} size={22} color={COMMON_COLOR_DEFAULT} />
        </Pressable>
      </View>
    </View>
  )

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <ActionBar />
      <ProgressCircle progress={progress} />
    </View>
  )
}

export default Header
