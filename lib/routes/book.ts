import { RoutesType } from '../types/routes.ts'
import CategorizedMenu from '../screens/categorizedMenu'
import Catalogue from '../screens/catalogue'
import Favorite from '../screens/favorite'
import Play from '../screens/play'

export default [
  {
    name: 'CategorizedMenu',
    component: CategorizedMenu,
    options: {
      title: '分类菜单'
    }
  },
  {
    name: 'Catalogue',
    component: Catalogue,
    options: {
      title: '目录'
    }
  },
  {
    name: 'Favorite',
    component: Favorite,
    options: {
      title: '收藏'
    }
  },
  {
    name: 'Play',
    component: Play,
    options: {
      title: '开始',
      gestureEnabled: false,
      headerShown: false
    }
  }
] as RoutesType[]
