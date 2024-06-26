import { View } from 'react-native'
import Menu from '../../components/menu'
import DictionaryClassification from './dictionaryClassification.tsx'
import Loading from '../../components/loading'
import useCategorizedMenu from '../../services/useCategorizedMenu.ts'

const CategorizedMenu = () => {
  const {
    active,
    categorizedLabelData,
    categorizedDictionaryData,
    onMenuChange,
    onDictionaryChange
  } = useCategorizedMenu()

  return (
    <View style={{ flex: 1 }}>
      <Menu data={categorizedLabelData} active={active} onChange={onMenuChange} />
      <Loading>
        <DictionaryClassification
          active={active}
          dictionaryData={categorizedDictionaryData}
          onChange={onDictionaryChange}
        />
      </Loading>
    </View>
  )
}

export default CategorizedMenu
