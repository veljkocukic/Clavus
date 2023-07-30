import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUser } from 'feautures/user/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from 'store'
import { Categories } from 'views/Tasks/tasksData'
import { JobCard } from 'views/WorkerHome'

export const ViewProfile = () => {

    const { user } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getUser(Number(id)))
    }, [])

    let admin = true
    if (location.pathname.includes('worker')) {
        admin = false
    }

    const RatingCard = () => {
        return <div className='info-card h7' >
            <div className="ic-title" >
                <div>
                    <h2>Ivan Ivanovic</h2>
                </div>
                <p className="ic-date">20.Maj 19:30</p>
            </div>
            <div className="ic-bottom__rating mt0" >
                <p>Text text text text text text text</p>
                <h1>4</h1>
            </div>
        </div>
    }

    const getCategoryIcon = category => {
        const cat = Categories.find(c => c.label === category)
        return cat.icon
    }

    return <div className="page-content" >
        <div className="page-halves-layout gap5" >
            <div className="page-half-section" >
                <div className="profile-image-container" >
                    <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='profile-image' />
                    <h2>{user && (user.name + ' ' + user.lastName)}</h2>
                </div>
                <div className="flex column aling-center gap2 mt4" >
                    <div className="info-flex" >
                        <h4>Adresa:</h4>
                        <p>{user && (user.address ?? '/')}</p>
                    </div>
                    <div className="info-flex" >
                        <h4>Broj telefona:</h4>
                        <p>{user && user.phoneNumber}</p>
                    </div>
                    <div className="info-flex" >
                        <h4>E-mail:</h4>
                        <p>{user && user.email}</p>
                    </div>
                </div>
                <div className='flex just-between w100 gap1 mt1' >
                    <div className='card-wrapper' >
                        <div className='card-icon-count h100' >
                            <h3>{admin ? 'Postavljeni oglasi' : 'Obavljeni poslovi'}</h3>
                            <p>{user && (user[admin ? 'totalJobsPosted' : 'totalJobsDone'] || 0)}</p>
                        </div>
                    </div>
                    <div className='card-wrapper' >
                        <div className='card-icon-count h100' >
                            <h3>Ocene <br /> klijenata</h3>
                            <p>{user && (user.totalRatings || 0)}</p>
                        </div>
                    </div>
                </div>
                <div className='selected-categories-grid mt1' >
                    {user && user.categories.map((c, i) => <div key={i} className='selected-category-item' > <FontAwesomeIcon icon={getCategoryIcon(c)} /> {c}</div>)}
                </div>
            </div>
            <div className="page-half-section" >
                <div className="flex column gap1">
                    <div className="flex w100 between align-center"><p>Ocene klijenata:</p> <p className="see-more" >Vidi sve</p></div>
                    <RatingCard />
                    <RatingCard />
                </div>
                <div className="flex column gap1 mt1">
                    <div className="flex w100 between align-center"><p>{admin ? 'Postavljeni oglasi' : 'Obavljeni poslovi'}</p> <p className="see-more" >Vidi sve</p></div>
                    {user && user[admin ? 'jobs' : 'jobsDone'].map((j, i) => <JobCard className='h6' key={i} location={j.location} id={j.id} date={j.date} name={j.name} category={j.category} />)}
                </div>
            </div>
        </div>
    </div>
}