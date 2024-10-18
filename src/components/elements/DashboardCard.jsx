import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';

// eslint disable-next-line react/prop-types
const DashboardCard = ({ total, title, loading }) => {
  return (
    <Card className="col-span-4 mt-6 md:col-span-2 lg:col-span-1">
      <CardBody>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
        >
          {title}
          {loading}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">{total}</CardFooter>
    </Card>
  );
};

export default DashboardCard;
