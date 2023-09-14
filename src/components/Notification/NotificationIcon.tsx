import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

export const NotificationIcon = () => {
    return <div className="notification-menu" >
        <FontAwesomeIcon icon={faBell} />
    </div>
}