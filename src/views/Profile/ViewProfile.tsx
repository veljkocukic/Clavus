import { getUser } from 'feautures/user/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from 'store'
import { ProfileRatingsOffer } from './ProfileRatingsOffer'
import { JobCard } from 'components/TopBar/JobCard'

export const ViewProfile = () => {

    const { user } = useSelector((state: RootState) => state.user)
    const [openModal, setOpenModal] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getUser(Number(id)))
    }, [])

    let admin = true
    if (location.pathname.includes('worker')) {
        admin = false
    }

    const RatingCard = ({ name, lastName, description, rating, date }) => {
        return <div className='info-card h7' >
            <div className="ic-title" >
                <div>
                    <h2>{name + ' ' + lastName} </h2>
                </div>
                <p className="ic-date">{date}</p>
            </div>
            <div className="ic-bottom__rating mt0" >
                <p>{description}</p>
                <h1>{rating}</h1>
            </div>
        </div>
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

            </div>
            <div className="page-half-section" >
                <div className="flex column gap1">
                    <div className="flex w100 between align-center"><p>Ocene klijenata:</p> {user?.ratings.length > 0 && <p className="see-more" onClick={() => setOpenModal(true)} >Vidi sve</p>}</div>
                    {
                        user?.ratings.length > 0 ? user?.ratings?.map((r, i) => <RatingCard key={i} name={r.ratingGiverUser.name} lastName={r.ratingGiverUser.lastName} description={r.description} rating={r.rating} date={r.date} />) : <h3>Nema ocena</h3>
                    }
                </div>
                <div className="flex column gap1 mt1">
                    <div className="flex w100 between align-center"><p>{admin ? 'Postavljeni oglasi' : 'Obavljeni poslovi'}</p> <p className="see-more" >Vidi sve</p></div>
                    {user && user[admin ? 'jobs' : 'jobsDone'].map((j, i) => <JobCard className='h6' key={i} location={j.location} id={j.id} date={j.date} name={j.name} category={j.category} />)}
                </div>
            </div>
        </div>
        {openModal && <ProfileRatingsOffer id={Number(id)} setOpenModal={setOpenModal} />}
    </div>
}