import React, { useContext, useEffect, useState } from 'react'
import '../sass/main.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { TopBar } from '../components/TopBar/TopBar'
import { Website } from './Website/Website'
import { WebSocketContext } from 'context/WebSocketContext'
import { Notification } from 'components/Notification/Notification'

export const SharedLayout = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const user: any = JSON.parse(localStorage.getItem('user'))
  const localUser: any = JSON.parse(localStorage.getItem('user'))

  const socket = useContext(WebSocketContext)
  const [notification, setNotification] = useState({
    type: 'info',
    text: '',
    on: false,
    onClick: null,
  })

  useEffect(() => {
    socket.on('job', (data) => {
      if (localUser.categories.includes(data.category)) {
        const timer = setTimeout(() => {
          setNotification(prev => {
            const copy = { ...prev }
            copy.on = false
            return copy
          })
          return () => clearTimeout(timer);
        }, 5000);
        setNotification(prev => {
          const copy = { ...prev }
          copy.on = true
          copy.text = 'Postavljen je novi oglas u vašoj kategoriji.'
          return copy
        })
      }
    })
    return () => {
      socket.off('job')
    }
  }, [])


  useEffect(() => {
    if (location.pathname == '/') {
      if (user?.role === 'ADMIN') {
        navigate('overview')
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
        {notification.on && <Notification text={notification.text} onClick={notification.onClick} />}
        <div className='dashboard-container'>
          <Outlet />
        </div>
      </div>
  )
}
