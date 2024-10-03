import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const NavbarUser = () => {
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
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
