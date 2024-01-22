import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation, useNavigate } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export const MobileTopBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return <div className="mobile-top-bar" >
        {location.pathname !== '/overview' && location.pathname !== '/worker-overview' ? <div className="mtb-arrow" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft as IconProp} />
        </div> : <h1>Calaus</h1>}
    </div>
}