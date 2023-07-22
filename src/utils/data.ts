import { Home } from 'views'
import { ViewJobOffer } from 'views/JobOffer/ViewJobOffer'
import { CreateTask } from 'views/Tasks/CreateTask'
import { Tasks } from 'views/Tasks/Tasks'
import { ViewTask } from 'views/Tasks/ViewTask'

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
    path: '/jobOffer/:id',
    element: ViewJobOffer,
  },
  {
    path: '/overview',
    element: Home,
  },
]
