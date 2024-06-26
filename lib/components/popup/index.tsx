import { Animated, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useRef } from 'react'
import styles from '../../styles/componentsStyles/menu.ts'

const { height } = Dimensions.get('window')

type Props = {
  visible: boolean
  close: () => void
}

const Popup = ({ visible, close }: Props) => {
  const insets = useSafeAreaInsets()
  const value = height / 2.5 + insets.bottom + 10
  const translateY = useRef(new Animated.Value(value)).current
  const opacity = useRef(new Animated.Value(0)).current
  const zIndex = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true
        }),
        Animated.timing(zIndex, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true
        })
      ]).start()
    }
  }, [visible])

  const onClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height + insets.bottom,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(zIndex, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true
      })
    ]).start(() => {
      close()
    })
  }

  const animatedZIndex = zIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 999]
  })

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Animated.View style={[
        styles.wrapper,
        { paddingBottom: insets.bottom + 10 },
        { zIndex: animatedZIndex, opacity: opacity }
      ]}>
        <TouchableWithoutFeedback>
          <Animated.View style={[
            styles.container,
            { transform: [{ translateY }] }
          ]}>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default Popup
