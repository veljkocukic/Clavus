import { Home } from 'views'
import { ViewJobOffer } from 'views/JobOffer/ViewJobOffer'
import { CreateTask } from 'views/Tasks/CreateTask'
import { Tasks } from 'views/Tasks/Tasks'
import { ViewTask } from 'views/Tasks/ViewTask'
import { WorkerHome } from 'views/WorkerHome'

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
]
