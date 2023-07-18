import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { adminSidebarLinks } from 'assets/links/links'

const SidebarOption = ({ icon, name }) => {

  const [active, setActive] = useState(false)
  let cName = 'sidebar-option'
  if (active) {
    cName += ' option-active'
  }
  return <div className={cName} onClick={() => setActive(!active)} >
    <FontAwesomeIcon icon={icon} />
    <p>{name}</p>
    <div className='sidebar-option-mask' ></div>
  </div>
}

export const Sidebar = () => {





  return <div className="sidebar" >
    {adminSidebarLinks.map(l => <SidebarOption key={l.id} name={l.title} icon={l.icon} />)}
  </div>
}