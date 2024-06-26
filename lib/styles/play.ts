import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: '100%',
    height: 30,
    position: 'absolute',
    paddingHorizontal: 15,
    zIndex: 99,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25
  },
  word: {
    width: width * 0.75,
    height: width * 0.75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wordText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.5,
    paddingRight: 15
  },
  subTitle: {
    width: width * 0.75,
    color: '#444',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5
  },
  customText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  description: {
    color: '#a5a5a5',
    fontWeight: '600',
    textAlign: 'left',
    marginRight: 5,
    fontSize: 13,
    lineHeight: 16 * 1.5,
    marginVertical: 2.5
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3
  },
  viewBtn: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    position: 'absolute'
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#454545',
    fontFamily: 'AlimamaShuHeiTi-Bold',
    fontSize: 15
  }
})

export default styles

export {
  width
}
