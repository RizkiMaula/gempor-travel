import { Navigate, Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const ProtectedProfile = ({ childern }) => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [role, setRole] = useLocalStorage('role', '');

  if (!token || token === 'undefined') {
    return <Navigate to={'/login'} />;
  }

  return <div> {childern || <Outlet />} </div>;
};

export default ProtectedProfile;
