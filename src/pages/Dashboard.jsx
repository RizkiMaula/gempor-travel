import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import useFetch from '../hooks/useFetch';
import Loading from '../components/elements/Loading';

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
      <Card className="col-span-4 mt-6 md:col-span-2 lg:col-span-1">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
          >
            Total Users
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {loadingUsers && (
            <Loading
              width="1rem"
              height="1rem"
            />
          )}
          {users?.data?.length}
        </CardFooter>
      </Card>
      <Card className="col-span-4 mt-6 md:col-span-2 lg:col-span-1">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
          >
            Total Categories
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {loadingCategories && (
            <Loading
              width="1rem"
              height="1rem"
            />
          )}
          {categories?.data?.length}
        </CardFooter>
      </Card>
      <Card className="col-span-4 mt-6 md:col-span-2 lg:col-span-1">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
          >
            Total Activities
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {loadingActivities && (
            <Loading
              width="1rem"
              height="1rem"
            />
          )}
          {activities?.data?.length}
        </CardFooter>
      </Card>
      <Card className="col-span-4 mt-6 md:col-span-2 lg:col-span-1">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
          >
            Total promos
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {loadingPromos && (
            <Loading
              width="1rem"
              height="1rem"
            />
          )}
          {promos?.data?.length}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
