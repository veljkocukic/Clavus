import React, { useEffect } from 'react'
import '../sass/main.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { TopBar } from '../components/TopBar/TopBar'
import { Website } from './Website/Website'

export const SharedLayout = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const user: any = JSON.parse(localStorage.getItem('user'))
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
        <div className='dashboard-container'>
          <Outlet />
        </div>
      </div>
  )
}
