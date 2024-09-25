import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/fragmentes/NavbarAdmin';

const LayoutAdmin = () => {
  return (
    <>
      <NavbarAdmin />
      <Outlet />
      <h1>Footer</h1>
    </>
  );
};

export default LayoutAdmin;
