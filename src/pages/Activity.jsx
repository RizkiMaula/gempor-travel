import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const Activity = () => {
  const { data, loading, error } = useFetch('api/v1/activities');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1>Activity list</h1>

      <ul>
        {data?.data?.map((act, index) => (
          <li key={act.id}>
            {index + 1}. {act.title}: <Link to={`/activities/${act.id}`}>More Information</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Activity;
