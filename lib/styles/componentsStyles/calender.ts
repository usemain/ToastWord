import { StyleSheet } from 'react-native'
import { COMMON_COLOR, GLOBAL_COLOR } from '../../configs/colors.ts'

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: COMMON_COLOR
  },
  header_view: {
    flex: 1,
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  header_title: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 6,
    margin: 2
  },
  dayBox: {
    width: 25,
    height: 25,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  dayText: {
    fontSize: 11
  },
  dayStatus: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COMMON_COLOR
  },
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 7,
  },
  footer_btn: {
    width: 50,
    height: 30,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
