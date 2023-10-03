import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/*eslint-disable*/
export const MobileTaskItem = ({ icon, date, title, status, offers, id }) => {
    return <div className="mobile-task-item" >
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