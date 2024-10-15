import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import DetailedInformationLayout from '../components/elements/DetailedInformationLayout';
import UserLayout from '../components/elements/UserLayout';
import DetailedInformationCard from '../components/elements/DetailedInformationCard';

const DetailBanner = () => {
  const { id } = useParams();
  const [dataBanner, setDataBanner] = useState([]);
  const { loading, error } = useFetch(`api/v1/banner/${id}`);

  const getDataBanner = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${id}`,
      headers: {
        apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      },
    };

    axios
      .request(config)
      .then((response) => {
        setDataBanner(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataBanner();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
        title={`Detail Category ${dataBanner?.name}`}
        logic={
          <DetailedInformationCard
            title={dataBanner?.name}
            content={dataBanner?.description}
            imageUrl={dataBanner?.imageUrl}
            createdAt={`Created At: ${formatDate(dataBanner?.createdAt)}`}
            updatedAt={`Updated At: ${formatDate(dataBanner?.updatedAt)}`}
          />
        }
      />
      <Link to={'/user/all-categories'}>Back</Link>
    </UserLayout>
  );
};

export default DetailBanner;
