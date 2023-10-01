import { faCheckCircle, faClock, faHammer, faList, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Button';
import { LatestTasksCard } from 'components/LatestTasksCard';
import { getJobsOverview } from 'feautures/task/taskSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { handleNameCase } from 'utils/helpers';

export const Home = () => {
  const user: any = JSON.parse(localStorage.getItem('user'))
  const { jobsOverview } = useSelector((state: RootState) => state.tasks)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getJobsOverview(null))
  }, [])

  return <div className="page-content" >
    <div className='content-title-bar' >
      <p><span>Zdravo,</span> {handleNameCase(user?.name)}</p>
      <Button onClick={() => navigate('/tasks/create')} text='Dodaj zadatak' icon={faPlusCircle} />
    </div>
    <div className='home-cards-container mt2' >
      <div className='card-wrapper' onClick={() => navigate('/tasks')} >
        <div className='home-card-icon-count' >
          <FontAwesomeIcon icon={faList} color={'#8FADF0'} />
          <p>{jobsOverview.allJobs || 0}</p>
        </div>
        <h3>Svi zadaci</h3>
      </div>
      <div className='card-wrapper bgPaleGreen' onClick={() => navigate('/tasks?status=DONE')}>
        <div className='home-card-icon-count' >
          <FontAwesomeIcon icon={faCheckCircle} color={'#01A05D'} />
          <p>{jobsOverview.completed || 0}</p>
        </div>
        <h3>Obavljeni zadaci</h3>
      </div>
      <div className='card-wrapper bgPaleYellow' onClick={() => navigate('/tasks?status=IN_PROGRESS')}>
        <div className='home-card-icon-count' >
          <FontAwesomeIcon icon={faHammer} color={'#ADAC10'} />
          <p>{jobsOverview.inProgress || 0}</p>
        </div>
        <h3>U toku</h3>
      </div>
      <div className='card-wrapper bgPaleRed' onClick={() => navigate('/tasks?status=ACTIVE')}>
        <div className='home-card-icon-count' >
          <FontAwesomeIcon icon={faClock} color={'#D42B20'} />
          <p>{jobsOverview.waitingForWorker || 0}</p>
        </div>
        <h3>Čekaju radnika</h3>
      </div>
    </div>
    <div className='home-bottom-section'  >
      <div className='info-cards-container' >
        <div className='info-cards-title' >
          <p>Poslednja ažuriranja:</p>
          <button className='see-more' >Vidi sve</button>
        </div>
        <LatestTasksCard />
        <LatestTasksCard />
      </div>
      <div className='info-cards-container' >
        <LatestTasksCard />
      </div>
    </div>

  </div>;
};
