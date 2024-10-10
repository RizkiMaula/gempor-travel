import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import TableRow from '../components/elements/TableRow';
import useDelete from '../hooks/useDelete';
import { act, useState } from 'react';
import Button from '../components/elements/Button';
import { Link, useNavigate } from 'react-router-dom';

const PromosPage = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/promos');
  const { deleteItem } = useDelete('api/v1/delete-promo');
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

      <Button
        text="add Pomo"
        bgColor="bg-blue-500"
        event={() => navigate('/admin/add-promo')}
      />

      <Table
        logic={data?.data?.map((promo) => (
          <TableRow
            key={promo.id}
            name={promo.title}
            createdAt={promo.createdAt}
            updatedAt={promo.updatedAt}
            eventDelete={() => handleDelete(promo.id)}
            eventView={() => navigate(`/admin/promos/${promo.id}`)}
            eventEdit={() => navigate(`/admin/promos/${promo.id}?edit=true`)}
          />
        ))}
      />
    </div>
  );
};

export default PromosPage;
