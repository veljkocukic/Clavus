import { faCheckCircle, faClock, faHammer, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Button';
import { LatestTasksCard } from 'components/LatestTasksCard';
import { useNavigate } from 'react-router-dom';
import { handleNameCase } from 'utils/helpers';

export const Home = () => {

  const user: any = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  return <div className="page-content" >
    <div className='content-title-bar' >
      <p><span>Zdravo,</span> {handleNameCase(user?.name)}</p>
      <Button onClick={() => navigate('/tasks/create')} text='DODAJ ZADATAK' />
    </div>
    <div className='home-cards-container mt2' >
      <div className='card-wrapper' >
        <div className='card-icon-count' >
          <FontAwesomeIcon icon={faList} color={'#8FADF0'} />
          <p>10</p>
        </div>
        <h3>Svi zadaci</h3>
      </div>
      <div className='card-wrapper bgPaleGreen' >
        <div className='card-icon-count' >
          <FontAwesomeIcon icon={faCheckCircle} color={'#01A05D'} />
          <p>7</p>
        </div>
        <h3>Obavljeni zadaci</h3>
      </div>
      <div className='card-wrapper bgPaleYellow' >
        <div className='card-icon-count' >
          <FontAwesomeIcon icon={faHammer} color={'#ADAC10'} />
          <p>2</p>
        </div>
        <h3>U toku</h3>
      </div>
      <div className='card-wrapper bgPaleRed' >
        <div className='card-icon-count' >
          <FontAwesomeIcon icon={faClock} color={'#D42B20'} />
          <p>2</p>
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
