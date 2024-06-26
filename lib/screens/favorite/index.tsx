import { useEffect, useRef, useState } from 'react'
import { Animated, Image, Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COMMON_COLOR, COMMON_COLOR_DEFAULT } from '../../configs/colors.ts'
import { ITEM_SCALE } from '../../configs/consts.ts'
import styles, { BORDER_SIZE } from '../../styles/list.ts'
import LinearGradient from 'react-native-linear-gradient'
import Loading from '../../components/loading'
import CollectionWordModel, { CollectionWordData } from '../../dao/models/collectionWord.tsx'
import useSysStore from '../../store/sys.store.ts'
import useDao from '../../dao/useDao.ts'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Word } from '../../types/resources.ts'

const Favorite = () => {
  const insets = useSafeAreaInsets()
  const isFocused = useIsFocused()
  const scrollY = useRef(new Animated.Value(0)).current
  const { navigate } = useNavigation()
  const { data } = useSysStore()
  const { getQuery } = useDao()
  const [wordData, setWordData] = useState<CollectionWordData[]>([])

  useEffect(() => {
    setWordData(getQuery<CollectionWordData[]>(CollectionWordModel, {
      label: 'dictionaryId',
      query: data?.dictionaryResource.id
    }))
  }, [isFocused])

  const renderItem = ({ item, index }: { item: CollectionWordData, index: number }) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SCALE * index, ITEM_SCALE * (index + 2)],
      outputRange: [1, 1, 1, 0]
    })

    const onChange = () => {
      navigate('Play' as never, {
        data: [
          item.notation ? {
            name: item.name,
            trans: item.trans,
            usphone: item.usphone,
            ukphone: item.ukphone,
            notation: item.notation
          } : {
            name: item.name,
            trans: item.trans,
            usphone: item.usphone,
            ukphone: item.ukphone
          }
        ] as Word[],
        currentIndex: 0,
        length: 0,
        type: 'favorite'
      } as never)
    }

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable onPress={onChange}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[COMMON_COLOR_DEFAULT, COMMON_COLOR]}
            style={styles.box}
          >
            <View style={styles.flexBox}>
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {item.trans.join(';')}
              </Text>
              <Text numberOfLines={1} style={styles.length}>
                {(item.ukphone || item.usphone) ? item.usphone : item.notation}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <Loading>
      {
        wordData.length === 0 ? (
          <View style={styles.nullView}>
            <Image style={styles.nullImg} source={require('../../assets/null.png')} />
          </View>
        ) : (
          <Animated.FlatList
            style={{ flex: 1 }}
            data={wordData}
            overScrollMode={'never'}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            contentContainerStyle={{
              paddingHorizontal: BORDER_SIZE,
              paddingBottom: insets.bottom + BORDER_SIZE
            }}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ height: BORDER_SIZE }} />}
          />
        )
      }
    </Loading>
  )
}

export default Favorite
