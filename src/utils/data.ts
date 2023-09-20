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
