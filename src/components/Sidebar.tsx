import { faGripLines, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { adminSidebarLinks, workerSidebarLinks } from 'assets/links/links'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SidebarOption = ({ icon, name, path }) => {
  /*eslint-disable*/
  const location = useLocation()
  const pathname = `/${location.pathname.split('/')[1]}`
  const navigate = useNavigate()
  const active = pathname.includes(path.split('/')[1])
  let cName = 'sidebar-option'
  if (active) {
    cName += ' option-active'
  }

  return <div className={cName} onClick={() => navigate(path)} >
    <FontAwesomeIcon icon={icon} />
    <p>{name}</p>
    <div className='sidebar-option-mask' ></div>
  </div>
}

export const Sidebar = () => {

  const user: any = JSON.parse(localStorage.getItem('user'))
  const routes = user?.role === 'ADMIN' ? adminSidebarLinks : workerSidebarLinks
  const [open, setOpen] = useState(false)
  let sidebarCName = 'sidebar'
  if (open) {
    sidebarCName += ' open-sidebar'
  }

  return <div className={sidebarCName} style={{ zIndex: '9999999' }} >
    <div className='side-bar-toggle' onClick={() => setOpen(prev => !prev)} > <FontAwesomeIcon icon={faGripLines} /> </div>
    {routes.map(l => <SidebarOption key={l.id} name={l.title} icon={l.icon} path={l.path} />)}
    {screen.width < 420 && <SidebarOption name={'Profil'} icon={faUser} path={'/profile/' + user.id} />}
  </div>
}