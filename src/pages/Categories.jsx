import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import useDelete from '../hooks/useDelete';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddPicsModal from '../components/fragmentes/AddPicsModal';

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDelete = async (id) => {
    setDeleteId(id);

    try {
      const response = await deleteItem(id);
      if (response.status === 'OK') {
        confirm('Are You Sure?');
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
      <h1>Categories</h1>

      <button
        className="px-4 py-1 text-white bg-blue-500"
        onClick={() => setShowModal(true)}
      >
        Add
      </button>

      <Table
        logic={data?.data?.map((category) => (
          <tr
            key={category.id}
            className="text-center"
          >
            <td className="border-b-2">{category.name}</td>
            <td className="border-b-2">{formatDate(category.createdAt)}</td>
            <td className="border-b-2">{formatDate(category.updatedAt)}</td>
            <td className="flex justify-center gap-2 border-b-2">
              <button>
                <FontAwesomeIcon icon={faCircleInfo} />
              </button>
              <button>
                <FontAwesomeIcon icon={faFilePen} />
              </button>
              <button onClick={() => handleDelete(category.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      />

      {showModal && <AddPicsModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Categories;
