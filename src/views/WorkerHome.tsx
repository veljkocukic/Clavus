import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ISelectValue, Select } from 'components/Select'
import { faPaintRoller } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'components/Pagionation';
import { useState } from 'react';
import { SearchBox } from 'components/SearchBox/SearchBox';
import { TextArea } from 'components/TextArea';
import { Button } from 'components/Button';
import { Categories } from './Tasks/tasksData';
import { AppDispatch } from 'store';
import { useDispatch } from 'react-redux';
import { addBioAndCat } from 'feautures/user/userSlice';

export const WorkerHome = () => {
    /*eslint-disable*/

    const user: any = JSON.parse(localStorage.getItem('user'))
    const [params, setParams] = useState<any>({ limit: 9, page: 1, sort: 'DATE_D' })
    const [modalOpen, setModalOpen] = useState(true)
    const [bio, setBio] = useState('')
    const [categories, setCategories] = useState([])
    const dispatch = useDispatch<AppDispatch>()

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
            await dispatch(addBioAndCat({ bio, categories }))
        }
        setModalOpen(false)
    }

    const JobCard = () => {
        return <div className='worker-job-card'>
            <div className='flex align-center just-center h100 ' >
                <FontAwesomeIcon icon={faPaintRoller} />
            </div>
            <div className='flex between h100 column' >
                <div>
                    <h2>Ciscenje zgrade</h2>
                    <p>Bulevar Patrijarha Pavla 9p, Beogard</p>
                </div>
                <div className='flex w100 between center' >
                    <p className='date' >01.April 2023.</p>
                    <p className="green-text" >
                        1500.00
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
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
        </div>

        <Pagination pageCount={5} setPage={null} forcePage={1} />
        <div className='worker-home-modal' >
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
        </div>
    </div>

}