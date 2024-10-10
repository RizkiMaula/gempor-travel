import useFetch from '../../hooks/useFetch';

const ProperCarousel = ({ slides }) => {
  const { data, loading, error } = useFetch('api/v1/banners');

  console.log(data.data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-center w-full h-full">
        {data?.data?.map((v, i) => (
          <img
            key={i}
            src={v.imageUrl}
            alt={v.title}
            className="w-[100%] h-[100%] object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default ProperCarousel;
