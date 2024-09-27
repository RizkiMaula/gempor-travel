import Banner from '../pages/Banner';
import Categories from '../pages/Categories';
import Promos from '../pages/Promos';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Activity from '../pages/Activity';
import Home from '../pages/Home';
import LayoutAdmin from '../pages/LayoutAdmin';
import LayoutUsers from '../pages/LayoutUsers';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import User from '../pages/Users';
import AddActivity from '../pages/AddActivity';
import AddPromo from '../pages/AddPromo';
import DetailPromo from '../pages/DetailPromo';

export const RouteList = [
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/',
    element: <LayoutUsers />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'banner',
        element: <Banner />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'promos',
        element: <Promos />,
      },
      {
        path: 'promos/:id',
        element: <DetailPromo />,
      },
      {
        path: 'activity',
        element: <Activity />,
      },
      {
        path: 'add-activity',
        element: <AddActivity />,
      },
      {
        path: 'add-promo',
        element: <AddPromo />,
      },
      {
        path: 'users',
        element: <User />,
      },
      {
        path: '*',
        element: <NotFound />,
        errorElement: <NotFound />,
      },
    ],
  },
];
