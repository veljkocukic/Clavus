import { Button } from 'components/Button';
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
        <ProfileButton />
        :
        <Button text='Prijava' onClick={() => navigate('/auth/prijava')} />
      }
    </div>
  );
};
