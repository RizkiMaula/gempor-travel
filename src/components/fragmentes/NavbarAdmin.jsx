import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Typography, Collapse, IconButton, Navbar } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { NavList } from '../elements/MenuList';
import ProfileElement from '../elements/ProfileElement';

const NavbarAdmin = () => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [role, setRole] = useLocalStorage('role', '');
  const [openNav, setOpenNav] = useState(false);

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
            alert('logout success');
            setTimeout(() => {
              navigate('/login');
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
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
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 dark:bg-darkColor ">
      <div className="flex items-center justify-between text-blue-gray-900 dark:text-lightTextColor">
        <Typography
          as="a"
          href="/admin/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Admin Gempor
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
              className="h-6 w-6"
              strokeWidth={2}
            />
          ) : (
            <Bars3Icon
              className="h-6 w-6"
              strokeWidth={2}
            />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <ProfileElement event={handleLogout} />
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarAdmin;
