import { Home } from 'views'
import { ViewJobOffer } from 'views/JobOffer/ViewJobOffer'
import { ViewProfile } from 'views/Profile/ViewProfile'
import { CreateTask } from 'views/Tasks/CreateTask'
import { Tasks } from 'views/Tasks/Tasks'
import { ViewTask } from 'views/Tasks/ViewTask'
import { WorkerHome } from 'views/WorkerHome'
import { Messages } from 'views/Messages/Messages'

export const adminRoutes = [
  {
    path: '/tasks/create',
    element: CreateTask,
  },
  {
    path: '/tasks',
    element: Tasks,
  },
  {
    path: '/tasks/:id',
    element: ViewTask,
  },
  {
    path: '/job-offer/:id',
    element: ViewJobOffer,
  },
  {
    path: '/overview',
    element: Home,
  },
  {
    path: '/profile/:id',
    element: ViewProfile,
  }, 
  {
    path: '/messages',
    element: Messages,
  },
  {
    path: '/messages/:conversationId',
    element: Messages,
  },
]

export const workerRoutes = [
  {
    path: '/worker-overview',
    element: WorkerHome,
  },
  {
    path: '/worker-task/:id',
    element: ViewTask,
  },
  {
    path: '/worker-profile/:id',
    element: ViewProfile,
  },
  {
    path: '/messages/:conversationId',
    element: Messages,
  },
  {
    path: '/messages',
    element: Messages,
  },
]


export const cities = [
  {label:'Beograd',value:'BEOGRAD'},
  {label:'Novi Sad',value:'NOVI_SAD'},
  {label:'Niš',value:'NIS'},
  {label:'Kragujevac',value:'KRAGUJEVAC'},
  {label:'Kraljevo',value:'KRALJEVO'},
  {label:'Kruševac',value:'KRUSEVAC'},
  {label:'Čačak',value:'CACAK'},
  {label:'Vranje',value:'VRANJE'},
  {label:'Leskovac',value:'LESKOVAC'},
  {label:'Subotica',value:'SUBOTICA'},
  {label:'Zrenjanin',value:'ZRENJANIN'},
  {label:'Zaječar',value:'ZAJECAR'},
  {label:'Negotin',value:'ZRENJANIN'},
  {label:'Zrenjanin',value:'NEGOTIN'},
  {label:'Novi Pazar',value:'NOVI_PAZAR'},
  {label:'Sjenica',value:'SJENICA'},
  {label:'Smederevo',value:'SMEDEREVO'},
  {label:'Jagodina',value:'JAGODINA'},
  {label:'Vrnjačka Banja',value:'VRNJACKA_BANJA'},
  {label:'Soko Banja',value:'Soko Banja'},
  {label:'Požarevac',value:'POZAREVAC'},
  {label:'Valjevo',value:'VALJEVO'},
]