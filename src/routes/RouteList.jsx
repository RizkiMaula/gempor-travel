import Banner from '../pages/Banner';
import Categories from '../pages/Categories';
import Promos from '../pages/Promos';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Activity from '../pages/Activity';

export const RouteList = [
  {
    path: '/',
    element: <Promos />,
  },
  {
    path: '/activity',
    element: <Activity />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
  {
    path: '/banner',
    element: <Banner />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/promos',
    element: <Promos />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
