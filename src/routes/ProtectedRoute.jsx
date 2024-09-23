import { Navigate, Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const ProtectedRoute = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const [token, setToken] = useLocalStorage('authToken', '');
  const [role, setRole] = useLocalStorage('role', '');

  if (!token || token === 'undefined') {
    return <Navigate to={'/login'} />;
  } else if (role !== 'admin' || role === '') {
    return <Navigate to={'/*'} />;
  }

  return <div> {children || <Outlet />} </div>;
};

export default ProtectedRoute;
