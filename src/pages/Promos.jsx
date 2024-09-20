import usePromos from '../hooks/usePromos';

const PromosPage = () => {
  const { promos, loading, error } = usePromos();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Promo</h1>
      <ul>
        {promos?.map((promo, index) => (
          <li key={promo.id}>
            {index + 1}. {promo.title}: {promo.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromosPage;
