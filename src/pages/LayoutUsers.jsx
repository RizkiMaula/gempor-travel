import { Outlet } from 'react-router-dom';
import Footer from '../components/fragmentes/Footer';
import NavbarUser from '../components/fragmentes/NavbarUser';

const LayoutUsers = () => {
  return (
    <div className="flex flex-col w-full h-full transition-colors duration-500 dark:bg-darkColor dark:text-lightTextColor">
      <NavbarUser />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutUsers;
