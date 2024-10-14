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
import DetailActivity from '../pages/DetailActivity';
import DetailCategory from '../pages/DetailCategory';
import DetailBanner from '../pages/DetailBanner';
import EditActivity from '../pages/EditActivity';
import Profile from '../pages/Profile';
import ProtectedProfile from './ProtectedProfile';
import LayoutLogin from '../pages/LayoutLogin';
import AllPromos from '../pages/AllPromos';
import AllActivities from '../pages/AllActivities';
import AllCategories from '../pages/AllCategories';
import DetailPromoUser from '../pages/DetailPromoUser';

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
    path: '/user',
    element: (
      <ProtectedProfile>
        <LayoutLogin />
      </ProtectedProfile>
    ),
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: 'all-promos',
        element: <AllPromos />,
      },
      {
        path: 'all-promos/:id',
        element: <DetailPromoUser />,
      },
      {
        path: 'all-categories',
        element: <AllCategories />,
      },
      {
        path: 'all-categories/:id',
        element: <DetailCategory />,
      },
      {
        path: 'all-activities',
        element: <AllActivities />,
      },
      {
        path: 'all-activities/:id',
        element: <DetailActivity />,
      },
      {
        path: '*',
        element: <NotFound />,
        errorElement: <NotFound />,
      },
    ],
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
        path: 'banner/:id',
        element: <DetailBanner />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'categories/:id',
        element: <DetailCategory />,
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
        path: 'activity/edit/:id',
        element: <EditActivity />,
      },
      {
        path: 'activity/:id',
        element: <DetailActivity />,
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
        path: 'profile',
        element: <Profile />,
      },
      {
        path: '*',
        element: <NotFound />,
        errorElement: <NotFound />,
      },
    ],
  },
];
