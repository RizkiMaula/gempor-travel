import { useSearchParams, useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '../components/elements/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import UserLayout from '../components/elements/UserLayout';
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';

const DetailPromoUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const getDataPromo = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
      headers: {
        apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      },
    };

    axios
      .request(config)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataPromo();
  }, []);

  console.log(data);

  return (
    // <div>
    //   <h1>Detail promo</h1>
    //   {data && (
    //     <div>
    //       <p>name: {data.title}</p>
    //       <p>description: {data.description}</p>
    //       <p>start_date: {data.createdAt}</p>
    //       <p>end_date: {data.updatedAt}</p>
    //       <img
    //         src={data.imageUrl}
    //         alt={data.title}
    //       />
    //     </div>
    //   )}
    //   <Link to={'/user/all-promos'}>Back</Link>
    // </div>
    <Card className="w-full h-full border-2 border-gray-400 rounded-xl lg:text-xl md:text-[1.2rem] sm:text-[0.9rem]">
      <CardHeader
        floated={false}
        shadow={false}
        color="m-0 rounded-none"
      >
        <img
          src={data?.imageUrl}
          alt={data?.title}
          className="object-cover w-full h-[90%]"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography
            color="blue-gray"
            className="font-medium"
          >
            {data?.title}
          </Typography>
          <Typography
            color="blue-gray"
            className="font-medium"
          >
            {`${data?.promo_code}`}
          </Typography>
        </div>
        <Typography color="gray">{data?.description}</Typography>
        <Typography
          color="blue-gray"
          className="font-medium"
        >
          {`Promo Discount: Rp. ${data?.promo_discount_price}`}
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mt-3 font-normal"
        >
          Terms and Conditions: {data?.terms_condition}
        </Typography>
      </CardBody>
      <CardFooter>
        <Link to={'/user/all-promos'}>Back</Link>
      </CardFooter>
    </Card>
  );
};

export default DetailPromoUser;
