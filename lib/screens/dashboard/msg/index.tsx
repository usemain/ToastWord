import { View } from 'react-native'
import styles from '../../../styles/dashboardStyles/msg.ts'
import { ThemedText } from '../../../components/ThemedText.tsx'

const Msg = () => {
  return (
    <View style={styles.container}>
      <ThemedText>Msg</ThemedText>
    </View>
  )
}

export default Msg
