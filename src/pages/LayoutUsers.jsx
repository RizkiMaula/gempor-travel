import { Outlet } from 'react-router-dom';

const LayoutUsers = () => {
  return (
    <>
      <h1>Header</h1>
      <Outlet />
      <h1>Footer</h1>
    </>
  );
};

export default LayoutUsers;
