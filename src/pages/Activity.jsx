import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import useDelete from '../hooks/useDelete';
import { useEffect, useState } from 'react';
import Button from '../components/elements/Button';
import { useNavigate } from 'react-router-dom';
import TableRow from '../components/elements/TableRow';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const Activity = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/activities');
  const { deleteItem } = useDelete('api/v1/delete-activity');
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // paginate
  const [page, setPage] = useState(0); // simpan halaman yang aktif (di gpt currentData)
  const [filterData, setFilterData] = useState(data?.data || []); // data akan ditampilkan setelah filter data untuk tiap halaman (di gpt data)
  const n = 5; // jumlah maksimal data yang akan ditampilkan ()

  useEffect(() => {
    console.log(page);
    setFilterData(data?.data?.slice(page, page + n));
  }, [page]);

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
        logic={(filterData || []).map((activity) => (
          <TableRow
            key={activity.id}
            name={activity.title}
            createdAt={activity.createdAt}
            updatedAt={activity.updatedAt}
            eventDelete={() => handleDelete(activity.id)}
            eventView={() => navigate(`/admin/activity/${activity.id}`)}
            eventEdit={() => navigate(`../activity/edit/${activity.id}`)}
          />
        ))}
      />

      <ReactPaginate
        containerClassName="pagination"
        pageClassName="page-item"
        activeClassName="active"
        onPageChange={(event) => setPage((event.selected * n) % data?.data?.length || 0)} // event.selected adalah nilai halaman ke berapa (ke-n). event.selected dikali n untuk dapat mengambil data dari halaman ke berapa
        pageCount={Math.ceil((data?.data?.length || 0) / (n || 1))}
        breakLabel="..."
        previousLabel={
          <IconContext.Provider value={{ size: '1.5em', color: 'blue' }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ size: '1.5em', color: 'blue' }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }
        // forcePage={page}
      />
    </div>
  );
};

export default Activity;
