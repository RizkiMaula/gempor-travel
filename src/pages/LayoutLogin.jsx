import { Outlet } from 'react-router-dom';
import Footer from '../components/fragmentes/Footer';
import NavbarUser from '../components/fragmentes/NavbarUser';

const LayoutLogin = () => {
  return (
    <div className="w-full border-2 border-black dark:bg-darkColor dark:text-lightTextColor transition-colors duration-500">
      <NavbarUser />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutLogin;
