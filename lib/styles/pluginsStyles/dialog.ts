import { Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  container: {
    width: width / 1.5,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20
  },
  message: {
    color: '#484848',
    fontSize: 13,
    paddingHorizontal: 25,
    textAlign: 'center'
  },
  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#f5f5f5',
    borderTopWidth: 0.3,
    marginTop: 20
  },
  button: {
    width: '50%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ok: {
    width: '100%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 13
  }
})

export default styles
