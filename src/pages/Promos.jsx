import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import useDelete from '../hooks/useDelete';
import { useState } from 'react';

const PromosPage = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/promos');
  const { deleteItem } = useDelete('api/v1/delete-promo');
  const [deleteId, setDeleteId] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are You Sure?');
    if (!confirmed) {
      setDeleteId(null);
      return;
    }
    try {
      const response = await deleteItem(id);
      if (response.status === 'OK') {
        reFetch();
        setDeleteId(null);
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h1>Promo</h1>

      <Table
        logic={data?.data?.map((promo) => (
          <tr
            key={promo?.id}
            className="text-center"
          >
            <td className="border-b-2">{promo?.title}</td>
            <td className="border-b-2">{formatDate(promo.createdAt)}</td>
            <td className="border-b-2">{formatDate(promo.updatedAt)}</td>
            <td className="flex justify-center gap-2 border-b-2">
              <button>Details</button>
              <button>Edit</button>
              <button onClick={() => handleDelete(promo.id)}>Delete</button>
            </td>
          </tr>
        ))}
      />
    </div>
  );
};

export default PromosPage;
