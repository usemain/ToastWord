import { useEffect } from 'react'
import { Pressable } from 'react-native'
import { COMMON_COLOR_DEFAULT } from '../configs/colors.ts'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { scale } from 'react-native-size-matters'
import LearningDictionaryModel, { LearningDictionaryData } from '../dao/models/learningDictionary.tsx'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import useDictionaryStore from '../store/dictionary.store.ts'
import useSysStore from '../store/sys.store.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import dictionaryJsonMap from '../resources/dictionaryJson.ts'
import TabBar from '../screens/tabbar/index.tsx'
import CategorizedMenu from '../screens/categorizedMenu'
import useDictionary from '../hooks/useDictionary.ts'
import Catalogue from '../screens/catalogue'
import Play from '../screens/play'
import useDao from '../dao/useDao.ts'
import Favorite from '../screens/favorite'

const { Navigator, Screen } = createStackNavigator()

const customHeaderLeft = () => {
  const navigation = useNavigation()

  return (
    <Pressable
      style={{
        width: 30,
        height: 40,
        marginLeft: 15,
        display: 'flex',
        justifyContent: 'center'
      }}
      onPress={() => navigation.goBack()}
    >
      <MaterialIcons name="arrow-back-ios" size={scale(15)} color={'#323232'} />
    </Pressable>
  )
}

const Layout = () => {
  const { getQuery } = useDao()
  const { setData, setDictionaryData, setLearningDictionary } = useSysStore()
  const { setDictionaryTitle, setDictionaryItemLabel } = useDictionaryStore()
  const { getCategorizedDictionaryTitle, getCategorizedDictionaryItemLabel } = useDictionary()

  useEffect(() => {
    getData().then(res => {
      if (res) {
        let data = JSON.parse(res)
        let learningDictionaryData = getQuery<LearningDictionaryData[]>(LearningDictionaryModel, {
          label: 'dictionaryId', query: data.dictionaryResource.id
        })
        if (learningDictionaryData.length !== 0) {
          setLearningDictionary(learningDictionaryData[0])
        }
        setData(data)
        setDictionaryData(dictionaryJsonMap[data?.dictionaryResource.url]())
      }
    })

    setDictionaryTitle(getCategorizedDictionaryTitle)
    setDictionaryItemLabel(getCategorizedDictionaryItemLabel)
  }, [])

  const getData = async () => {
    return await AsyncStorage.getItem('$DATA')
  }

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: '#2c3b4e',
          text: '#484848',
          card: '#ffffff',
          border: '#00000000',
          background: '#ffffff',
          notification: '#ffffff'
        }
      }}
    >
      <Navigator
        screenOptions={{
          headerTitleStyle: {
            fontSize: scale(13),
            fontWeight: '500',
            color: COMMON_COLOR_DEFAULT,
            fontFamily: 'AlimamaShuHeiTi-Bold'
          },
          headerTitleAlign: 'center',
          headerLeft: customHeaderLeft,
          ...TransitionPresets.SlideFromRightIOS
        }}
      >
        <Screen
          name="Tabbar"
          component={TabBar}
          options={{
            title: 'TabBar',
            headerShown: false
          }}
        />
        <Screen
          name="CategorizedMenu"
          component={CategorizedMenu}
          options={{
            title: '分类菜单'
          }}
        />
        <Screen
          name="Catalogue"
          component={Catalogue}
          options={{
            title: '目录'
          }}
        />
        <Screen
          name="Favorite"
          component={Favorite}
          options={{
            title: '收藏'
          }}
        />
        <Screen
          name="Play"
          component={Play}
          options={{
            title: '开始',
            gestureEnabled: false,
            headerShown: false
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}

export default Layout
