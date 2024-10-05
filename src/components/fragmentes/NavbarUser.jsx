import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavbarUser = () => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [role, setRole] = useLocalStorage('role', '');
  const navigate = useNavigate();

  console.log(`token: ${token} role: ${role}`);

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
    <div className="w-full bg-black h-[7rem] top-0 absolute flex flex-col items-center justify-center">
      <div className="w-[88%] rounded-[8px] flex flex-col gap-9 justify-center items-center bg-white h-[70%]">
        <div className="w-[97%] flex justify-between items-center">
          <h1>Navbar User</h1>
          <ul className="flex gap-9">
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <select
                name=""
                id=""
              >
                <option value="">item 1</option>
                <option value="">item 2</option>
                <option value="">item 3</option>
                <option value="">item 4</option>
                <option value="">item 5</option>
              </select>
            </li>
            <li>
              <a href="#">Forum</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
          <div className="flex gap-9">
            <button>
              <FontAwesomeIcon icon={faMoon} />
            </button>
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
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
