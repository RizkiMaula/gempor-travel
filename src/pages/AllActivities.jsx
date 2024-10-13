import UserLayout from '../components/elements/UserLayout';
import { Avatar, Card, CardBody, CardFooter, CardHeader, Tooltip, Typography } from '@material-tailwind/react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

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

  console.log(activities?.data);

  return (
    <UserLayout
      classname={'border-2 border-black'}
      height={'h-110 md:h-[50%]'}
      padding={'pb-10 md:p-10'}
    >
      <h1 className="text-sm text-center sm:text-xl md:text-2xl">All Activities</h1>
      <div className="w-full h-[50%] border-2 border-green-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {activitiesLoading && <p>Loading...</p>}
        {activitiesError && <p>Error: {activitiesError.message}</p>}
        {(filterData || []).map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-center"
          >
            <Card
              key={index}
              className="max-w-[24rem] overflow-hidden "
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  src={activity.imageUrls}
                  alt="ui/ux review check"
                  className="object-cover w-full h-[23rem]"
                />
              </CardHeader>
              <CardBody>
                <Typography
                  variant="h4"
                  color="blue-gray"
                >
                  {activity.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal truncate"
                >
                  {activity.description}
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center -space-x-3">
                  <Typography className="font-normal">City: {activity.city}</Typography>
                </div>
                <Typography className="font-normal">
                  <Link>See More</Link>
                </Typography>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
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
