import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import useDelete from '../hooks/useDelete';
import { useEffect, useState } from 'react';
import AddPicsModal from '../components/fragmentes/AddPicsModal';
import UpdatePicsModal from '../components/fragmentes/UpdatePicsModal';
import Button from '../components/elements/Button';
import TableRow from '../components/elements/TableRow';
import usePost from '../hooks/usePost';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import useUpdate from '../hooks/useUpdate';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import DetailsPicsModal from '../components/fragmentes/DetailsPicsModal';
import { useSelector } from 'react-redux';
import Loading from '../components/elements/Loading';
import useAlert from '../hooks/alerts/useAlert';
import useDeleteAlert from '../hooks/alerts/useDeleteAlert';

const Categories = () => {
  // Redux
  const dark = useSelector((state) => state.darkMode);
  const { data, loading, error, reFetch } = useFetch('api/v1/categories');
  const navigate = useNavigate();
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [categoryCreatedAt, setCategoryCreatedAt] = useState('');
  const [categoryUpdatedAt, setCategoryUpdatedAt] = useState('');

  // Hooks Untuk Create
  const [showModal, setShowModal] = useState(false);
  const { createItem } = usePost('api/v1/create-category');
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [token, setToken] = useLocalStorage('authToken', '');
  const { successAlert, errorAlert } = useAlert();

  // Hooks Untuk delete
  const { deleteItem } = useDelete('api/v1/delete-category');
  const [deleteId, setDeleteId] = useState(null);
  const { deleteAlertConfirm, deleteAlertSuccess, deleteAlertError, deleteAlertReject } = useDeleteAlert();

  // Hooks untuk update
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [categoryNameUpdate, setCategoryNameUpdate] = useState('');
  const [categoryImageUpdate, setCategoryImageUpdate] = useState('');
  const [categoryImagePreview, setCategoryImagePreview] = useState('');
  const [categoryImageUpdateFile, setCategoryImageUpdateFile] = useState(null);
  const { updateItem } = useUpdate('api/v1/update-category');

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

  // Untuk fungsi Delete
  const handleDelete = async (id) => {
    try {
      const response = await deleteItem(id);
      if (response.status === 'OK') {
        reFetch();
        setDeleteId(null);
      }
    } catch (error) {
      return errorAlert({ title: 'Oops!', text: error.message });
    }
  };
  // buat handle input nama di modal nanti
  const handleName = (e) => {
    setCategoryName(e.target.value);
  };
  // buat handle input image di modal nanti
  const handleImage = (e) => {
    setCategoryImage(e.target.value);
  };

  const handleNameUpdate = (e) => {
    setCategoryNameUpdate(e.target.value);
  };

  const handleImageUpdate = (e) => {
    setCategoryImageUpdate(e.target.value);
    if (e.target.files[0]) {
      setCategoryImageUpdateFile(e.target.files[0]);
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
              title: 'Oops!',
              text: `Failed to upload image. ${err.message}`,
            });
          });
      }

      const bannerData = {
        name: categoryName,
        imageUrl: urlFoto,
      };

      const createdItem = await createItem(bannerData);
      reFetch();
      setShowModal(false);
      // alert(`Success: ${createdItem.message}`);
      successAlert({
        title: 'Success',
        text: createdItem.message,
        timer: 1500,
      });
    } catch (error) {
      // alert(error.message);
      errorAlert({
        title: 'Error',
        text: error.message,
      });
    }
  };

  // Untuk fungsi Update
  const handleUpdateCategories = async (e) => {
    e.preventDefault();

    try {
      let urlFoto = '';
      if (categoryImageUpdateFile) {
        const acceptImage = ['image/'];
        if (!acceptImage.some((item) => categoryImageUpdateFile.type.includes(item))) {
          // return alert('Files that are allowed are only of type Image');
          return errorAlert({
            title: 'Oops!',
            text: 'Files that are allowed are only of type Image.',
          });
        }
        if (categoryImageUpdateFile?.size > 500 * 1024) {
          // return alert('File size exceeds 500 kb');
          return errorAlert({
            title: 'Oops!',
            text: 'File size exceeds 500 kb.',
          });
        }
        let formData = new FormData();
        formData.append('image', categoryImageUpdateFile);
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
            return alert('Failed to upload image');
          });
      }

      const bannerData = {
        name: categoryNameUpdate,
      };
      if (urlFoto) {
        bannerData.imageUrl = urlFoto;
      }

      const createdItem = await updateItem(updateId, bannerData);
      reFetch();
      setShowModalUpdate(false);
      alert(`Success: ${createdItem.message}`);
    } catch (error) {
      return errorAlert({ title: 'Error', text: `Error: ${error.message}` });
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <div className="w-[90%] flex justify-between items-center py-4">
        <h1 className="text-xl md:text-2xl">Categories</h1>
        <Button
          text="Add"
          event={() => setShowModal(true)}
          bgColor="bg-blue-500"
        />
      </div>

      {loading && <Loading />}

      {error && <div>Error: {error.message}</div>}

      <Table
        column1="Nama"
        logic={(filterData || []).map((category) => (
          <TableRow
            key={category.id}
            name={category.name}
            createdAt={category.createdAt}
            updatedAt={category.updatedAt}
            eventDelete={() => {
              deleteAlertConfirm({
                title: 'Delete Category',
                text: 'Are you sure you want to delete this category?',
                onConfirm: () => {
                  deleteAlertSuccess({
                    text: 'Your category has been deleted.',
                  });
                  handleDelete(category.id);
                },
                onCancel: () => {
                  deleteAlertError({
                    text: 'Your category has not been deleted.',
                  });
                },
              });
            }}
            eventEdit={() => {
              setShowModalUpdate(true);
              setCategoryNameUpdate(category.name);
              setCategoryImagePreview(category.imageUrl);
              setUpdateId(category.id);
            }}
            eventView={() => {
              setShowModalDetails(true);
              setCategoryNameUpdate(category.name);
              setCategoryImagePreview(category.imageUrl);
              setCategoryCreatedAt(category.createdAt);
              setCategoryUpdatedAt(category.updatedAt);
              setUpdateId(category.id);
            }}
          />
        ))}
      />
      {showModal && (
        <AddPicsModal
          text="Add Category"
          onHandleName={handleName}
          onHandleImage={handleImage}
          onAddCategory={handleAddCategories}
          onClose={() => setShowModal(false)}
        />
      )}
      {showModalDetails && (
        <DetailsPicsModal
          text="Category Details"
          categoryValue={categoryNameUpdate}
          imageValue={categoryImagePreview}
          createdAt={categoryCreatedAt}
          updatedAt={categoryUpdatedAt}
          onClose={() => setShowModalDetails(false)}
        />
      )}
      {showModalUpdate && (
        <UpdatePicsModal
          text="Update Category"
          categoryValue={categoryNameUpdate}
          imageValue={categoryImagePreview}
          onHandleName={handleNameUpdate}
          onHandleImage={handleImageUpdate}
          onUpdateCategory={handleUpdateCategories}
          onClose={() => {
            setShowModalUpdate(false);
            setCategoryNameUpdate('');
            setCategoryImageUpdate('');
            setCategoryImageUpdateFile('');
            setUpdateId(null);
            setCategoryImageUpdateFile(null);
          }}
        />
      )}

      <ReactPaginate
        containerClassName="pagination"
        pageClassName="page-item"
        activeClassName={`${dark ? 'dark-active' : 'active'}`}
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

export default Categories;
