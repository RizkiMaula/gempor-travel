import { Outlet } from 'react-router-dom';
import Footer from '../components/fragmentes/Footer';
import NavbarUser from '../components/fragmentes/NavbarUser';

const LayoutUsers = () => {
  return (
    <div className="w-full h-full flex flex-col dark:bg-darkColor dark:text-lightTextColor transition-colors duration-500">
      <NavbarUser />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutUsers;
