import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export const NotificationIcon = () => {
    return <div className="notification-menu" >
        <FontAwesomeIcon icon={faBell as IconProp} />
    </div>
}