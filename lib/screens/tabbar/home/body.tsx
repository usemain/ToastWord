import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { COMMON_COLOR, COMMON_COLOR_DEFAULT } from '../../../configs/colors.ts'
import styles from '../../../styles/list.ts'
import { useIsFocused } from '@react-navigation/native'
import CollectionWordModel, { CollectionWordData } from '../../../dao/models/collectionWord.tsx'
import globalStyles from '../../../configs/globalStyles.ts'
import useSysStore from '../../../store/sys.store.ts'
import LinearGradient from 'react-native-linear-gradient'
import useDao from '../../../dao/useDao.ts'
import useHomeService from '../../../services/useHomeService.ts'

const Body = () => {
  const isFocused = useIsFocused()
  const { data } = useSysStore()
  const { getQuery } = useDao()
  const { openPlay } = useHomeService()
  const [favorite, setFavorite] = useState(0)

  useEffect(() => {
    if (isFocused) {
      setFavorite(getQuery<CollectionWordData[]>(CollectionWordModel, {
        label: 'dictionaryId',
        query: data?.dictionaryResource.id
      }).length)
    }
  }, [isFocused,data])

  return (
    <View style={globalStyles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[COMMON_COLOR_DEFAULT, COMMON_COLOR]}
        style={styles.box}
      >
        <View style={styles.flexBox}>
          <Text numberOfLines={1} style={styles.name}>
            词库 {data ? data.dictionaryResource.name : '未选择'}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            类目 {data ? data.title : '未选择'}
          </Text>
          <Text numberOfLines={1} style={styles.length}>
            收藏 {favorite}
          </Text>
        </View>
        <Pressable style={styles.rightIcon} onPress={openPlay}>
          <Text style={styles.openPlayText}>开始</Text>
        </Pressable>
      </LinearGradient>
    </View>
  )
}
export default Body
