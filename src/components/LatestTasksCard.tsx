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
            color = { icon: '#ADAC10', bg: '#F7F5EC' }
            break;
        case 'FINISHED':
            icon = faCheck
            text = 'ZAVRŠEN'
            color = { icon: '#01A05D', bg: '#EDF8F0' }
            break
        case 'WAITING_FOR_WORKER':
            icon = faClock
            text = 'ČEKA RADNIKA'
            color = { icon: '#D42B20', bg: '#FBEFED' }
            break

    }


    return <div className="latest-tasks-card" >
        <div className="ltc-title" >
            <div>
                <h2>Čišćenje predsoblja</h2>
                <p>Čišćenje</p>
            </div>
            <p className="ltc-date">20.Maj 19:30</p>

        </div>
        <div className="ltc-bottom" >
            <div className="ltc-status" style={{ backgroundColor: color.bg }} >
                <FontAwesomeIcon icon={icon} color={color.icon} />
                <p>{text}</p>
            </div>
            <p className="ltc-price" >
                1500.00
            </p>
        </div>
    </div>
}