import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'components/Button'
import { useNavigate } from 'react-router-dom'
import { ScrollCard } from 'views/Home'

export const Workshops = () => {

    const navigate = useNavigate()

    return <div className="page-conten" >
        <div className='content-title-bar' >
            <p>Radnje</p>
            <Button onClick={() => navigate('/workshops/create')} text='Dodaj radnju' icon={faPlusCircle} />
        </div>
        <div className="workshops-grid" >
            {/* {allWorkerTasks?.map(wt => <JobCard category={wt.category} id={wt.id} key={wt.id} name={wt.name} location={wt.location} date={wt.date} price={1500} />)} */}
            <ScrollCard onClick={() => navigate('/workshops/worker/1')} title={'Radnja 1'} location={'Bulevar Partrijatha Pabla 9'} subtitle='tip' img={'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'} key={3} />
        </div>
    </div>
}