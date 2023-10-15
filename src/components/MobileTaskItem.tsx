import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

/*eslint-disable*/
interface IMobileTaskItem {
    icon: any
    date: string
    title: string
    status?: any
    offers?: number
    id: number
    location?: string
    price?: number
}
export const MobileTaskItem = ({ icon, date, title, status, offers, id, location, price }: IMobileTaskItem) => {
    const navigate = useNavigate()
    return <div className="mobile-task-item" onClick={() => navigate('/tasks/' + id)} >
        <div className="text-container" >
            <h2>{title}</h2>
            {status ?? ''}
            <p>{date}</p>
            <p>{offers > -1 ? "Ponude: " + offers : location}</p>
            {price && <h3>{price}</h3>}
        </div>
        <div className="icon-container" >
            <FontAwesomeIcon icon={icon} />
        </div>
    </div>
}