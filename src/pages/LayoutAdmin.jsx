import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/fragmentes/NavbarAdmin';

const LayoutAdmin = () => {
  return (
    <div className="w-full border-2 border-black dark:bg-darkColor dark:text-lightTextColor transition-colors duration-500">
      <NavbarAdmin />
      <div className="w-full border-2 min-h-[89.8vh] border-black">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAdmin;
