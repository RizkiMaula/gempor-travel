import axios from 'axios';
import { useEffect, useState } from 'react';

const usePromos = () => {
  const [promos, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromo = async () => {
    try {
      const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', {
        headers: {
          apikey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log(response.data.data);
      setPromo(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  return { promos, loading, error };
};

export default usePromos;
