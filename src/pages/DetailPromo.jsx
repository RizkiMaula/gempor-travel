import { useSearchParams, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const DetailPromo = () => {
  let [searchParams] = useSearchParams();
  const [data, setData] = useState([]);

  const { id } = useParams();

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

  if (!data.id) {
    return <h1>Data tidak ditemukan</h1>;
  }

  return (
    <>
      <h1>halaman promo</h1>

      {data && (
        <>
          <p>{data.title}</p>
          <p>{data.description}</p>
          <img
            src={data.imageUrl}
            alt={data.title}
          />
        </>
      )}
    </>
  );
};

export default DetailPromo;
