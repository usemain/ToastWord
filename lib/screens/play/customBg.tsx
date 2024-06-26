import { useEffect, useState } from 'react'
import { View } from 'react-native'
import styles from '../../styles/play.ts'

type Props = {
  page: number
}

const colors = [
  '#db9efa',
  '#9dcdfa',
  '#a1e3a1',
  '#32e8ca',
  '#977bff',
  '#0ca1e1',
  '#fab91a',
  '#fd8233'
]

const CustomBg = ({ page }: Props) => {
  const [color, setColor] = useState('')
  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }, [page])

  return <View style={[styles.colorView, { backgroundColor: color }]} />
}

export default CustomBg
