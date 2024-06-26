import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COMMON_COLOR_DEFAULT } from '../../configs/colors.ts'
import styles, { CUSTOM_HEIGHT } from '../../styles/tabbarStyles/tabs.ts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {
  tabData: BottomTabBarProps
}

type TabItem = {
  icon: string
  title: string
}

const tabMap: Record<string, TabItem> = {
  Home: {
    icon: 'grain',
    title: '首页',
  },
  Search: {
    icon: 'search',
    title: '搜索',
  },
  Chart: {
    icon: 'insights',
    title: '统计',
  },
  My: {
    icon: 'person',
    title: '我的',
  }
}

const Tabs = ({ tabData }: Props) => {
  const insets = useSafeAreaInsets()
  const [selectTab, setSelectTab] = useState(0)
  const tabBottomStyles = {
    height: CUSTOM_HEIGHT + insets.bottom,
    paddingBottom: insets.bottom
  }

  const selectColor = (key: number) => {
    return selectTab === key ? COMMON_COLOR_DEFAULT : '#b8b8b8'
  }

  const onTabChange = (index: number, screenName: string) => {
    if (index === selectTab) return
    setSelectTab(index)
    tabData.navigation.navigate(screenName)
  }

  return (
    <View style={[styles.container, tabBottomStyles]}>
      {tabData.state.routes.map((item, index) => (
        <Pressable
          key={index}
          style={styles.tab}
          onPress={() => onTabChange(index, item.name)}
        >
          <MaterialIcons
            size={26}
            name={tabMap[item.name].icon}
            color={selectColor(index)}
          />
          <Text style={[styles.title, { color: selectColor(index) }]}>
            {tabMap[item.name].title}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

export default Tabs
