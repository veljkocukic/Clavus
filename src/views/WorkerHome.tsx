import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ISelectValue, Select } from 'components/Select'
import { faPaintRoller } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'components/Pagionation';
import { useState } from 'react';

export const WorkerHome = () => {
    /*eslint-disable*/

    const user: any = JSON.parse(localStorage.getItem('user'))
    const [params, setParams] = useState<any>({ limit: 9, page: 1, sort: 'DATE_D' })

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
    </div>

}