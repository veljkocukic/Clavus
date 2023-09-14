import { Button } from 'components/Button';
import { NotificationIcon } from 'components/Notification/NotificationIcon';
import { useNavigate } from 'react-router-dom';
import { ProfileButton } from './ProfileButton';

interface ITopBar {
  login?: boolean
  className?: string
}
export const TopBar = ({ login, className }: ITopBar) => {
  const navigate = useNavigate()

  let cName = 'top-bar-container '
  if (className) {
    cName += className
  }
  return (
    <div className={cName}>
      <h1>Clavus</h1>
      {!login ?
        <div className='flex gap1' >
          <ProfileButton />
          <NotificationIcon />
        </div> :
        <Button text='Prijava' onClick={() => navigate('/auth/prijava')} />
      }
    </div>
  );
};
