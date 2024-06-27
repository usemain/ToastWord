import { View } from 'react-native'
import styles from '../../../styles/dashboardStyles/card.ts'
import { ThemedText } from '../../../components/ThemedText.tsx'

const Card = () => {
  return (
    <View style={styles.container}>
      <ThemedText>Card</ThemedText>
    </View>
  )
}

export default Card
