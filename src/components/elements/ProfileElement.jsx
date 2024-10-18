import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProfileElement = ({ event }) => {
  const { data, loading, error } = useFetch('api/v1/user');
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || data?.data?.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <Menu as="div">
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
        <img
          src={data?.data?.profilePictureUrl}
          alt=""
          className="w-5 h-5 rounded-full"
        />{' '}
        <p>{data?.data?.name}</p>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-blue-gray-300"
      >
        <MenuItem className="rounded-lg py-1.5 px-3 bg-black dark:bg-blue-gray-300">
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            onClick={() => navigate('/user')}
          >
            Profile
          </button>
        </MenuItem>
        <MenuItem className="rounded-lg py-1.5 px-3 bg-black dark:bg-blue-gray-300">
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            onClick={event}
          >
            Logout
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileElement;
