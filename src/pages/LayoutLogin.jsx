import { Outlet } from 'react-router-dom';
import Footer from '../components/fragmentes/Footer';
import NavbarUser from '../components/fragmentes/NavbarUser';

const LayoutLogin = () => {
  return (
    <>
      <NavbarUser />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutLogin;
