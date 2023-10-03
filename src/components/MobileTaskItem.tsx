import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

/*eslint-disable*/
export const MobileTaskItem = ({ icon, date, title, status, offers, id }) => {
    const navigate = useNavigate()
    return <div className="mobile-task-item" onClick={() => navigate('/tasks/' + id)} >
        <div className="text-container" >
            <h2>{title}</h2>
            {status}
            <p>{date}</p>
            <p>Ponude: {offers}</p>
        </div>
        <div className="icon-container" >
            <FontAwesomeIcon icon={icon} />
        </div>
    </div>
}