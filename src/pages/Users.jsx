import useFetch from '../hooks/useFetch';

const User = () => {
  const { data, loading, error } = useFetch('api/v1/all-user');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User</h1>
      <ul>
        {data?.data?.map((user, index) => (
          <li key={user.id}>
            {index + 1}. {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
