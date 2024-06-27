import { View } from 'react-native'
import Menu from '../../components/Menu.tsx'
import DictionaryClassification from './dictionaryClassification.tsx'
import LoadingView from '../../components/LoadingView.tsx'
import useCategorizedMenu from '../../services/useCategorizedMenu.ts'
import useSysStore from '../../store/sys.store.ts'

const CategorizedMenu = () => {
  const {
    active,
    categorizedLabelData,
    categorizedDictionaryData,
    onMenuChange,
    onDictionaryChange
  } = useCategorizedMenu()
  const { theme } = useSysStore()

  return (
    <View style={{ flex: 1 }}>
      <Menu
        active={active}
        data={categorizedLabelData}
        onChange={onMenuChange}
        menuStartColor={theme === 'dark' ? '#202020' : '#eaeaea'}
        menuEndColor={theme === 'dark' ? '#202020' : '#eaeaea'}
      />
      <LoadingView>
        <DictionaryClassification
          active={active}
          dictionaryData={categorizedDictionaryData}
          onChange={onDictionaryChange}
        />
      </LoadingView>
    </View>
  )
}

export default CategorizedMenu
