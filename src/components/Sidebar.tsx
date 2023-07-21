import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { adminSidebarLinks } from 'assets/links/links'
import { useLocation, useNavigate } from 'react-router-dom'

const SidebarOption = ({ icon, name, path }) => {
  /*eslint-disable*/

  const location = useLocation()
  const pathname = `/${location.pathname.split('/')[1]}`
  const navigate = useNavigate()
  const active = pathname.includes(path)
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

  return <div className="sidebar" >
    {adminSidebarLinks.map(l => <SidebarOption key={l.id} name={l.title} icon={l.icon} path={l.path} />)}
  </div>
}