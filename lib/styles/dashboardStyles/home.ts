import { StyleSheet } from 'react-native'
import { COMMON_COLOR_DEFAULT } from '../../configs/colors.ts'

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 350,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  actionBar: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
    position: 'absolute',
    zIndex: 99
  },
  title: {
    color: COMMON_COLOR_DEFAULT,
    marginLeft: 2,
    fontSize: 12,
    fontFamily: 'AlimamaShuHeiTi-Bold'
  }
})

export default styles
