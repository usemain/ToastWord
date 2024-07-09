import { Dimensions, StyleSheet } from 'react-native'

export const BORDER_SIZE = 10

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: '100%'
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
    paddingHorizontal: 25,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexBox: {
    flex: 1,
    height: 80,
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  nameBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  description: {
    fontSize: 12,
    color: '#f3f3f3',
    fontWeight: '500'
  },
  length: {
    fontSize: 12,
    color: '#f3f3f3',
    fontWeight: '500'
  },
  rightIcon: {
    marginLeft: 15,
    paddingVertical: 10
  },
  openPlayText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'AlimamaShuHeiTi-Bold'
  },
  nullView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nullImg: {
    width: width / 1.5,
    height: width / 1.5
  }
})

export {
  width
}

export default styles
