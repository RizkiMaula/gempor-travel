import UserLayout from '../components/elements/UserLayout';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import InformationLayout from '../components/elements/InformationLayout';
import InformationCard from '../components/elements/InformationCard';

const AllActivities = () => {
  const { data: activities, loading: activitiesLoading, error: activitiesError, reFetch: activitiesReFetch } = useFetch('api/v1/activities');

  // paginate
  const [page, setPage] = useState(0); // simpan halaman yang aktif (di gpt currentData)
  const [filterData, setFilterData] = useState(activities?.data || []); // data akan ditampilkan setelah filter data untuk tiap halaman (di gpt data)
  const n = 5; // jumlah maksimal data yang akan ditampilkan ()

  useEffect(() => {
    setFilterData(activities?.data?.slice(page, page + n));
  }, [activities?.data]);

  useEffect(() => {
    console.log(page);
    setFilterData(activities?.data?.slice(page, page + n));
  }, [page]);

  return (
    <UserLayout
      height={'h-110 md:h-[50%]'}
      padding={'pb-10 md:p-10'}
    >
      <InformationLayout
        title="All Activities"
        loading={activitiesLoading && <p>Loading...</p>}
        error={activitiesError && <p>Error: {activitiesError.message}</p>}
        logic={(filterData || []).map((activity, index) => (
          <InformationCard
            key={index}
            indexKey={index}
            title={activity.title}
            description={activity.description}
            imageUrl={activity.imageUrls}
            moreInfo={`City ${activity.city}`}
            directLink={`/user/all-activities/${activity.id}`}
          />
        ))}
      />
      <ReactPaginate
        containerClassName="pagination"
        pageClassName="page-item"
        activeClassName="active"
        onPageChange={(event) => setPage((event.selected * n) % activities?.data?.length || 0)} // event.selected adalah nilai halaman ke berapa (ke-n). event.selected dikali n untuk dapat mengambil data dari halaman ke berapa
        pageCount={Math.ceil((activities?.data?.length || 0) / (n || 1))}
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

export default AllActivities;
