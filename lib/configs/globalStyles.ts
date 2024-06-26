import { StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  t_1: {
    fontSize: 20,
    color: '#000000'
  },
  t_2: {
    fontSize: 16,
    color: '#000000'
  },
  t_3: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'AlimamaShuHeiTi-Bold'
  },
  tb_1: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold'
  },
  tb_2: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1
  },
  tb_3: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold'
  },
  flexRowBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navHeaderRight: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginLeft: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)'
  }
})

export default globalStyles
