import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'components/Button'
import { IconButton } from 'components/IconButton'
import { faCalendarDays, faGear } from '@fortawesome/free-solid-svg-icons'
import { Categories, priceTypes, statusStyles } from './tasksData'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getTask } from 'feautures/task/taskSlice'
import { convertTaskDate, convertToHoursMins } from 'utils/helpers'
import { OfferModal } from './OfferModal'
import { RateModal } from './RateModal'

export const ViewTask = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams()
    const navigate = useNavigate()
    const { task } = useSelector((state: RootState) => state.tasks)
    const location = useLocation()
    const [offerModalOpen, setOfferModalOpen] = useState(false)
    const [rateModalOpen, setRateModalOpen] = useState(false)

    let admin = true
    if (location.pathname.includes('worker')) {
        admin = false
    }

    useEffect(() => {
        dispatch(getTask(id))
    }, [])

    const renderStatusCard = () => {
        const s = statusStyles.find(s => s.status === task.status)
        if (task?.status == 'IN_PROGRESS') {
            return <div className='vtb-bottom-card-layout'><p>Obavlja:</p><div><img alt='worker-image' src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' /><p>Goran <br />Moler</p></div></div>
        } else {
            return <div className='vtb-bottom-card-layout' style={{ backgroundColor: s?.color }} ><p>Status:</p><div><p>{s?.label}</p><FontAwesomeIcon icon={s?.icon} color={s?.iconColor} /></div></div>
        }
    }

    const category = Categories.find(c => c.value === task.category)
    const priceType = priceTypes.find(p => p.value == task?.priceType)
    const calculateTotal = () => {
        if (task?.priceType !== 'WHOLE') {
            return '≈ ' + (task.amount * task.price).toFixed() + ' ' + task.currency
        } else {
            return '≈ ' + task.price + ' ' + task.currency
        }

    }

    const SingleOffer = ({ name, lastName, ratings, id }) => {
        return <div className='vtb-single-offer' onClick={() => navigate('/job-offer/' + id)}>
            <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='worker-image' />
            <div className='vtb-single-offer__info' >
                <p>{name} <br />{lastName}</p>
                <h2>{ratings ?? 'Bez ocene'}</h2>
            </div>
        </div>
    }

    const renderButton = () => {
        if (admin) {
            return <>
                {task.status == 'IN_PROGRESS' && < Button text='Potvrdi i oceni radnika' onClick={() => setRateModalOpen(true)} />}
                <IconButton icon={faGear} />
            </>
        } else
            return task.status == 'ACTIVE' ? <Button text='Pošalji ponudu' onClick={() => setOfferModalOpen(true)} /> : <></>
    }

    return <div className="page-contetnt" >

        <div className='content-title-bar' >
            <p><span>Pregled zadatka</span></p>
            <div className='button-options-container' >
                {renderButton()}
            </div>
        </div>

        <div className='view-task-banner' >
            <div className='vtb-info' >
                <FontAwesomeIcon icon={category?.icon} />
                <div>
                    <h1>{category?.label}</h1>
                    <h3>{task?.name}</h3>
                    <p>{task?.location}</p>
                </div>
            </div>
            <div className='vtb-images-container' >

            </div>
        </div>
        <div className='vtb-bottom-container' >
            <div className='vtb-bottom-section' >
                <div className='flex align-center between h100 gap1 column-645'  >
                    <div className='card-wrapper' >
                        <div className='vtb-bottom-card-layout' >
                            <p>Datum:</p>
                            <div>
                                <div className='flex column gap1 w100 h100 between' >
                                    <p>{convertTaskDate(task.date)}</p>
                                    <p>{convertToHoursMins(task.date)}</p>
                                </div>
                                <FontAwesomeIcon color='#dee0ea' icon={faCalendarDays} />
                            </div>
                        </div>
                    </div>
                    <div className='card-wrapper' >
                        {renderStatusCard()}
                    </div>
                </div>
                <div className='vtb-expenses-container' >
                    <h3>Troškovi:</h3>
                    <div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 1 / 2 / 2' }} >{task.price}</div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 2 / 2 / 3' }}>{task.currency}</div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 3 / 2 / 4' }}>{priceType?.label}</div>
                        {task?.priceType !== 'WHOLE' && <div className='expenses-parameter' style={{ gridArea: ' 2 / 1 / 3 / 2' }}>{task?.amount}</div>}
                        <h3 className='expenses-total'>{calculateTotal()}</h3>
                    </div>
                </div>
            </div>
            <div className='vtb-bottom-section' >
                {admin && <div className='vtb-offers-container' >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                        <h3>Ponude:</h3>
                        <button className='see-more' >Vidi sve</button>
                    </div>
                    <div className='vtb-offers-container__grid' >
                        {task?.jobOffers?.map(o => <SingleOffer key={o.id} id={o.id} name={o.user.name} lastName={o.user.lastName} ratings={o.user.ratings?.toFixed(1) ?? '/'} />)}
                    </div>
                </div>}

            </div>

        </div >
        {rateModalOpen && <RateModal setOpenModal={setRateModalOpen} />}
        {offerModalOpen && <OfferModal setOpenModal={setOfferModalOpen} price={task.price} priceType={task.priceType} amount={task.amount} currency={task.currency} />}
    </div >
}