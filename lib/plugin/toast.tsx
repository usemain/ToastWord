import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ToastDataType, ToastIconTextType, ToastIconType } from '../types/toast.ts'
import styles from '../styles/pluginsStyles/toast.ts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const ToastIconMap: Record<ToastIconTextType, ToastIconType> = {
  success: {
    icon: 'check-circle',
    color: '#3bd95c'
  },
  error: {
    icon: 'error',
    color: '#FF5252'
  },
  info: {
    icon: 'info',
    color: '#ababab'
  }
}

type Props = {
  data: ToastDataType
  close: () => void
}

const Toast = ({ data, close }: Props) => {
  const insets = useSafeAreaInsets()

  useEffect(() => {
    setTimeout(() => close(), 2000)
  }, [])

  return (
    <View style={[styles.container, { marginTop: insets.top + 40 }]}>
      <View style={styles.toast}>
        <MaterialIcons
          size={18}
          name={ToastIconMap[data.type || 'success'].icon}
          color={ToastIconMap[data.type || 'success'].color}
        />
        <Text style={styles.content}>{data?.content}</Text>
      </View>
    </View>
  )
}

export default Toast
