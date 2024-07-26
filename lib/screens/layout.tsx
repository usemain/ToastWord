import { useEffect } from 'react'
import { Pressable } from 'react-native'
import { COMMON_COLOR_DEFAULT } from '../configs/colors.ts'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { scale } from 'react-native-size-matters'
import { useThemeColor } from '../hooks/useThemeColor.ts'
import LearningDictionaryModel, { LearningDictionaryData } from '../dao/models/learningDictionary.tsx'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import useDictionaryStore from '../store/dictionary.store.ts'
import useSysStore from '../store/sys.store.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import dictionaryJsonMap from '../resources/dictionaryJson.ts'
import useDictionary from '../hooks/useDictionary.ts'
import useDao from '../dao/useDao.ts'
import routes from '../routes'

const { Navigator, Screen } = createStackNavigator()

const customHeaderLeft = () => {
  const { goBack } = useNavigation()

  return (
    <Pressable
      style={{
        width: 30,
        height: 40,
        marginLeft: 15,
        display: 'flex',
        justifyContent: 'center'
      }}
      onPress={() => goBack()}
    >
      <MaterialIcons
        name="arrow-back-ios"
        size={scale(15)}
        color={useThemeColor('text')}
      />
    </Pressable>
  )
}

const Layout = () => {
  const { getQuery } = useDao()
  const { setData, setDictionaryData, setLearningDictionary } = useSysStore()
  const { setDictionaryTitle, setDictionaryItemLabel } = useDictionaryStore()
  const { getCategorizedDictionaryTitle, getCategorizedDictionaryItemLabel } = useDictionary()

  useEffect(() => {
    getData().then((res) => {
      if (res) {
        let data = JSON.parse(res)
        let learningDictionaryData = getQuery<LearningDictionaryData[]>(
          LearningDictionaryModel,
          {
            label: 'dictionaryId',
            query: data.dictionaryResource.id
          }
        )
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
    <Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        headerStyle: {
          backgroundColor: useThemeColor('background')
        },
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
      {
        routes.map((item, index) => (
          <Screen
            key={index}
            name={item.name}
            component={item.component}
            options={item?.options || {}}
            initialParams={item?.initialParams || {}}
          />
        ))
      }
    </Navigator>
  )
}

export default Layout
