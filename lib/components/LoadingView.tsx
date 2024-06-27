import { ReactNode, useState } from 'react'
import { InteractionManager, View } from 'react-native'
import Loading from './Loading.tsx'

type Props = {
  children: ReactNode
}

const LoadingView = ({ children }: Props) => {
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
            <Loading />
          </View>
        ) : (
          <>{children}</>
        )
      }
    </>
  )
}

export default LoadingView
