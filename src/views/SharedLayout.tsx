import React from 'react'
import '../sass/main.scss'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { TopBar } from '../components/TopBar/TopBar'

export const SharedLayout = () => {
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
