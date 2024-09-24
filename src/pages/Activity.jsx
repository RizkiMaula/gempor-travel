import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import useDelete from '../hooks/useDelete';
import { useState } from 'react';

const Activity = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/activities');
  const { deleteItem } = useDelete('api/v1/delete-activity');
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
    // handle delete logic here
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
      <h1>Activity list</h1>

      <Table
        logic={data?.data?.map((activity) => (
          <tr
            key={activity.id}
            className="text-center"
          >
            <td className="border-b-2">{activity.title}</td>
            <td className="border-b-2">{formatDate(activity.createdAt)}</td>
            <td className="border-b-2">{formatDate(activity.updatedAt)}</td>
            <td className="flex justify-center gap-2 border-b-2">
              <button>Details</button>
              <button>Edit</button>
              <button onClick={() => handleDelete(activity.id)}>Delete</button>
            </td>
          </tr>
        ))}
      />
    </div>
  );
};

export default Activity;
