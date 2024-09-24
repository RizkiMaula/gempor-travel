import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import useDelete from '../hooks/useDelete';
import { useState } from 'react';

const Banner = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/banners');
  const { deleteItem } = useDelete('api/v1/delete-banner');
  const [deleteId, setDeleteId] = useState(null);

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
        confirm('Are You Sure?');
        reFetch();
        setDeleteId(null);
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h1>Banner</h1>
      <Table
        logic={data?.data?.map((banner) => (
          <tr
            key={banner.id}
            className="text-center"
          >
            <td className="border-b-2">{banner.name}</td>
            <td className="border-b-2">{formatDate(banner.createdAt)}</td>
            <td className="border-b-2">{formatDate(banner.updatedAt)}</td>
            <td className="flex justify-center gap-2 border-b-2">
              <button>Details</button>
              <button>Edit</button>
              <button onClick={() => handleDelete(banner.id)}>Delete</button>
            </td>
          </tr>
        ))}
      />
    </div>
  );
};

export default Banner;
