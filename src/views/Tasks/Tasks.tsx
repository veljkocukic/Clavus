import { IconButton } from 'components/IconButton'
import { faCheck, faFilter, faHammer, faEye, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEdit } from '@fortawesome/free-regular-svg-icons'
import { Pagination } from 'components/Pagionation'
import { useEffect, useState } from 'react'
import { convertTaskDate, getCategoryIcon, handlePagination } from 'utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { clearTaskList, getTasks } from 'feautures/task/taskSlice'
import { ITableTask } from './tasksData'
import { useNavigate } from 'react-router-dom'
import { Button } from 'components/Button'
import { MobileTaskItem } from 'components/MobileTaskItem'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export const Tasks = () => {
    /*eslint-disable*/
    const [params, setParams] = useState<any>(location.search
        ? Object.fromEntries(new URLSearchParams(location.search))
        : { page: 1, limit: 5 })
    const dispatch = useDispatch<AppDispatch>()
    const { allTasks, totalPages } = useSelector((state: RootState) => state.tasks)
    const navigate = useNavigate()

    useEffect(() => {
        const p = !params.page ? { ...params, page: 1, limit: 5 } : params
        setParams(p)
        dispatch(getTasks(p))
        return () => {
            dispatch(clearTaskList())
        }
    }, [params])

    const renderOptions = (id: number) => {
        return [
            {
                name: 'Pregled',
                icon: faEye,
                onClick: () => navigate('/tasks/' + id)
            },
            {
                name: 'Brisanje',
                icon: faTrash,
                onClick: null
            }
        ]
    }

    const renderRows = () => {

        const getStatusStyle = (status) => {
            let icon = faClock
            let text = 'U TOKU'
            let color = { icon: '#ADAC10', bg: '#F0E68F' }

            switch (status) {
                case 'IN_PROGRESS':
                    icon = faHammer
                    text = 'U TOKU'
                    color = { icon: '#8FADF0', bg: '#F1F5FE' }
                    break;
                case 'DONE':
                    icon = faCheck
                    text = 'ZAVRŠEN'
                    color = { icon: '#01A05D', bg: '#EDF8F0' }
                    break
                case 'ACTIVE':
                    icon = faClock
                    text = 'ČEKA RADNIKA'
                    color = { icon: '#ADAC10', bg: '#F7F5EC' }
                    break
            }

            return <div className='w15' >
                <div className="table-status w7" style={{ backgroundColor: color.bg }} >
                    <FontAwesomeIcon icon={icon as IconProp} color={color.icon} />
                    <p>{text}</p>
                </div>
            </div>
        }

        return allTasks.map((t: ITableTask, i: number) => screen.width > 420 ? <div className='tr' key={t.id} style={{ zIndex: 100 - i }} >
            <FontAwesomeIcon icon={getCategoryIcon(t.category) as IconProp} className='w4' />
            <p className='w15 ml1' >{t.name}</p>
            <p className='w15' >{convertTaskDate(t.date) + ' ' + new Date(t.date).getFullYear()}</p>
            {getStatusStyle(t.status)}
            <p className='w15' >{t.jobOffers}</p>
            <IconButton className='table-icon' options={renderOptions(t.id)} icon={faEdit as IconProp} />
        </div> : <MobileTaskItem
            id={t.id}
            status={getStatusStyle(t.status)}
            title={t.name}
            date={convertTaskDate(t.date)}
            offers={t.jobOffers}
            icon={getCategoryIcon(t.category)} />)
    }


    return <div className="page-content" >
        <div className='content-title-bar' >
            <p><span>Svi zadaci</span></p>
            <div className='flex gap1' > <Button onClick={() => navigate('/tasks/create')} text='Dodaj zadatak' icon={faPlusCircle as IconProp} /><IconButton icon={faFilter as IconProp} /></div>
        </div>
        <div className='table-container' >
            <div className='th'>
                <p className='w15 ml5' >Naziv zadatka</p>
                <p className='w15' >Datum</p>
                <p className='w15' >Status</p>
                <p>Ponude</p>
            </div>
            <div className='table-tr-container' >
                {allTasks && renderRows()}
            </div>
        </div>
        {<Pagination setPage={(page) => handlePagination(page, setParams, 5)}
            pageCount={Math.ceil(totalPages)}
            forcePage={(params.page ? params.page : 1) - 1}
        />}
    </div>
}