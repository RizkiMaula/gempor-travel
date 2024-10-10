import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/fragmentes/NavbarAdmin';

const LayoutAdmin = () => {
  return (
    <div className="flex w-full h-full">
      <NavbarAdmin />
      <div className="border-2 border-black w-full">
        <Outlet />
        <h1>Footer</h1>
      </div>
    </div>
  );
};

export default LayoutAdmin;
