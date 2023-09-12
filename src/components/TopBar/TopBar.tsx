import { Button } from 'components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileButton } from './ProfileButton';

interface ITopBar {
  login?: boolean
}
export const TopBar = ({ login }: ITopBar) => {
  const navigate = useNavigate()

  return (
    <div className="top-bar-container">
      <h1>Clavus</h1>
      {!login ? <ProfileButton /> : <Button text='Prijava' onClick={() => navigate('/auth/prijava')} />}
    </div>
  );
};
