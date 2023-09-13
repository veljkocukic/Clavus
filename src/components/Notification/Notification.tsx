import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

interface INotification {
    text: string
    onClick?: any
}

export const Notification = ({ text, onClick, }: INotification) => {
    return <div onClick={onClick} className="notification bottom-shadow" >
        <div className="notification-icon" >
            <FontAwesomeIcon icon={faInfoCircle} />
        </div>
        <p>
            {text}
        </p>
    </div>
}