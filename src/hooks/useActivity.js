import axios from 'axios';
import { useEffect, useState } from 'react';

const useActivity = () => {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivity = async () => {
    try {
      const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities', {
        headers: {
          apikey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log(response.data.data);
      setActivity(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return { activity, loading, error };
};

export default useActivity;
