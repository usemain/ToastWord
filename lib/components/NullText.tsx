import { Text, View } from 'react-native'
import useSysStore from '../store/sys.store.ts'

type Props = {
  title: string
}

const NullText = ({ title = '暂无收藏' }: Props) => {
  const { theme } = useSysStore()
  return (
    <View style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{
        color: theme === 'dark' ? '#505050' : '#bfbfbf',
        fontSize: 14,
        fontWeight: 'bold'
      }}>
        {title}
      </Text>
    </View>
  )
}

export default NullText
