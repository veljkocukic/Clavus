import React, { useContext, useEffect, useState } from 'react'
import '../sass/main.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { TopBar } from '../components/TopBar/TopBar'
import { Website } from './Website/Website'
import { WebSocketContext } from 'context/WebSocketContext'
import { Notification } from 'components/Notification/Notification'
import { handleNotification } from 'utils/notificationsHandler'
import { ITaskState } from './Tasks/tasksData'
import { MobileTopBar } from 'components/MobileTopBar'

export const SharedLayout = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const user: any = JSON.parse(localStorage.getItem('user'))
  const creatingTask: ITaskState = JSON.parse(localStorage.getItem('creatingTask'))

  const socket = useContext(WebSocketContext)
  const [notification, setNotification] = useState({
    type: 'info',
    text: '',
    on: false,
    onClick: null,
  })

  useEffect(() => {
    socket.on('job', data => {
      handleNotification(data, setNotification, user, navigate)
    })
    return () => {
      socket.off('job')
    }
  }, [])


  useEffect(() => {
    if (location.pathname == '/') {
      if (user?.role === 'ADMIN') {
        navigate(creatingTask ? 'tasks/create' : 'overview')
      } else {
        navigate('worker-overview')
      }
    }
  }, [])

  return (
    location.pathname.includes('sajt') ? <Website /> :
      <div className='layout-wrapper'>
        <TopBar />
        <Sidebar />
        <MobileTopBar />

        {notification.on && <Notification text={notification.text} onClick={notification.onClick} />}
        <div className='dashboard-container'>
          <Outlet />
        </div>
      </div>
  )
}
