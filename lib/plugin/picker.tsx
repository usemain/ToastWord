import { useEffect, useRef } from 'react'
import { Animated, Dimensions, FlatList, Pressable, Text, TouchableWithoutFeedback, BackHandler } from 'react-native'
import { COMMON_COLOR, COMMON_COLOR_DEFAULT } from '../configs/colors.ts'
import { PICKER_DATA, PICKER_TYPE } from '../types/picker.ts'
import LinearGradient from 'react-native-linear-gradient'
import globalStyles from '../configs/globalStyles.ts'
import styles from '../styles/pluginsStyles/pciker.ts'

const { height } = Dimensions.get('window')
const timer = 350

type Props = {
  visible: boolean
  data: PICKER_TYPE
  close: () => void
}

const Picker = ({ visible, data, close }: Props) => {
  const translateY = useRef(new Animated.Value(height)).current
  const opacity = useRef(new Animated.Value(0)).current
  const zIndex = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0)).current
  const flatListRef = useRef<FlatList>(null)

  const scrollToIndex = (index: number) => {
    if (data.data.length > 0 && index >= 0 && index < data.data.length) {
      flatListRef.current?.scrollToIndex({
        animated: false,
        index,
        viewPosition: 0
      })
    }
  }

  useEffect(() => {
    if (typeof data.value === 'number') {
      scrollToIndex(data.value as number)
    }
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: timer,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: timer,
          useNativeDriver: true
        }),
        Animated.timing(zIndex, {
          toValue: 1,
          duration: timer,
          useNativeDriver: true
        })
        ,
        Animated.timing(scale, {
          toValue: 1,
          duration: timer,
          useNativeDriver: true
        })
      ]).start()
    }
  }, [visible])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        onClose()
        return true
      }
      return false
    })

    return () => backHandler.remove()
  }, [visible])


  const animatedZIndex = zIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 998]
  })

  const onClick = (item: PICKER_DATA) => {
    onClose()
    setTimeout(() => {
      data.ok(item)
    }, timer)
  }

  const onClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height,
        duration: timer,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: timer,
        useNativeDriver: true
      }),
      Animated.timing(zIndex, {
        toValue: 0,
        duration: timer,
        useNativeDriver: true
      })
      ,
      Animated.timing(scale, {
        toValue: 0,
        duration: timer,
        useNativeDriver: true
      })
    ]).start(() => {
      close()
    })
  }

  const renderItem = ({ item }: { item: PICKER_DATA }) => (
    <Pressable onPress={() => onClick(item)}>
      <LinearGradient
        style={styles.box}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          item.value === data.value ? COMMON_COLOR_DEFAULT : 'rgba(255,255,255,0)',
          item.value === data.value ? COMMON_COLOR : 'rgba(255,255,255,0)'
        ]}
      >
        <Text
          style={[
            globalStyles.t_3,
            { fontWeight: 'bold', color: '#ffffff' }
          ]}
          numberOfLines={1}
        >
          {item.label}
        </Text>
      </LinearGradient>
    </Pressable>
  )

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Animated.View style={[styles.wrapper, { zIndex: animatedZIndex, opacity: opacity }]}>
        <Animated.View style={[styles.container, { transform: [{ translateY }, { scale }] }]}>
          <FlatList
            ref={flatListRef}
            bounces={true}
            overScrollMode={'never'}
            data={data.data}
            renderItem={renderItem}
            keyExtractor={item => item.label}
            showsVerticalScrollIndicator={false}
            getItemLayout={(_, index) => ({
              length: data.data.length,
              offset: 40 * index,
              index
            })}
          />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default Picker
