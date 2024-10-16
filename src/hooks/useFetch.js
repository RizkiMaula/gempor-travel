import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import axios from 'axios';

const useFetch = (endpoint) => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/${endpoint}`, {
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

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error, reFetch: getData };
};

export default useFetch;
