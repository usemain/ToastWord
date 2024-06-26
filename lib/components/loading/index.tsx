import { ReactNode, useState } from 'react'
import { ActivityIndicator, InteractionManager, View } from 'react-native'
import { COMMON_COLOR } from '../../configs/colors.ts'

type Props = {
  children: ReactNode
}

const Loading = ({ children }: Props) => {
  const [show, setShow] = useState(true)
  InteractionManager.runAfterInteractions(() => setShow(false))

  return (
    <>
      {
        show ? (
          <View style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ActivityIndicator size="small" color={COMMON_COLOR} />
          </View>
        ) : (
          <>{children}</>
        )
      }
    </>
  )
}

export default Loading
