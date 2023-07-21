import React, { useEffect } from 'react'
import '../sass/main.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { TopBar } from '../components/TopBar/TopBar'

export const SharedLayout = () => {

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname == '/') navigate('overview')
  }, [])

  return (
    <div className='layout-wrapper'>
      <TopBar />
      <Sidebar />
      <div className='dashboard-container'>
        <Outlet />
      </div>
    </div>
  )
}
