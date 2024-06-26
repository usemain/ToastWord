import {StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  container: {
    width: '100%',
    height: 300,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden'
  }
})

export default styles
