import { useEffect, useRef, useState } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COMMON_COLOR, COMMON_COLOR_DEFAULT } from '../../configs/colors.ts'
import { Word } from '../../types/resources.ts'
import { ITEM_SCALE } from '../../configs/consts.ts'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles, { BORDER_SIZE } from '../../styles/list.ts'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Loading from '../../components/loading'
import useAudio from '../../hooks/useAudio.ts'

const Catalogue = () => {
  const insets = useSafeAreaInsets()
  const scrollY = useRef(new Animated.Value(0)).current
  const { setOptions } = useNavigation()
  const { title, wordData } = useRoute().params as { title: string, wordData: Word[] }
  const { onAudioPlay } = useAudio()
  const [playingIndex, setPlayingIndex] = useState<number>(-1)

  useEffect(() => {
    setOptions({ title })
  }, [])

  const renderItem = ({ item, index }: { item: Word, index: number }) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SCALE * index, ITEM_SCALE * (index + 2)],
      outputRange: [1, 1, 1, 0]
    })

    const onPlay = async () => {
      setPlayingIndex(index)
      await onAudioPlay(item, () => {
        setPlayingIndex(-1)
      })
    }

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable>
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
            <Pressable style={styles.rightIcon} onPress={onPlay}>
              <MaterialIcons
                size={25}
                name={'volume-up'}
                color={playingIndex === index ? '#057140' : '#28b573'}
              />
            </Pressable>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <Loading>
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
    </Loading>
  )
}

export default Catalogue
