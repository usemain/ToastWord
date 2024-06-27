import { StyleSheet, View, Animated, Easing } from 'react-native'
import { useEffect, useRef } from 'react'
import { COMMON_COLOR } from '../configs/colors.ts'
import { useThemeColor } from '../hooks/useThemeColor.ts'

type Props = {
  w?: number
  borderColor?: string
}

const CustomLoading = ({ w = 20, borderColor = COMMON_COLOR }: Props) => {
  const animated = useRef(new Animated.Value(0)).current

  const deg = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  useEffect(() => {
    animated.resetAnimation()
    Animated.loop(
      Animated.timing(animated, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear
      })
    ).start()
  }, [animated])

  return (
    <Animated.View
      style={[
        styles.container,
        { width: w, height: w },
        {
          marginTop: -w / 2, marginLeft: -w / 2
        },
        { transform: [{ rotate: deg }] }
      ]}
    >
      <View style={[styles.circle, {
        borderTopColor: borderColor,
        borderRightColor: borderColor,
        borderBottomColor: borderColor,
        borderLeftColor: useThemeColor('background'),
        borderRadius: w / 2
      }]} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%'
  },
  circle: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderLeftColor: '#ffffff00'
  }
})

export default CustomLoading
