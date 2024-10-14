import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const DetailedInformationCard = ({ indexKey, indexKeyCard, imageUrl, title, description, createdAt, updatedAt }) => {
  return (
    <div
      key={indexKey}
      className="flex items-center justify-center"
    >
      <Card
        key={indexKeyCard}
        className="max-w-[24rem] overflow-hidden "
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src={imageUrl}
            alt="ui/ux review check"
            className="object-cover w-full h-[23rem]"
          />
        </CardHeader>
        <CardBody>
          <Typography
            variant="h4"
            color="blue-gray"
          >
            {title}
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-3 font-normal truncate"
          >
            {description}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center -space-x-3">
            <Typography className="font-normal text-xs">{createdAt}</Typography>
          </div>
          <Typography className="font-normal text-xs">{updatedAt}</Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DetailedInformationCard;
