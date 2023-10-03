import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation, useNavigate } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const MobileTopBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname)
    return <div className="mobile-top-bar" >
        {location.pathname !== '/overview' ? <div className="mtb-arrow" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </div> : <h1>Clavus</h1>}
    </div>
}