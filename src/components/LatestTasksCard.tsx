import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faClock, faHammer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const LatestTasksCard = () => {
    /*eslint-disable*/
    let status = 'IN_PROGRESS'
    let icon = faClock
    let text = 'U TOKU'
    let color = { icon: '#ADAC10', bg: '#F7F5EC' }

    switch (status) {
        case 'IN_PROGRESS':
            icon = faHammer
            text = 'U TOKU'
            color = { icon: '#8FADF0', bg: '#F1F5FE' }
            break;
        case 'DONE':
            icon = faCheck
            text = 'ZAVRŠEN'
            color = { icon: '#01A05D', bg: '#EDF8F0' }
            break
        case 'ACTIVE':
            icon = faClock
            text = 'ČEKA RADNIKA'
            color = { icon: '#ADAC10', bg: '#F7F5EC' }
            break
    }


    return <div className="info-card" >
        <div className="ic-title" >
            <div>
                <h2>Čišćenje predsoblja</h2>
                <p>Čišćenje</p>
            </div>
            <p className="ic-date">20.Maj 19:30</p>

        </div>
        <div className="ic-bottom" >
            <div className="ic-status" style={{ backgroundColor: color.bg }} >
                <FontAwesomeIcon icon={icon as IconProp} color={color.icon} />
                <p>{text}</p>
            </div>
            <p className="green-text" >
                1500.00
            </p>
        </div>
    </div>
}