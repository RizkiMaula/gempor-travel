import React from 'react';
import { Navbar, Collapse, Typography, IconButton } from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileElement from '../elements/ProfileElement';
import { MoonIcon } from '@heroicons/react/24/solid';

const NavListLib = () => {
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
    <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#"
          className="flex items-center transition-colors hover:text-blue-500"
        >
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#"
          className="flex items-center transition-colors hover:text-blue-500"
        >
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#"
          className="flex items-center transition-colors hover:text-blue-500"
        >
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#"
          className="flex items-center transition-colors hover:text-blue-500"
        >
          Docs
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <button>
          <MoonIcon className="w-5 h-5" />
        </button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#"
          className="flex items-center transition-colors hover:text-blue-500"
        >
          {!token && !role && (
            <button
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </button>
          )}
          {token && (
            <div>
              <ProfileElement event={handleLogout} />
            </div>
          )}
        </a>
      </Typography>
    </ul>
  );
};

export default NavListLib;
