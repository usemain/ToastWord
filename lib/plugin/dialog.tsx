import { useEffect, useRef } from 'react'
import { Animated, BackHandler, Pressable, Text, View } from 'react-native'
import { DialogDataType } from '../types/dialog.ts'
import { COMMON_COLOR_DEFAULT } from '../configs/colors.ts'
import styles from '../styles/pluginsStyles/dialog.ts'

type Props = {
  visible: boolean
  data: DialogDataType | undefined
  close: () => void
}

const Dialog = ({ visible, data, close }: Props) => {
  const onChange = (type: boolean) => {
    type ? data?.ok?.() : data?.emit?.()
    onClose()
  }

  const onGotItChange = () => {
    data?.gotIt?.()
    onClose()
  }

  const opacity = useRef(new Animated.Value(0)).current
  const zIndex = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(zIndex, {
          toValue: 1,
          duration: 200,
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
    outputRange: [-1, 999]
  })

  const onClose = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(zIndex, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      close()
    })
  }

  return (
    <Animated.View style={[styles.wrapper, { zIndex: animatedZIndex, opacity: opacity }]}>
      <View style={styles.container}>
        <Text style={styles.message}>{data?.content}</Text>
        <View style={styles.buttons}>
          {data?.ok || data?.emit ? (
            <>
              <Pressable
                onPress={() => onChange(false)}
                style={styles.button}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: data?.emitColor || '#8f8f8f' }
                  ]}
                >
                  {data?.emitText || '取消'}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => onChange(true)}
                style={styles.button}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: data?.okColor || COMMON_COLOR_DEFAULT }
                  ]}
                >
                  {data?.okText || '确定'}
                </Text>
              </Pressable>
            </>
          ) : (
            <Pressable
              onPress={() => onGotItChange()}
              style={styles.ok}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: data?.okColor || COMMON_COLOR_DEFAULT }
                ]}
              >
                {data?.okText || '知道了'}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </Animated.View>
  )
}

export default Dialog
