import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Typography, Collapse, IconButton, Navbar } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { NavList } from '../elements/MenuList';
import ProfileElement from '../elements/ProfileElement';
import useAlert from '../../hooks/alerts/useAlert';

const NavbarAdmin = () => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [role, setRole] = useLocalStorage('role', '');
  const [openNav, setOpenNav] = useState(false);
  const { successAlert, errorAlert } = useAlert();

  const navigate = useNavigate();

  const handleLogout = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout',
      headers: {
        apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout',
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setToken('');
            setRole('');
            navigate('/login');
            successAlert({ title: 'Success', text: 'Logout Success' });
          })
          .catch((error) => {
            console.log(error);
            errorAlert({ title: 'Error', text: error });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <Navbar className="max-w-screen-xl px-4 py-2 mx-auto dark:bg-darkColor ">
      <div className="flex items-center justify-between text-blue-gray-900 dark:text-lightTextColor">
        <Typography
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          <Link to={'/admin'}>Admin Gempor</Link>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <ProfileElement event={handleLogout} />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon
              className="w-6 h-6"
              strokeWidth={2}
            />
          ) : (
            <Bars3Icon
              className="w-6 h-6"
              strokeWidth={2}
            />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex items-center w-full gap-2 flex-nowrap lg:hidden">
          <ProfileElement event={handleLogout} />
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarAdmin;
