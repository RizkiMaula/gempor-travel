import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileElement from '../elements/ProfileElement';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { darkMode, toggleMode } from '../../redux/slices/darkSlice';
import { useDispatch, useSelector } from 'react-redux';

const NavListLib = () => {
  // redux
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.darkMode);

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
        <Link
          to={'/'}
          className="flex items-center transition-colors hover:text-blue-500"
        >
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to={'/user/all-categories'}
          className="flex items-center transition-colors hover:text-blue-500"
        >
          Categories
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to={'/user/all-activities'}
          className="flex items-center transition-colors hover:text-blue-500"
        >
          Activities
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to={'/user/all-promos'}
          className="flex items-center transition-colors dark:text-red-500 hover:text-blue-500"
        >
          Promos
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <button
          onClick={() => {
            dispatch(toggleMode());
          }}
        >
          {mode.darkMode ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
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

/**
 * 1. toogling pake redux, inisialisai di redux
 * 2. buat slicer di redux untuk membuat fungsi dispatch dan initial value dari theme (dark mode)
 * 3. udah bikin slicer, buat store di redux. store buat nyimpen data redux
 * tambahan: harusnya configurasi slicer dengan localStorage
 * 4. inisialisasi di app.jsx dengan membuat fungsi/useEffect untuk memberikan classname di root element
 * 5. setting tailwind config( darkmode = 'class')
 * 6. buat toogle dan handle event onClick mengarah dispatch dari darkmode
 */
