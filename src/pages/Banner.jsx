import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import useDelete from '../hooks/useDelete';
import { useEffect, useState } from 'react';
import AddPicsModal from '../components/fragmentes/AddPicsModal';
import Button from '../components/elements/Button';
import TableRow from '../components/elements/TableRow';
import usePost from '../hooks/usePost';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import UpdatePicsModal from '../components/fragmentes/UpdatePicsModal';
import useUpdate from '../hooks/useUpdate';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import DetailsPicsModal from '../components/fragmentes/DetailsPicsModal';
import Loading from '../components/elements/Loading';
import useAlert from '../hooks/alerts/useAlert';
import useDeleteAlert from '../hooks/alerts/useDeleteAlert';

const Banner = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/banners');
  const navigate = useNavigate();
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [bannerUpdatedAt, setBannerUpdatedAt] = useState('');
  const [bannerCreatedAt, setBannerCreatedAt] = useState('');

  // hooks Untuk delete
  const { deleteItem } = useDelete('api/v1/delete-banner');
  const [deleteId, setDeleteId] = useState(null);
  const { deleteAlertConfirm, deleteAlertSuccess, deleteAlertReject } = useDeleteAlert();

  // hooks Untuk Create
  const [showModal, setShowModal] = useState(false);
  const { createItem } = usePost('api/v1/create-banner');
  const [bannerName, setBannerName] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [token, setToken] = useLocalStorage('authToken', '');
  const { successAlert, errorAlert } = useAlert();

  // hooks Untuk Update
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [bannerNameUpdate, setBannerNameUpdate] = useState('');
  const [bannerImageUpdate, setBannerImageUpdate] = useState('');
  const [bannerImagePreview, setBannerImagePreview] = useState('');
  const [bannerImageUpdateFile, setBannerImageUpdateFile] = useState(null);
  const { updateItem } = useUpdate('api/v1/update-banner');
  // paginate
  const [page, setPage] = useState(0); // simpan halaman yang aktif (di gpt currentData)
  const [filterData, setFilterData] = useState(data?.data || []); // data akan ditampilkan setelah filter data untuk tiap halaman (di gpt data)
  const n = 5; // jumlah maksimal data yang akan ditampilkan ()

  useEffect(() => {
    setFilterData(data?.data?.slice(page, page + n));
  }, [data?.data]);

  useEffect(() => {
    setFilterData(data?.data?.slice(page, page + n));
  }, [page]);

  // untuk delete
  const handleDelete = async (id) => {
    try {
      const response = await deleteItem(id);
      if (response.status === 'OK') {
        reFetch();
        setDeleteId(null);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleName = (e) => {
    setBannerName(e.target.value);
  };

  const handleImage = (e) => {
    setBannerImage(e.target.value);
    if (e.target.files[0]) {
      setProfilePictureFile(e.target.files[0]);
    }
  };

  const handleNameUpdate = (e) => {
    setBannerNameUpdate(e.target.value);
  };

  const handleImageUpdate = (e) => {
    setBannerImageUpdate(e.target.value);
    if (e.target.files[0]) {
      setBannerImageUpdateFile(e.target.files[0]);
    }
  };

  // Untuk fungsi Add
  const handleAddCategories = async (e) => {
    e.preventDefault();
    try {
      let urlFoto = '';
      if (profilePictureFile) {
        const acceptImage = ['image/'];
        if (!acceptImage.some((item) => profilePictureFile.type.includes(item))) {
          // return alert('Files that are allowed are only of type Image');
          return errorAlert({
            title: 'Oops!',
            text: 'Files that are allowed are only of type Image.',
          });
        }
        if (profilePictureFile?.size > 500 * 1024) {
          // return alert('File size exceeds 500 kb');
          return errorAlert({
            title: 'Oops!',
            text: 'File size exceeds 500 kb.',
          });
        }
        let formData = new FormData();
        formData.append('image', profilePictureFile);
        await axios
          .post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              urlFoto = res.data.url;
            }
          })
          .catch((err) => {
            return errorAlert({
              title: 'Error',
              text: `Failed to upload image. Error: ${err.message}`,
            });
          });
      }

      const bannerData = {
        name: bannerName,
        imageUrl: urlFoto,
      };

      const createdItem = await createItem(bannerData);
      reFetch();
      setShowModal(false);

      successAlert({
        title: 'Success',
        text: createdItem.message,
        timer: 1500,
      });
    } catch (error) {
      errorAlert({
        title: 'Error',
        text: error.message,
      });
    }
  };

  // untuk fungsi update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let urlFoto = '';
      if (bannerImageUpdateFile) {
        const acceptImage = ['image/'];
        if (!acceptImage.some((item) => bannerImageUpdateFile.type.includes(item))) {
          // return alert('Files that are allowed are only of type Image');
          return errorAlert({
            title: 'Error',
            text: 'Files that are allowed are only of type Image.',
          });
        }
        if (bannerImageUpdateFile?.size > 500 * 1024) {
          // return alert('File size exceeds 500 kb');
          return errorAlert({
            title: 'Error',
            text: 'File size exceeds 500 kb',
          });
        }
        let formData = new FormData();
        formData.append('image', bannerImageUpdateFile);
        await axios
          .post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              urlFoto = res.data.url;
            }
          })
          .catch((err) => {
            return errorAlert({
              title: 'Error',
              text: `Failed to upload image. Error: ${err.message}`,
            });
          });
      }

      const bannerData = {
        name: bannerNameUpdate,
      };
      if (urlFoto) {
        bannerData.imageUrl = urlFoto;
      }

      const updatedItem = await updateItem(updateId, bannerData);
      reFetch();
      setShowModalUpdate(false);
      successAlert({
        title: 'Success',
        text: updatedItem.message,
        timer: 1500,
      });
    } catch (error) {
      errorAlert({
        title: 'Error',
        text: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <div className="w-[90%] flex justify-between items-center py-4">
        <h1 className="text-xl md:text-2xl">Banner</h1>
        <Button
          text="Add"
          event={() => setShowModal(true)}
          bgColor="bg-blue-500"
        />
      </div>

      {loading && (
        <Loading
          type="spin"
          color="#0000FF"
          height="10rem"
          width="10rem"
        />
      )}

      {error && (
        <div>
          <h1>{error}</h1>
        </div>
      )}

      {data && (
        <Table
          logic={(filterData || []).map((banner) => (
            <TableRow
              key={banner.id}
              name={banner.name}
              createdAt={banner.createdAt}
              updatedAt={banner.updatedAt}
              eventDelete={() => {
                deleteAlertConfirm({
                  title: 'Delete Banner',
                  text: 'Are you sure you want to delete this banner?',
                  onConfirm: () => {
                    deleteAlertSuccess({
                      text: 'Your banner has been deleted.',
                    });
                    handleDelete(banner.id);
                  },
                  onCancel: () => {
                    deleteAlertReject({
                      text: 'You canceled the deletion!',
                    });
                  },
                });
                // handleDelete(banner.id);
              }}
              eventEdit={() => {
                setShowModalUpdate(true);
                setBannerNameUpdate(banner.name);
                setBannerImagePreview(banner.imageUrl);
                setUpdateId(banner.id);
              }}
              eventView={() => {
                setShowModalDetails(true);
                setBannerNameUpdate(banner.name);
                setBannerImagePreview(banner.imageUrl);
                setBannerUpdatedAt(banner.updatedAt);
                setBannerCreatedAt(banner.createdAt);
                setUpdateId(banner.id);
              }}
            />
          ))}
        />
      )}

      {showModal && (
        <AddPicsModal
          text="Add Banner"
          onHandleName={handleName}
          onHandleImage={handleImage}
          onAddCategory={handleAddCategories}
          onClose={() => setShowModal(false)}
        />
      )}
      {showModalDetails && (
        <DetailsPicsModal
          text="Banner Details"
          categoryValue={bannerNameUpdate}
          imageValue={bannerImagePreview}
          createdAt={bannerCreatedAt}
          updatedAt={bannerUpdatedAt}
          onClose={() => setShowModalDetails(false)}
        />
      )}
      {showModalUpdate && (
        <UpdatePicsModal
          text="Update Banner"
          categoryValue={bannerNameUpdate}
          imageValue={bannerImagePreview}
          onHandleName={handleNameUpdate}
          onHandleImage={handleImageUpdate}
          onUpdateCategory={handleUpdate}
          onClose={() => {
            setShowModalUpdate(false);
            setBannerNameUpdate('');
            setBannerImageUpdate('');
            setBannerImageUpdateFile('');
            setUpdateId(null);
            setBannerImageUpdateFile(null);
          }}
        />
      )}
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

export default Banner;
