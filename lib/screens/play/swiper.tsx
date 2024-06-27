import { Pressable, Text, View } from 'react-native'
import { Word } from '../../types/resources.ts'
import styles from '../../styles/play.ts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {
  item: Word
  index: number,
  playingIndex: number
  onWordPlay: (index: number, word: Word) => Promise<void>
}

const Swiper = ({ item, index, playingIndex, onWordPlay }: Props) => {
  const CustomText = ({ title }: { title: string }) => (
    <Pressable onPress={() => onWordPlay(index, item)}>
      <View style={styles.customText}>
        {
          title && (
            <Text style={styles.description}>
              {title}
            </Text>
          )
        }
        <MaterialIcons
          size={20}
          name={'volume-up'}
          color={playingIndex === index ? '#606060' : '#a5a5a5'}
        />
      </View>
    </Pressable>
  )

  return (
    <View style={styles.itemStyle}>
      <View
        style={[
          styles.word
        ]}
      >
        <Text style={styles.wordText}>
          {item.name}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subTitle}>
          {item.trans.join(';')}
        </Text>
        <CustomText title={item.notation || item.usphone || item.ukphone} />
      </View>
    </View>
  )
}

export default Swiper
