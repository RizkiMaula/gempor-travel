import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

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

  const dateFormater = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Detail Banner</h1>

      <p>{dataBanner?.name}</p>
      <img
        src={dataBanner?.imageUrl}
        alt={dataBanner?.name}
      />
      <div>
        <p>{dateFormater(dataBanner?.createdAt)}</p>
        <p>{dateFormater(dataBanner?.updatedAt)}</p>
      </div>

      <Link to="/admin/banner">Back to Banner</Link>
    </div>
  );
};

export default DetailBanner;
