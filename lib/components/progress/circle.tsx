import { useState, useEffect } from 'react'
import { Animated, Easing, Text, View } from 'react-native'
import { FontWeights } from '../../types/common.ts'
import Svg, { Circle, Defs, LinearGradient, Linecap, Stop } from 'react-native-svg'
import { COMMON_COLOR, COMMON_COLOR_DEFAULT } from '../../configs/colors.ts'

type Props = {
  width?: number
  height?: number
  title?: string
  fontSize?: number
  titleSize?: number
  titleShow?: boolean
  fontWeight?: FontWeights
  color?: string
  titleColor?: string
  textType?: string
  centerX?: number
  centerY?: number
  radius?: number
  strokeWidth?: number
  strokeLinecap?: Linecap
  progress: number
  progressStartColor?: string
  progressEndColor?: string
  backgroundColor?: string
  animate?: boolean
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const ProgressCircle = (
  {
    width = 160,
    height = 160,
    title = '已完成',
    fontSize = 22,
    titleSize = 11,
    titleShow = true,
    fontWeight = 'bold',
    color = '#000000',
    titleColor = COMMON_COLOR,
    textType = '%',
    centerX = 80,
    centerY = 80,
    radius = 70,
    strokeWidth = 20,
    strokeLinecap = 'round',
    progress = 0,
    progressStartColor = COMMON_COLOR_DEFAULT,
    progressEndColor = COMMON_COLOR,
    backgroundColor = '#f3f3f3',
    animate = true
  }: Props) => {
  const [animatedProgress] = useState(new Animated.Value(0))
  const progressPercentage = Math.min(Math.max(progress, 0), 100)
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (animate) {
      Animated.timing(animatedProgress, {
        toValue: progressPercentage,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true
      }).start()
    } else {
      animatedProgress.setValue(progressPercentage)
    }
  }, [progressPercentage, animate])

  return (
    <View
      style={{
        width,
        height,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <Svg height={160} width={160}>
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={progressStartColor} />
              <Stop offset="100%" stopColor={progressEndColor} />
            </LinearGradient>
          </Defs>
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={animatedProgress.interpolate({
              inputRange: [0, 100],
              outputRange: [circumference, 0]
            })}
            strokeLinecap={strokeLinecap}
            transform={`rotate(-90 ${centerX} ${centerY})`}
          />
        </Svg>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize, fontWeight, color }}>
          {progress}
          <Text style={{ fontSize }}>{textType}</Text>
        </Text>
        {titleShow && (
          <Text
            style={{
              fontSize: titleSize,
              color: titleColor,
              marginTop: 3,
              fontWeight: 'bold'
            }}
          >
            {title}
          </Text>
        )}
      </View>
    </View>
  )
}

export default ProgressCircle
