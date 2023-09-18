import { faFile, faHome, faMessage, faTasks } from '@fortawesome/free-solid-svg-icons'

export const adminSidebarLinks = [
  {
    id: 1,
    title: 'Pregled',
    path: '/overview',
    icon: faHome,
  },
  {
    id: 2,
    title: 'Zadaci',
    path: '/tasks',
    icon: faTasks,
  },
  { id: 3,
    title: 'Poruke',
    path: '/messages',
    icon: faMessage
  },
  {
    id: 4,
    title: 'Izveštaji',
    path: '/reports',
    icon: faFile,
  },

]

export const workerSidebarLinks = [
  {
    id: 1,
    title: 'Pregled',
    path: '/worker-overview',
    icon: faHome,
  },
  { id: 2,
    title: 'Poruke',
    path: '/messages',
    icon: faMessage
  },
]
