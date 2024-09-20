import useCategories from '../hooks/useCategories';

const Categories = () => {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Categories</h1>

      <ul>
        {categories?.map((category, index) => (
          <li key={category.id}>
            {index + 1}. {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
