import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import useDelete from '../hooks/useDelete';
import { useState } from 'react';
import AddPicsModal from '../components/fragmentes/AddPicsModal';
import Button from '../components/elements/Button';
import TableRow from '../components/elements/TableRow';

const Categories = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/categories');
  const { deleteItem } = useDelete('api/v1/delete-category');
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDelete = async (id) => {
    setDeleteId(id);

    try {
      const response = await deleteItem(id);
      if (response.status === 'OK') {
        const confirmed = window.confirm('Are You Sure?');
        if (confirmed) {
          alert('deleted');
          reFetch();
          setDeleteId(null);
        }
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const cobaConfirm = () => {
    const confirmed = window.confirm('Are You Sure?');
    if (confirmed) {
      console.log('benar');
    } else {
      console.log('salah');
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h1>Categories</h1>

      <Button
        text="coba confirm"
        event={cobaConfirm}
        bgColor="bg-blue-500"
      />

      <Button
        text="Add"
        event={() => setShowModal(true)}
        bgColor="bg-blue-500"
      />

      <Table
        logic={data?.data?.map((category) => (
          <TableRow
            key={category.id}
            name={category.name}
            createdAt={category.createdAt}
            updatedAt={category.updatedAt}
            eventDelete={() => handleDelete(category.id)}
            // yang bawah nanti dulu
            // eventEdit={() => setShowModal(true)}
            // eventView={() => setShowModal(true)}
          />
        ))}
      />

      {showModal && <AddPicsModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Categories;
