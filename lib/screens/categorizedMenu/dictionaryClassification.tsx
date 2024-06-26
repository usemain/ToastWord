import { useMemo, useRef } from 'react'
import { Animated, FlatList, Pressable, Text, View } from 'react-native'
import { DictionaryResource } from '../../types/resources.ts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COMMON_COLOR, COMMON_COLOR_DEFAULT } from '../../configs/colors.ts'
import { ITEM_SCALE } from '../../configs/consts.ts'
import styles, { BORDER_SIZE } from '../../styles/list.ts'
import LinearGradient from 'react-native-linear-gradient'
import ProgressCircle from '../../components/progress/circle.tsx'
import useDictionary from '../../hooks/useDictionary.ts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import useSysStore from '../../store/sys.store.ts'

type Props = {
  active: number
  dictionaryData: DictionaryResource[]
  onChange: (e: DictionaryResource) => void
}

const DictionaryClassification = ({ active, dictionaryData, onChange }: Props) => {
  const insets = useSafeAreaInsets()
  const scrollY = useRef(new Animated.Value(0)).current
  const flatListRef = useRef<FlatList>(null)
  const { data } = useSysStore()
  const { getProgress } = useDictionary()

  useMemo(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
  }, [active])

  const renderItem = ({ item, index }: { item: DictionaryResource, index: number }) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SCALE * index, ITEM_SCALE * (index + 2)],
      outputRange: [1, 1, 1, 0]
    })

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable disabled={data?.dictionaryResource.id === item.id} onPress={() => onChange(item)}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[COMMON_COLOR_DEFAULT, COMMON_COLOR]}
            style={styles.box}
          >
            <View style={styles.flexBox}>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                {
                  data?.dictionaryResource.id == item.id && (
                    <MaterialIcons
                      style={{ marginRight: 5 }}
                      name={'verified'}
                      size={15}
                      color={'#fff318'}
                    />
                  )
                }
                <Text numberOfLines={1} style={styles.name}>
                  {item.name}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={styles.description}
              >
                {item.description}
              </Text>
              <Text numberOfLines={1} style={styles.length}>{item.length}词</Text>
            </View>
            <View style={{ marginLeft: 25 }}>
              <ProgressCircle
                progress={getProgress(item.id, item.length)}
                width={42}
                height={42}
                radius={19}
                strokeWidth={3}
                centerX={21}
                centerY={21}
                fontSize={7}
                titleShow={false}
                color={'#ffffff'}
                progressStartColor={'#08C576'}
                progressEndColor={'#08C576'}
                backgroundColor={'#FFFFFF4C'}
                animate={false}
              />
            </View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <Animated.FlatList
      ref={flatListRef}
      style={{ flex: 1, marginTop: 10 }}
      data={dictionaryData}
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

export default DictionaryClassification
