import { Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')
export const CUSTOM_HEIGHT = 60

const styles = StyleSheet.create({
  container: {
    width: width,
    height: CUSTOM_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  tab: {
    width: width / 4,
    height: CUSTOM_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  specialTabInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 9,
    marginTop: 2
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1
  }
})

export default styles
