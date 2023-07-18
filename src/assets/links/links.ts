import { userIcon } from './../icons/userIcons'
import { faFile, faHome, faMessage } from '@fortawesome/free-solid-svg-icons'

export const adminSidebarLinks = [
  {
    id: 1,
    title: 'Pregled',
    path: '/',
    icon: faHome,
  },
  {
    id: 2,
    title: 'Izveštaji',
    path: '/reports',
    icon: faFile,
  },
  {
    id: 3,
    title: 'Prepiske',
    path: '/messages',
    icon: faMessage,
  },
]

export const settingsRoutes = [
  {
    id: 1,
    title: 'User',
    path: '/settings',
    icon: userIcon,
  },
]
