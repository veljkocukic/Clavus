import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProfileButton = () => {

    const [openOptions, setOpenOptions] = useState(false)
    const navigate = useNavigate()
    let cName = 'profile-options'
    if (openOptions) {
        cName += ' active-options'
    }

    const user: any = JSON.parse(localStorage.getItem('user'))

    const handleLogOut = () => {
        localStorage.clear()
        navigate('/login')
    }

    return <div className="profile-button-container" onClick={() => setOpenOptions(!openOptions)} tabIndex={1} onBlur={() => setOpenOptions(false)}>
        <img alt='profile-pic' src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' />
        <p>{(user?.name ?? '') + ' ' + (user?.lastName ?? '')}</p>
        <FontAwesomeIcon icon={faChevronDown} color='#8fadf0' />
        <div className={cName} onClick={e => e.stopPropagation()} >
            <div>
                <FontAwesomeIcon icon={faUser} color='#8fadf0' />
                <p>Profil</p>
            </div>
            <div onClick={() => handleLogOut()}>
                <FontAwesomeIcon icon={faSignOut} color='#8fadf0' />
                <p>Izloguj se</p>
            </div>
        </div>
    </div>
}