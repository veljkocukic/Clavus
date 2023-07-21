import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'components/Button'
import { IconButton } from 'components/IconButton'
import { faCalendarDays, faGear } from '@fortawesome/free-solid-svg-icons'
import { Categories, priceTypes, statusStyles } from './tasksData'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getTask } from 'feautures/task/taskSlice'
import { convertTaskDate } from 'utils/helpers'


export const ViewTask = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams()

    const { task } = useSelector((state: RootState) => state.tasks)
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

    return <div className="page-contetnt" >

        <div className='content-title-bar' >
            <p><span>Pregled zadatka</span></p>
            <div className='button-options-container' >
                <Button text='Potvrdi i oceni radnika' />
                <IconButton icon={faGear} />
            </div>
        </div>

        <div className='view-task-banner' >
            <div className='vtb-info' >
                <FontAwesomeIcon icon={category?.icon} />
                <div>
                    <h1>{category?.name}</h1>
                    <h3>{task?.name}</h3>
                    <p>{task?.location}</p>
                </div>
            </div>
            <div className='vtb-images-container' >

            </div>
        </div>
        <div className='vtb-bottom-container' >
            <div className='vtb-bottom-section' >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
                    <div className='card-wrapper' >
                        <div className='vtb-bottom-card-layout' >
                            <p>Datum:</p>
                            <div>
                                <p>{convertTaskDate(task.date)} <br />{new Date(task.date).getFullYear()}</p>
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
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 1 / 2 / 2' }} >{task.amount}</div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 2 / 2 / 3' }}>{task.currency}</div>
                        <div className='expenses-parameter' style={{ gridArea: ' 1 / 3 / 2 / 4' }}>{priceType?.label}</div>
                        {task?.priceType !== 'WHOLE' && <div className='expenses-parameter' style={{ gridArea: ' 2 / 1 / 3 / 2' }}>{task?.amount}</div>}
                        <h3 className='expenses-total'>{calculateTotal()}</h3>
                    </div>
                </div>
            </div>
            <div className='vtb-bottom-section' >
                <div className='vtb-offers-container' >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                        <h3>Ponude:</h3>
                        <button className='see-more' >Vidi sve</button>
                    </div>
                    <div className='vtb-offers-container__grid' >
                        <div className='vtb-single-offer' >
                            <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='worker-image' />
                            <div className='vtb-single-offer__info' >
                                <p>Goran <br />Moler</p>
                                <h2>3.4</h2>
                            </div>
                        </div>
                        <div className='vtb-single-offer' >
                            <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='worker-image' />
                            <div className='vtb-single-offer__info' >
                                <p>Goran <br />Moler</p>
                                <h2>3.4</h2>
                            </div>
                        </div>
                        <div className='vtb-single-offer' >
                            <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='worker-image' />
                            <div className='vtb-single-offer__info' >
                                <p>Goran <br />Moler</p>
                                <h2>3.4</h2>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div >

    </div >
}