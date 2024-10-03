import { Outlet } from 'react-router-dom';
import NavbarUser from '../components/fragmentes/NavbarUser';
import Footer from '../components/fragmentes/Footer';

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
