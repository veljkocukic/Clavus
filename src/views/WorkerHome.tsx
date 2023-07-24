import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ISelectValue, Select } from 'components/Select'
import { faPaintRoller } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'components/Pagionation';
import { useEffect, useState } from 'react';
import { SearchBox } from 'components/SearchBox/SearchBox';
import { TextArea } from 'components/TextArea';
import { Button } from 'components/Button';
import { Categories } from './Tasks/tasksData';
import { AppDispatch, RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { addBioAndCat } from 'feautures/user/userSlice';
import { getWorkerTasks } from 'feautures/task/taskSlice';
import { convertTaskDate, handlePagination } from 'utils/helpers';
import { useNavigate } from 'react-router-dom';

export const WorkerHome = () => {
    /*eslint-disable*/
    const user: any = JSON.parse(localStorage.getItem('user'))
    const workerModalClosed = localStorage.getItem('workerModalClosed')
    const [params, setParams] = useState<any>({ limit: 9, page: 1, sort: 'DATE_D' })
    const [modalOpen, setModalOpen] = useState(workerModalClosed ? false : true)
    const [bio, setBio] = useState(user?.bio || '')
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const { allWorkerTasks, pageCountWT } = useSelector((state: RootState) => state.tasks)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getWorkerTasks(params))
    }, [])


    const options = [
        {
            label: 'Datumu (najskoriji)',
            value: 'DATE_D'
        },
        {
            label: 'Datumu (najkasniji)',
            value: 'DATE_A'
        },
        {
            label: 'Ceni (najviša)',
            value: 'PRICE_D'
        },
        {
            label: 'Ceni (najniža)',
            value: 'PRICE_A'
        }
    ]

    const handleSort = (value: ISelectValue) => {
        setParams((prev: any) => {
            let copy = structuredClone(prev)
            copy.sort = value.value
            return copy
        })
    }


    const handleBioModal = async () => {
        if (bio.length > 0 || categories.length > 0) {
            await dispatch(addBioAndCat({ bio, categories: categories.map(c => c.value) }))
        }
        localStorage.setItem('workerModalClosed', 'true')
        setModalOpen(false)
    }

    const JobCard = ({ name, location, price, date, id }) => {
        return <div className='worker-job-card' onClick={() => navigate('/worker-task/' + id)} >
            <div className='flex align-center just-center h100 ' >
                <FontAwesomeIcon icon={faPaintRoller} />
            </div>
            <div className='flex between h100 column' >
                <div>
                    <h2>{name}</h2>
                    <p>{location}</p>
                </div>
                <div className='flex w100 between center' >
                    <p className='date' >{convertTaskDate(date) + ' ' + new Date(date).getFullYear()}</p>
                    <p className="green-text" >
                        {price}
                    </p>
                </div>
            </div>
        </div>
    }

    const handleRemoveCat = (cat) => {
        setCategories(prev => {
            let copy = structuredClone(prev)
            copy = copy.filter(ct => ct.value !== cat.value)
            return copy
        })
    }

    return <div className="page-content" >
        <div className='content-title-bar' >
            <p><span>Zdravo, </span>{user?.name}</p>
        </div>
        <div className='page-subtitle' >
            <p>Poslovi iz vaših kategorija</p>
            <Select className='w15' options={options} labelText='Sortiraj po:' onChange={handleSort} name='filter' value={params.sort} />
        </div>
        <div className="worker-home-grid" >
            {allWorkerTasks?.map(wt => <JobCard id={wt.id} key={wt.id} name={wt.name} location={wt.location} date={wt.date} price={1500} />)}
        </div>
        <Pagination pageCount={pageCountWT} setPage={(page) => handlePagination(page, setParams, 9)} forcePage={1} />


        {modalOpen && <div className='worker-home-modal' >
            <div>
                <div className='flex column gap1 w100'  >
                    <h1>Dobrodošli u tim! 🎉 </h1>
                    <p style={{ fontSize: '1.3rem' }} >Unesite više podataka o sebi kako biste lakše našli odgovarajuće poslove</p>
                </div>
                <div className='flex between w100 gap3 h100 center mt3' >
                    <div className='search-categories-container w100 mt3' >
                        <div className='w100 '>
                            <p>Izaberite oblasti rada:</p>
                            <SearchBox selected={categories} setList={setCategories} fixedList={Categories} className='w100' />
                            <p className='mt2' >Odabrane oblasti: </p>
                            <div className='selected-categories-grid' >
                                {categories.map(c => <div key={c.value} onClick={() => handleRemoveCat(c)} className='selected-category-item' > <FontAwesomeIcon icon={c.icon} /> {c.label}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className='w100' >
                        <TextArea className='w100 h300' labelText='Biografija' onChange={e => setBio(e.target.value)} value={bio} name='bio' />
                    </div>
                </div>
                <Button className='categories-modal-button' text='Završi' onClick={handleBioModal} />
            </div>
        </div>}
    </div>

}