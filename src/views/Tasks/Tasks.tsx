import { IconButton } from 'components/IconButton'
import { faCheck, faFilter, faHammer, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEdit } from '@fortawesome/free-regular-svg-icons'
import { Pagination } from 'components/Pagionation'
import { useEffect, useState } from 'react'
import { convertTaskDate, getCategoryIcon, handlePagination } from 'utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { getTasks } from 'feautures/task/taskSlice'
import { ITableTask } from './tasksData'
import { useNavigate } from 'react-router-dom'
import { Button } from 'components/Button'



export const Tasks = () => {
    /*eslint-disable*/
    const [params, setParams] = useState({ page: 1, limit: 5 })
    const dispatch = useDispatch<AppDispatch>()
    const { allTasks, totalPages } = useSelector((state: RootState) => state.tasks)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getTasks(params))
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

            return <div className="table-status" style={{ backgroundColor: color.bg }} >
                <FontAwesomeIcon icon={icon} color={color.icon} />
                <p>{text}</p>
            </div>
        }

        return allTasks.map((t: ITableTask, i: number) => <div className='tr' key={t.id} style={{ zIndex: 100 - i }} >
            <FontAwesomeIcon icon={getCategoryIcon(t.category)} className='w4' />
            <p className='w15 ml1' >{t.name}</p>
            <p className='w15' >{convertTaskDate(t.date) + ' ' + new Date(t.date).getFullYear()}</p>
            {getStatusStyle(t.status)}
            <IconButton className='table-icon' options={renderOptions(t.id)} icon={faEdit} />
        </div>)
    }


    return <div className="page-content" >
        <div className='content-title-bar' >
            <p><span>Svi zadaci</span></p>
            <div className='flex gap1' > <Button onClick={() => navigate('/tasks/create')} text='DODAJ ZADATAK' /><IconButton icon={faFilter} /></div>
        </div>
        <div className='table-container' >
            <div className='th'>
                <p className='w15 ml5' >Naziv zadatka</p>
                <p className='w15' >Datum</p>
                <p>Status</p>
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