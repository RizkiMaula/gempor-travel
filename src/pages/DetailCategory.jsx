import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import InformationLayout from '../components/elements/InformationLayout';
import InformationCard from '../components/elements/InformationCard';
import UserLayout from '../components/elements/UserLayout';
import DetailedInformationCard from '../components/elements/DetailedInformationCard';
import DetailedInformationLayout from '../components/elements/DetailedInformationLayout';

// eslint-disable-next-line react/prop-types
const DetailCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [role, setRole] = useLocalStorage('role', '');

  const getDataCategory = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`,
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

  console.log(data);

  useEffect(() => {
    getDataCategory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <UserLayout
      height={'h-110 md:h-full'}
      padding={'pb-10 md:p-10'}
    >
      <DetailedInformationLayout
        title={`Detail Category ${data?.name}`}
        logic={
          <DetailedInformationCard
            title={data?.name}
            content={data?.description}
            imageUrl={data?.imageUrl}
            createdAt={`Created At: ${formatDate(data?.createdAt)}`}
            updatedAt={`Updated At: ${formatDate(data?.updatedAt)}`}
          />
        }
      />
      <Link to={'/user/all-categories'}>Back</Link>
    </UserLayout>
  );
};

export default DetailCategory;
