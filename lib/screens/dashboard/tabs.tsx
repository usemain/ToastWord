import { useState } from 'react'
import { Pressable, Text, View, Dimensions, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeColor } from '../../hooks/useThemeColor.ts'
import { COMMON_COLOR } from '../../configs/colors.ts'

type Props = {
  tabData: BottomTabBarProps
}

type TabItem = {
  icon: ImageSourcePropType
  activeIcon: ImageSourcePropType
  title: string
}

const { width } = Dimensions.get('window')
const CUSTOM_HEIGHT = 70

const tabMap: Record<string, TabItem> = {
  Home: {
    icon: require('../../assets/dashboard/home.png'),
    activeIcon: require('../../assets/dashboard/home_active.png'),
    title: '首页'
  },
  Card: {
    icon: require('../../assets/dashboard/card.png'),
    activeIcon: require('../../assets/dashboard/card_active.png'),
    title: '卡片'
  },
  Msg: {
    icon: require('../../assets/dashboard/msg.png'),
    activeIcon: require('../../assets/dashboard/msg_active.png'),
    title: '详情'
  },
  Menu: {
    icon: require('../../assets/dashboard/menu.png'),
    activeIcon: require('../../assets/dashboard/menu_active.png'),
    title: '菜单'
  }
}

const Tabs = ({ tabData }: Props) => {
  const insets = useSafeAreaInsets()
  const [selectTab, setSelectTab] = useState(0)

  const selectColor = (key: number) => {
    return selectTab === key ? COMMON_COLOR : '#b5b5b5'
  }

  const selectIcon = (key: number) => {
    return selectTab === key ? tabMap[tabData.state.routes[key].name].activeIcon : tabMap[tabData.state.routes[key].name].icon
  }

  const onTabChange = (index: number, screenName: string) => {
    if (index === selectTab) return
    setSelectTab(index)
    tabData.navigation.navigate(screenName)
  }

  return (
    <View
      style={[
        styles.container,
        {
          height: CUSTOM_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: useThemeColor('card')
        }
      ]}
    >
      {
        tabData.state.routes.map((item, index) => (
          <Pressable
            key={index}
            style={styles.tab}
            onPress={() => onTabChange(index, item.name)}
          >
            <Image style={styles.icon} source={selectIcon(index)} />
            <Text style={[styles.title, { color: selectColor(index) }]}>
              {tabMap[item.name].title}
            </Text>
          </Pressable>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: CUSTOM_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  tab: {
    width: width / Object.keys(tabMap).length,
    height: CUSTOM_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  specialTabInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  icon: {
    width: 20,
    height: 20
  },
  title: {
    fontSize: 9,
    marginTop: 2
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1
  }
})

export default Tabs
