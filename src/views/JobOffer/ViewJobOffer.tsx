import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'components/Button'
import { IconButton } from 'components/IconButton'
import { acceptJobOffer, getJobOffer } from 'feautures/jobOffer/jobOfferSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from 'store'
import { ProfileRatingsOffer } from 'views/Profile/ProfileRatingsOffer'
import { priceTypes } from 'views/Tasks/tasksData'

export const ViewJobOffer = () => {
    /*eslint-disable*/
    const dispatch = useDispatch<AppDispatch>()
    const [openModal, setOpenModal] = useState(false)
    const { jobOffer } = useSelector((state: RootState) => state.jobOffers)
    const navigate = useNavigate()
    const { id } = useParams()


    useEffect(() => {
        dispatch(getJobOffer(id))
    }, [])

    const handleAcceptOffer = async () => {
        const resp = await dispatch(acceptJobOffer(jobOffer.id))
        if (resp.meta.requestStatus === 'fulfilled') {
            navigate('/messsages/' + resp.payload.id)
        }
    }

    const priceType = priceTypes.find(p => p.value == jobOffer?.priceType)


    return <div className='page-content' >
        <div className='content-title-bar' >
            <p><span>Pregled ponude</span></p>
            <div className='button-options-container' >
                {!jobOffer.expired && <Button text='Prihvati ponudu' onClick={handleAcceptOffer} />}
                <IconButton icon={faGear} />
            </div>
        </div>
        <div className='page-halves-layout' >
            <div className='page-half-section' >
                <div className='job-offer-header' >
                    <img className='square-image' src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='worker-image' />
                    <div>
                        <div>
                            <p className='joh-top' >{jobOffer?.user && (jobOffer?.user?.name + ' ' + jobOffer?.user?.lastName)}</p>
                            <div className='see-more' onClick={() => setOpenModal(true)} >Pogledaj ocene</div>
                        </div>
                    </div>
                </div>
                <div className='flex just-between w100 gap1 mt2' >
                    <div className='card-wrapper' >
                        <div className='card-icon-count h100' >
                            <h3>Obavljeni zadaci</h3>
                            <p>{jobOffer?.user?.jobsDone ?? 0}</p>
                        </div>
                    </div>
                    <div className='card-wrapper' >
                        <div className='card-icon-count h100' >
                            <h3>Prosečna ocena</h3>
                            <p>{jobOffer?.user?.ratings?.toFixed(1) ?? '/'}</p>
                        </div>
                    </div>
                </div>
                <div className='card-with-title mt1' >
                    <p className='card-title'> Detalji </p>
                    <div className='card-wrapper w100 pad1' >
                        <p>{jobOffer?.description}</p>
                    </div>
                </div>

            </div>
            <div className='page-half-section ' >
                <div className='vtb-expenses-container mt5 ml2' >
                    <h3>Troškovi:</h3>
                    <div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 1 / 2 / 2' }} >{jobOffer?.price}</div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 2 / 2 / 3' }}>{jobOffer?.currency}</div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 3 / 2 / 4' }}>{priceType?.label}</div>
                        {jobOffer?.priceType !== 'WHOLE' && <div className='expenses-parameter' style={{ gridArea: ' 2 / 1 / 3 / 2' }}>{jobOffer?.amount}</div>}
                        <h3 className='expenses-total'>≈ {jobOffer?.price && (jobOffer?.price * (jobOffer?.amount ?? 1) + ' ' + jobOffer?.currency)}</h3>
                    </div>
                </div>
            </div>
        </div>
        {openModal && <ProfileRatingsOffer id={jobOffer.userId} setOpenModal={setOpenModal} />}

    </div>
}