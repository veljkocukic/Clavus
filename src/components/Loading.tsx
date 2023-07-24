import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import '../sass/components/_loading.scss';
import HashLoader from 'react-spinners/HashLoader';

export const Loading = () => {
  const userLoading = useSelector((store: RootState) => store.user.isLoading);
  const logedUser = useSelector((store: RootState) => store.user.isUserLoading);
  const tasksLoading = useSelector((store: RootState) => store.tasks.isLoading);
  const jobOffersLoading = useSelector((store: RootState) => store.jobOffers.isLoading);
  const loading = userLoading || logedUser || tasksLoading || jobOffersLoading

  const override: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999
  };

  return (
    <HashLoader
      color={'#0050d0'}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
};
