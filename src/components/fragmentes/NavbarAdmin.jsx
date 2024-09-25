import { Link } from 'react-router-dom';

const NavbarAdmin = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      <Link to="/">
        <h1 className="text-xl font-bold">Home</h1>
      </Link>
      <Link to="/admin/activity">
        <h1 className="text-xl font-bold">Activities</h1>
      </Link>
      <Link to="/admin/banner">
        <h1 className="text-xl font-bold">Banner</h1>
      </Link>
      <Link to="/admin/categories">
        <h1 className="text-xl font-bold">Categories</h1>
      </Link>
      <Link to="/admin/promos">
        <h1 className="text-xl font-bold">Promo</h1>
      </Link>
    </nav>
  );
};

export default NavbarAdmin;
