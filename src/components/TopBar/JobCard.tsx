import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MobileTaskItem } from 'components/MobileTaskItem'
import { useNavigate } from 'react-router-dom'
import { convertTaskDate, convertToHoursMins, getCategoryIcon } from 'utils/helpers'

interface IJobCard {
    name: string
    location: {
        label: string
        value: string
    }
    price?: number
    date: string
    id: number
    className?: string
    category: string
}
export const JobCard = ({ name, location, price, date, id, className, category }: IJobCard) => {
    const navigate = useNavigate()
    const icon = getCategoryIcon(category)
    return screen.width < 421 ? <MobileTaskItem
        id={id}
        title={name}
        date={convertTaskDate(date)}
        location={location.label}
        price={price}
        icon={getCategoryIcon(category)} /> :
        <div className={'worker-job-card ' + className} onClick={() => navigate('/tasks/' + id)} >
            <div className='flex align-center just-center h100 ' >
                <FontAwesomeIcon icon={icon as IconProp} />
            </div>
            <div className='flex between h100 column w100 ml1' >
                <div>
                    <h2>{name}</h2>
                    <p>{location.label}</p>
                </div>
                <div className='flex w100 between center w100' >
                    <p className='date' >{convertTaskDate(date) + ' ' + convertToHoursMins(date)}</p>
                    {price && <p className='green-text' >
                        {price}
                    </p>}
                </div>
            </div>
        </div>
}