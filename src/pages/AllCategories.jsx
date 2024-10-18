import UserLayout from '../components/elements/UserLayout';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import InformationLayout from '../components/elements/InformationLayout';
import InformationCard from '../components/elements/InformationCard';
import { useSelector } from 'react-redux';
import Loading from '../components/elements/Loading';

const AllCategories = () => {
  const { data, loading, error } = useFetch('api/v1/categories');
  // paginate
  const [page, setPage] = useState(0); // simpan halaman yang aktif (di gpt currentData)
  const [filterData, setFilterData] = useState(data?.data || []); // data akan ditampilkan setelah filter data untuk tiap halaman (di gpt data)
  const n = 5; // jumlah maksimal data yang akan ditampilkan ()

  // redux
  const dark = useSelector((state) => state.darkMode);

  // untuk tampilkan halaman awal
  useEffect(() => {
    setFilterData(data?.data?.slice(page, page + n));
  }, [data?.data]);

  useEffect(() => {
    console.log(page);
    setFilterData(data?.data?.slice(page, page + n));
  }, [page]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <UserLayout
      height={'h-110 md:h-[50%]'}
      padding={'pb-10 md:p-10'}
      classname={`${dark.darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <InformationLayout
        title="All Categories"
        loading={loading && <Loading />}
        error={error && <p>Error: {error.message}</p>}
        logic={(filterData || []).map((category, index) => (
          <InformationCard
            key={index}
            indexKey={index}
            title={category.name}
            imageUrl={category.imageUrl}
            moreInfo={`Created At: ${formatDate(category.createdAt)}`}
            directLink={`/user/all-categories/${category.id}`}
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
    </UserLayout>
  );
};
export default AllCategories;
