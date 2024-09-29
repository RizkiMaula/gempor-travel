import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import useDelete from '../hooks/useDelete';
import { useState } from 'react';
import Button from '../components/elements/Button';
import { useNavigate } from 'react-router-dom';
import TableRow from '../components/elements/TableRow';

const Activity = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/activities');
  const { deleteItem } = useDelete('api/v1/delete-activity');
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

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
      <h1>Activity list</h1>

      <Button
        text="add Activity"
        bgColor="bg-blue-500"
        event={() => navigate('/admin/add-activity')}
      />

      <Table
        logic={data?.data?.map((activity) => (
          <TableRow
            key={activity.id}
            name={activity.title}
            createdAt={activity.createdAt}
            updatedAt={activity.updatedAt}
            eventDelete={() => handleDelete(activity.id)}
            eventView={() => navigate(`/admin/activity/${activity.id}`)}
            // nanti dulu
            // eventEdit={}
          />
        ))}
      />
    </div>
  );
};

export default Activity;
