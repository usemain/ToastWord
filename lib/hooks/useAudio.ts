import { useState } from 'react'
import { Platform } from 'react-native'
import { Word } from '../types/resources.ts'
import { romajiToHiragana } from '../utils/kana.ts'
import { useToast } from '../context/toast.tsx'
import { pronunciationApi } from '../configs/consts.ts'
import useSysStore from '../store/sys.store.ts'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'

const audioPlayer = new AudioRecorderPlayer()

const useAudio = () => {
  const { data } = useSysStore()
  const toast = useToast()
  const [isPlaying, setIsPlaying] = useState(false)

  const generateWordSoundSrc = (item: Word) => {
    switch (data?.title) {
      case '日语':
        return `${pronunciationApi}${romajiToHiragana(item.name)}&le=jap`
      case '德语':
        return `${pronunciationApi}${item.name}&le=${data?.dictionaryResource.language}`
      default:
        return `${pronunciationApi}${item.name}`
    }
  }

  const onAudioPlay = async (item: Word, callback: () => void) => {
    try {
      if (isPlaying) {
        await audioPlayer.stopPlayer()
        audioPlayer.removePlayBackListener()
        setIsPlaying(false)
      }

      await audioPlayer.startPlayer(generateWordSoundSrc(item))
      setIsPlaying(true)

      audioPlayer.addPlayBackListener((e) => {
        if (Platform.OS === 'ios') {
          if (isNaN(e.currentPosition) === isNaN(e.duration)) {
            callback()
            audioPlayer.stopPlayer()
            audioPlayer.removePlayBackListener()
            setIsPlaying(false)
          }
        } else {
          if (e.currentPosition === e.duration) {
            callback()
            audioPlayer.stopPlayer()
            audioPlayer.removePlayBackListener()
            setIsPlaying(false)
          }
        }
      })
    } catch (error) {
      callback()
      setIsPlaying(false)
      toast.open({
        content: '播放失败',
        type: 'error'
      })
    }
  }

  return {
    onAudioPlay
  }
}

export default useAudio
