import { StyleSheet } from 'react-native'

export const BORDER_SIZE = 10

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10
  },
  absoluteFillBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  box: {
    height: 100,
    backgroundColor: '#000',
    marginHorizontal: BORDER_SIZE,
    borderRadius: 15,
  }
})

export default styles
