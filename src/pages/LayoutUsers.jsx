import { Outlet } from 'react-router-dom';
import Footer from '../components/fragmentes/Footer';
import NavbarUser from '../components/fragmentes/NavbarUser';

const LayoutUsers = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <NavbarUser />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutUsers;
