import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import useFetch from '../hooks/useFetch';
import Loading from '../components/elements/Loading';
import DashboardCard from '../components/elements/DashboardCard';

const Dashboard = () => {
  const { data: users, loading: loadingUsers, error: errorUsers, reFetch: reFetchUsers } = useFetch('api/v1/all-user');
  const { data: categories, loading: loadingCategories, error: errorCategories, reFetch: reFetchCategories } = useFetch('api/v1/categories');
  const { data: activities, loading: loadingActivities, error: errorActivities, reFetch: reFetchActivities } = useFetch('api/v1/activities');
  const { data: promos, loading: loadingPromos, error: errorPromos, reFetch: reFetchPromos } = useFetch('api/v1/promos');

  console.log(users?.data?.length);
  console.log(categories?.data?.length);
  console.log(activities?.data?.length);
  console.log(promos?.data?.length);

  return (
    <div className="grid grid-cols-4 gap-4 px-10 pt-20 md:pt-0">
      <DashboardCard
        title="Total Users"
        loading={
          loadingUsers && (
            <Loading
              width="1rem"
              height="1rem"
            />
          )
        }
        total={users?.data?.length}
      />
      <DashboardCard
        title="Total Category"
        loading={
          loadingUsers && (
            <Loading
              width="1rem"
              height="1rem"
            />
          )
        }
        total={categories?.data?.length}
      />
      <DashboardCard
        title="Total Promos"
        loading={
          loadingUsers && (
            <Loading
              width="1rem"
              height="1rem"
            />
          )
        }
        total={promos?.data?.length}
      />
      <DashboardCard
        title="Total Activities"
        loading={
          loadingUsers && (
            <Loading
              width="1rem"
              height="1rem"
            />
          )
        }
        total={activities?.data?.length}
      />
    </div>
  );
};

export default Dashboard;
