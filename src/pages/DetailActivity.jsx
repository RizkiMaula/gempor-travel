import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import UserLayout from '../components/elements/UserLayout';

const DetailActivity = () => {
  const { id } = useParams();
  const [dataAct, setDataActivity] = useState([]);
  const [role, setRole] = useLocalStorage('role', '');

  console.log(role);

  const getDataActivity = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
      headers: {
        apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.data);
        setDataActivity(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataActivity();
  }, []);

  const getGoogleMapsUsingRegex = (url) => {
    const regex = /<iframe.*?src=['"](.*?)['"].*?>/;
    const match = url?.match(regex);
    if (match) {
      return match[1];
    }
  };

  return (
    <UserLayout
      height={'h-110 md:h-[85%]'}
      padding={'pb-10 md:p-10'}
    >
      <Card className="w-full h-full border-2 border-gray-400 rounded-xl lg:text-xl md:text-[1.2rem] sm:text-[0.9rem]">
        <CardHeader
          floated={false}
          shadow={false}
          color="m-0 rounded-none"
        >
          <img
            src={dataAct?.imageUrls}
            alt={dataAct?.title}
            className="object-cover w-full h-[90%]"
          />
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <Typography
              color="blue-gray"
              className="font-medium"
            >
              {dataAct?.title}
            </Typography>
            <Typography
              color="blue-gray"
              className="font-medium"
            >
              {`Rp. ${dataAct?.price}`}
            </Typography>
          </div>
          <Typography color="gray">{dataAct?.description}</Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-3 font-normal"
          >
            {dataAct?.address}
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-3 font-normal"
          >
            {dataAct?.city}, {dataAct?.province}
          </Typography>
          <iframe
            src={getGoogleMapsUsingRegex(dataAct?.location_maps)}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full rounded-md h-96"
          ></iframe>
        </CardBody>
        <CardFooter>
          <Link to={'/user/all-activities'}>Back</Link>
        </CardFooter>
      </Card>
    </UserLayout>
  );
};

export default DetailActivity;
