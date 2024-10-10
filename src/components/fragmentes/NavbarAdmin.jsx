import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Card, Typography, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { UserCircleIcon, PowerIcon, HomeIcon, PercentBadgeIcon, QueueListIcon, Squares2X2Icon, FlagIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const NavbarAdmin = () => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [role, setRole] = useLocalStorage('role', '');

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
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="p-4 mb-2">
        <Typography
          variant="h5"
          color="blue-gray"
        >
          Sidebar
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
  );
};

export default NavbarAdmin;
