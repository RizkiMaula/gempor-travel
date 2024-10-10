import { Outlet } from 'react-router-dom';
import Footer from '../components/fragmentes/Footer';
import NavbarUser from '../components/fragmentes/NavbarUser';

const LayoutUsers = () => {
  return (
    <>
      <NavbarUser />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutUsers;
