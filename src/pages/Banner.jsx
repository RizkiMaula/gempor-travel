import useFetch from '../hooks/useFetch';

const Banner = () => {
  const { data, loading, error } = useFetch('api/v1/banners');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1>Banner</h1>
      <ul>
        {data?.data?.map((banner, index) => (
          <li key={banner.id}>
            {index + 1}. {banner.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Banner;
