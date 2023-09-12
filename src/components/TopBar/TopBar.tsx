import { Button } from 'components/Button';
import React from 'react';
import { ProfileButton } from './ProfileButton';

interface ITopBar {
  login?: boolean
}
export const TopBar = ({ login }: ITopBar) => {
  return (
    <div className="top-bar-container">
      <h1>Clavus</h1>
      {!login ? <ProfileButton /> : <Button text='Prijava' />}
    </div>
  );
};
