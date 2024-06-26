import { FlatList, Pressable, Text, View } from 'react-native'
import { COMMON_COLOR } from '../../configs/colors.ts'
import { useState } from 'react'
import { CalendarItemType, DatesType } from '../../types/calendar.ts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../../styles/componentsStyles/calender.ts'
import dayjs from 'dayjs'

type Props = {
  dates?: DatesType[]
  paddingTop?: number
}

const Calendar = ({ dates = [], paddingTop = 0 }: Props) => {
  const week = ['日', '一', '二', '三', '四', '五', '六']

  // 获取当月的天数
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }
  // 获取当月第一天是星期几
  const getFirstDayOfWeek = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const data: CalendarItemType[] = []
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  const date = new Date().getDate()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfWeek = getFirstDayOfWeek(year, month)

  // 计算上个月是哪一年
  const prevMonthYear = month === 0 ? year - 1 : year
  // 计算上个月是几月份
  const prevMonth = month === 0 ? 11 : month - 1
  // 上个月的天数
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)

  // 计算上个月最后需要显示的日期
  for (
    let i = daysInPrevMonth - firstDayOfWeek + 1;
    i <= daysInPrevMonth;
    i++
  ) {
    data.push({ day: i, start: true })
  }

  // 当月的日期
  for (let i = 1; i <= daysInMonth; i++) {
    data.push({ day: i })
  }

  // 判断月份显示的行数
  let calendarRows: number
  if (
    (firstDayOfWeek === 4 && daysInMonth == 30) ||
    (firstDayOfWeek === 4 && daysInMonth == 31) ||
    (firstDayOfWeek === 5 && daysInMonth == 30)
  ) {
    calendarRows = 35
  } else if (
    (firstDayOfWeek === 5 && daysInMonth == 31) ||
    (firstDayOfWeek === 6 && daysInMonth == 30) ||
    (firstDayOfWeek === 6 && daysInMonth == 31)
  ) {
    calendarRows = 42
  } else {
    calendarRows = 35
  }

  // 计算下个月需要显示的日期
  const nextMonthDays = calendarRows - (firstDayOfWeek + daysInMonth)
  for (let i = 1; i <= nextMonthDays; i++) {
    data.push({ day: i, end: true })
  }

  const [active, setActive] = useState(false)
  const [selectDay, setSelectDay] = useState(date)
  const [currentWeekDates, setCurrentWeekDates] = useState<CalendarItemType[]>(
    []
  )

  const handleFooterPress = () => {
    const todayIndex = data.findIndex(
      (item) => item.day === selectDay && !item.start && !item.end
    )
    const startIndex = todayIndex - (todayIndex % 7)
    const endIndex = startIndex + 6
    const currentWeek = data.slice(startIndex, endIndex + 1)
    setCurrentWeekDates(currentWeek)
    setActive(!active)
  }

  // 日期Box的样式
  const getDayBoxStyle = (item: CalendarItemType) => {
    if (item.start || item.end) {
      return [styles.dayBox, { backgroundColor: 'transparent' }]
    } else if (selectDay === item.day && !item.start && !item.end) {
      return [styles.dayBox, { backgroundColor: 'rgba(255,255,255,0.8)' }]
    } else if (date === item.day && !item.start && !item.end) {
      return [styles.dayBox, { backgroundColor: 'rgba(255,255,255,0.3)' }]
    } else {
      return [styles.dayBox, { backgroundColor: 'transparent' }]
    }
  }

  // 日期的样式
  const getDayTextStyle = (item: CalendarItemType) => {
    if (item.start || item.end) {
      return [styles.dayText, { color: '#cccccc' }]
    } else if (selectDay === item.day && !item.start && !item.end) {
      return [styles.dayText, { color: COMMON_COLOR }]
    } else if (date === item.day && !item.start && !item.end) {
      return [styles.dayText, { color: '#ffffff' }]
    } else {
      return [styles.dayText, { color: '#ffffff' }]
    }
  }

  // 点击日期
  const onDateChange = (e: CalendarItemType) => {
    if (e.start) {
      console.log('start')
    } else if (e.end) {
      console.log('end')
    } else {
      setSelectDay(e.day)
      console.log(dayjs(`${year}-${month + 1}-${e.day}`).format('YYYY-MM-DD'))
    }
  }

  const renderDay = ({ item }: { item: CalendarItemType }) => (
    <Pressable
      disabled={selectDay === item.day && !item.start && !item.end}
      onPress={() => onDateChange(item)}
      style={styles.dayContainer}
    >
      <View style={getDayBoxStyle(item)}>
        <Text style={getDayTextStyle(item)}>{item.day}</Text>
      </View>
      {dates.find((datesItem) => datesItem.day === item.day) &&
        !item.start &&
        !item.end && (
          <View
            style={[
              styles.dayStatus,
              {
                backgroundColor: dates.find(
                  (datesItem) => datesItem.day === item.day
                )!.icon
              }
            ]}
          />
        )}
    </Pressable>
  )

  return (
    <FlatList
      style={{ backgroundColor: COMMON_COLOR }}
      numColumns={7}
      data={active ? currentWeekDates : data}
      renderItem={renderDay}
      bounces={false}
      overScrollMode={'never'}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={
        <View style={[styles.header, { paddingTop }]}>
          {week.map((item, index) => (
            <View style={styles.header_view} key={index}>
              <Text style={styles.header_title}>{item}</Text>
            </View>
          ))}
        </View>
      }
      ListFooterComponent={
        <View style={styles.footer}>
          <Pressable style={styles.footer_btn} onPress={handleFooterPress}>
            <Ionicons
              size={25}
              color={'rgba(255,255,255,0.5)'}
              name={active ? 'chevron-down-outline' : 'chevron-up-outline'}
            />
          </Pressable>
        </View>
      }
    />
  )
}

export default Calendar
