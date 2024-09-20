import axios from 'axios';
import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

const useGetById = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useLocalStorage('authToken', '');

  const getDataById = async (id) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/${endpoint}/${id}`, {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getDataById,
  };
};

export default useGetById;
