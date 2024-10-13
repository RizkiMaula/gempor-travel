import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Card, Typography, List, ListItem, ListItemPrefix, Collapse, IconButton, Navbar } from '@material-tailwind/react';
import { UserCircleIcon, PowerIcon, HomeIcon, PercentBadgeIcon, QueueListIcon, Squares2X2Icon, FlagIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NavListLib from './NavList';
import { useState } from 'react';

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
            navigate('/login');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 md:flex hidden">
        <div className="p-4 mb-2">
          <Typography
            variant="h5"
            color="blue-gray"
          >
            Admin Page
          </Typography>
        </div>
        <List>
          <ListItem onClick={() => navigate('/')}>
            <ListItemPrefix>
              <HomeIcon className="w-5 h-5" />
            </ListItemPrefix>
            Home
          </ListItem>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem onClick={() => navigate('/admin')}>
            <ListItemPrefix>
              <Squares2X2Icon className="w-5 h-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem onClick={() => navigate('/admin/activity')}>
            <ListItemPrefix>
              <UserCircleIcon className="w-5 h-5" />
            </ListItemPrefix>
            Activities
          </ListItem>
          <ListItem onClick={() => navigate('/admin/banner')}>
            <ListItemPrefix>
              <FlagIcon className="w-5 h-5" />
            </ListItemPrefix>
            Banner
          </ListItem>
          <ListItem onClick={() => navigate('/admin/categories')}>
            <ListItemPrefix>
              <QueueListIcon className="w-5 h-5" />
            </ListItemPrefix>
            Categories
          </ListItem>

          <ListItem onClick={() => navigate('/admin/promos')}>
            <ListItemPrefix>
              <PercentBadgeIcon className="w-5 h-5" />
            </ListItemPrefix>
            Promo
          </ListItem>

          <ListItem onClick={() => navigate('/admin/users')}>
            <ListItemPrefix>
              <UserCircleIcon className="w-5 h-5" />
            </ListItemPrefix>
            User
          </ListItem>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem onClick={() => navigate('/profile')}>
            <ListItemPrefix>
              <UserCircleIcon className="w-5 h-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <PowerIcon className="w-5 h-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>

      <nav className="w-screen fixed md:hidden z-20 top-0 bg-white border-b">
        <div className="relative flex items-center justify-between px-6 py-3">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 w-full"
          >
            Admin Page
          </Typography>
          <button
            className="w-6 h-6 border border-black"
            onClick={() => setOpenNav(!openNav)}
          >
            <Bars3Icon
              className="w-full h-full"
              strokeWidth={2}
            />
          </button>
        </div>
      </nav>
      {openNav && (
        <div className="fixed top-0 left-0 h-screen w-[80vw] bg-white border z-10 px-6 pt-20 pb-6">
          {' '}
          <List>
            <ListItem onClick={() => navigate('/')}>
              <ListItemPrefix>
                <HomeIcon className="w-5 h-5" />
              </ListItemPrefix>
              Home
            </ListItem>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem onClick={() => navigate('/admin')}>
              <ListItemPrefix>
                <Squares2X2Icon className="w-5 h-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
            <ListItem onClick={() => navigate('/admin/activity')}>
              <ListItemPrefix>
                <UserCircleIcon className="w-5 h-5" />
              </ListItemPrefix>
              Activities
            </ListItem>
            <ListItem onClick={() => navigate('/admin/banner')}>
              <ListItemPrefix>
                <FlagIcon className="w-5 h-5" />
              </ListItemPrefix>
              Banner
            </ListItem>
            <ListItem onClick={() => navigate('/admin/categories')}>
              <ListItemPrefix>
                <QueueListIcon className="w-5 h-5" />
              </ListItemPrefix>
              Categories
            </ListItem>

            <ListItem onClick={() => navigate('/admin/promos')}>
              <ListItemPrefix>
                <PercentBadgeIcon className="w-5 h-5" />
              </ListItemPrefix>
              Promo
            </ListItem>

            <ListItem onClick={() => navigate('/admin/users')}>
              <ListItemPrefix>
                <UserCircleIcon className="w-5 h-5" />
              </ListItemPrefix>
              User
            </ListItem>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem onClick={() => navigate('/profile')}>
              <ListItemPrefix>
                <UserCircleIcon className="w-5 h-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemPrefix>
                <PowerIcon className="w-5 h-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </div>
      )}

      {/* <Navbar className="px-6 py-3 mx-auto flex md:hidden fixed w-screen top-0 z-10">
        <div className="flex items-center justify-between text-blue-gray-900 w-full">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 w-full"
          >
            Material Tailwind
          </Typography>
          <div className="hidden lg:block"></div>
          <IconButton
            variant="text"
            className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
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
        <Collapse open={openNav}></Collapse>
      </Navbar> */}
    </>
  );
};

export default NavbarAdmin;
