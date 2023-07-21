import { Home } from 'views'
import { CreateTask } from 'views/Tasks/CreateTask'
import { ViewTask } from 'views/Tasks/ViewTask'

export const adminRoutes = [
  {
    path: 'tasks/create',
    element: CreateTask,
  },
  {
    path: 'tasks/:id',
    element: ViewTask,
  },
  {
    path: '/',
    element: Home,
  },
]
