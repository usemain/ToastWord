import { useState } from 'react'
import { View, Animated, Text, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles, { width } from '../../styles/play.ts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Header from './header.tsx'
import CustomBg from './customBg.tsx'
import Swiper from './swiper.tsx'
import usePlay from '../../services/usePlay.ts'

const Play = () => {
  const insets = useSafeAreaInsets()
  const { params, flatListRef, playingIndex, onWordPlay, goToNextPage } = usePlay()
  const [page, setPage] = useState(params.currentIndex)
  const [disabled, setDisabled] = useState(false)

  const onScroll = (event: any) => {
    setPage(Math.round(event.nativeEvent.contentOffset.x / width))
  }

  const onLayout = () => {
    setTimeout(() => {
      if (flatListRef.current) {
        if (params.currentIndex !== params.data.length && params.currentIndex >= 0) {
          flatListRef.current.scrollToIndex({ animated: false, index: params.currentIndex })
        }
      }
    }, 20)
  }

  const onChange = (newPage: number) => {
    setDisabled(true)
    goToNextPage(page, newPage)
    setTimeout(() => {
      setDisabled(false)
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <Header page={page} />
      <CustomBg page={page} />
      <Animated.FlatList
        ref={flatListRef}
        initialNumToRender={20}
        keyExtractor={(_, index) => index.toString()}
        data={params.data}
        renderItem={({ item, index }) => (
          <Swiper
            item={item}
            index={index}
            playingIndex={playingIndex}
            onWordPlay={onWordPlay}
          />
        )}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        overScrollMode={'never'}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onLayout={onLayout}
      />
      {
        params.type !== 'favorite' && (
          <View style={[styles.viewBtn, { bottom: insets.bottom + 30 }]}>
            <View>
              {
                page > 0 && (
                  <Pressable disabled={disabled} style={styles.btn} onPress={() => onChange(page - 1)}>
                    <MaterialIcons name="arrow-back-ios" size={15} color={'#454545'} />
                    <Text style={styles.btnText}>Previous</Text>
                  </Pressable>
                )
              }
            </View>
            <View>
              <Pressable disabled={disabled} style={styles.btn} onPress={() => onChange(page + 1)}>
                <Text style={styles.btnText}>{page + 1 === params.data.length ? 'Finish' : 'Next'}</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#454545'} />
              </Pressable>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default Play
