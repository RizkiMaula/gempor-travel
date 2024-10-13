import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import TableRow from '../components/elements/TableRow';
import useDelete from '../hooks/useDelete';
import { act, useEffect, useState } from 'react';
import Button from '../components/elements/Button';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const PromosPage = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/promos');
  const { deleteItem } = useDelete('api/v1/delete-promo');
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // paginate
  const [page, setPage] = useState(0); // simpan halaman yang aktif (di gpt currentData)
  const [filterData, setFilterData] = useState(data?.data || []); // data akan ditampilkan setelah filter data untuk tiap halaman (di gpt data)
  const n = 5; // jumlah maksimal data yang akan ditampilkan ()

  useEffect(() => {
    setFilterData(data?.data?.slice(page, page + n));
  }, [data?.data]);

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
        logic={(filterData || []).map((promo) => (
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
      />
    </div>
  );
};

export default PromosPage;
