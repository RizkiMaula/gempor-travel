import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetById from '../hooks/useGetById';

// eslint-disable-next-line react/prop-types
const DetailCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { data, loading, error, getDataById } = useGetById('api/v1/activity');
  // const { data, loading, error, getDataById } = useGetById('api/v1/category');
  const [data, setData] = useState(null);

  console.log(data);
  console.log(id);

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
        console.log(response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataCategory();
  }, []);

  return (
    <div>
      <h1>Detail Category</h1>

      <div>
        <h1>{data?.name}</h1>
        <p>{data?.createdAt}</p>
        <p>{data?.updatedAt}</p>
        <img
          src={data?.imageUrl}
          alt={data?.name}
        />
      </div>

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default DetailCategory;
