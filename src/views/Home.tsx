import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faCheckCircle, faClock, faHammer, faList, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Button';
import { getJobsOverview } from 'feautures/task/taskSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { handleNameCase } from 'utils/helpers';
import { recommendedCategories, recommendedShops } from './homeData';

interface IScrollCard {
  img: string
  location?: string
  title: string
  subtitle?: string
  onClick?: () => any
}

export const ScrollCard = ({ img, location, title, subtitle, onClick }: IScrollCard) => {
  return <div className='scroll-card h100 w100' onClick={onClick} >
    <div className='cover' ></div>
    <img src={img} alt='categrory-image' />
    <div className='card-text' >
      <p>{location}</p>
      <h2>{title}</h2>
      <h4>{subtitle}</h4>
    </div>

  </div>
}

export const Home = () => {
  const user: any = JSON.parse(localStorage.getItem('user'))
  const { jobsOverview } = useSelector((state: RootState) => state.tasks)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getJobsOverview(null))
  }, [])

  return <div className="page-content overflow-auto "   >
    <div className='content-title-bar' >
      <p><span>Zdravo,</span> {handleNameCase(user?.name)}</p>
      <Button onClick={() => navigate('/tasks/create')} text='Dodaj zadatak' icon={faPlusCircle} />
    </div>
    <div className='w100 mt2 section-title ' >
      <h2>Zadaci: </h2>
    </div>
    <div className='home-cards-container mt1 ' >
      <div className='card-wrapper task-statuses-card' onClick={() => navigate('/tasks')} >
        <div className='home-card-icon-count' >
          <FontAwesomeIcon icon={faList as IconProp} color={'#8FADF0'} />
          <p>{jobsOverview.allJobs || 0}</p>
        </div>
        <h3>Svi zadaci</h3>
      </div>
      <div className='card-wrapper bgPaleGreen task-statuses-card' onClick={() => navigate('/tasks?status=DONE')}>
        <div className='home-card-icon-count' >
          <FontAwesomeIcon icon={faCheckCircle as IconProp} color={'#01A05D'} />
          <p>{jobsOverview.completed || 0}</p>
        </div>
        <h3>Obavljeni zadaci</h3>
      </div>
      <div className='card-wrapper bgPaleYellow task-statuses-card' onClick={() => navigate('/tasks?status=IN_PROGRESS')}>
        <div className='home-card-icon-count' >
          <FontAwesomeIcon icon={faHammer as IconProp} color={'#ADAC10'} />
          <p>{jobsOverview.inProgress || 0}</p>
        </div>
        <h3>U toku</h3>
      </div>
      <div className='card-wrapper bgPaleRed task-statuses-card' onClick={() => navigate('/tasks?status=ACTIVE')}>
        <div className='home-card-icon-count' >
          <FontAwesomeIcon icon={faClock as IconProp} color={'#D42B20'} />
          <p>{jobsOverview.waitingForWorker || 0}</p>
        </div>
        <h3>Čekaju radnika</h3>
      </div>
    </div>
    <div className='home-bottom-section'  >
      <div className='w100 section-title' >
        <h2>Istaknute kategorije: </h2>
      </div>
      <div className='vertical-scroll-list' >
        {recommendedCategories.map((c, i) => <ScrollCard title={c.title} img={c.img} key={i} />)}
      </div>
      <div className='schedule-home-section' >
        <div className='text' >
          <h3>Zakažite termin kod:</h3>
          <p>Mehanicara</p>
        </div>
        <div className='view-stores' >
          <p>Pogledaj sve radnje</p>
          <FontAwesomeIcon icon={faArrowRight as IconProp} />
        </div>
        <div className='overlay' ></div>
      </div>
      <div className='w100 section-title' >
        <h2>Istaknute radnje: </h2>
      </div>
      <div className='vertical-scroll-list' >
        {recommendedShops.map((c, i) => <ScrollCard title={c.title} subtitle={c.subtitle} location={c.location} img={c.img} key={i} />)}
      </div>
    </div>


  </div>;
};
