import book from './book.ts'
import settings from './settings.ts'
import Dashboard from '../screens/dashboard'

export default [
  {
    name: 'Dashboard',
    component: Dashboard,
    options: {
      title: 'Dashboard',
      headerShown: false
    }
  },
  ...book,
  ...settings
]
