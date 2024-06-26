import { useEffect, useRef } from 'react'
import { DimensionValue, FlatList, Pressable, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { scale } from 'react-native-size-matters'
import LinearGradient from 'react-native-linear-gradient'
import { COMMON_COLOR, COMMON_COLOR_DEFAULT } from '../../configs/colors.ts'

type Props = {
  data: string[]
  active: number
  onChange: (e: number) => void
  height?: DimensionValue | undefined
  borderRadius?: number
  menuStartColor?: string
  menuEndColor?: string
  menuSelectStartColor?: string
  menuSelectEndColor?: string
  containerStyle?: ViewStyle // 添加了 containerStyle 属性，用于自定义容器样式
  itemStyle?: ViewStyle // 添加了 itemStyle 属性，用于自定义每个菜单项样式
  textStyle?: TextStyle
}

const Menu = (
  {
    data,
    active,
    onChange,
    height = 30, // 设置默认高度
    borderRadius = 15, // 设置默认边框半径
    menuStartColor = '#eaeaea', // 设置默认菜单起始颜色
    menuEndColor = '#eaeaea', // 设置默认菜单结束颜色
    menuSelectStartColor = COMMON_COLOR_DEFAULT, // 设置默认选中菜单起始颜色
    menuSelectEndColor = COMMON_COLOR, // 设置默认选中菜单结束颜色
    containerStyle = {}, // 默认为空对象
    itemStyle = {}, // 默认为空对象
    textStyle = {}
  }: Props) => {
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    scrollToIndex(active)
  }, [active])

  const scrollToIndex = (index: number) => {
    if (data.length > 0 && index >= 0 && index < data.length) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index,
        viewPosition: 0.5
      })
    }
  }

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Pressable disabled={active === index} onPress={() => onChange(index)}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          active === index ? menuSelectStartColor : menuStartColor,
          active === index ? menuSelectEndColor : menuEndColor
        ]}
        style={{
          marginHorizontal: 5,
          height: height,
          borderRadius: borderRadius,
          paddingHorizontal: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...itemStyle
        }}
      >
        <Text
          style={{
            fontSize: scale(10),
            color: active === index ? '#ffffff' : '#a5a5a5',
            fontFamily:'AlimamaShuHeiTi-Bold',
            ...textStyle
          }}
        >
          {item}
        </Text>
      </LinearGradient>
    </Pressable>
  )

  return (
    <View style={{ height: height }}>
      <FlatList
        ref={flatListRef}
        style={{
          ...containerStyle
        }}
        contentContainerStyle={{
          paddingHorizontal: 10
        }}
        overScrollMode={'never'}
        horizontal={true}
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  )
}

export default Menu
