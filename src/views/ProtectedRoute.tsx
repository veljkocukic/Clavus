import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }: any) => {
  const token = localStorage.getItem('token');
  const location = useLocation()

  if (!token && !location.pathname.includes('sajt')) {
    return <Navigate to='auth' />;
  } else
    return children;
};
