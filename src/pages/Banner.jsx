import useFetch from '../hooks/useFetch';
import Table from '../components/elements/Table';
import useDelete from '../hooks/useDelete';
import { useState } from 'react';
import AddPicsModal from '../components/fragmentes/AddPicsModal';
import Button from '../components/elements/Button';
import TableRow from '../components/elements/TableRow';
import usePost from '../hooks/usePost';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import UpdatePicsModal from '../components/fragmentes/UpdatePicsModal';

const Banner = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/banners');

  // hooks Untuk delete
  const { deleteItem } = useDelete('api/v1/delete-banner');
  const [deleteId, setDeleteId] = useState(null);

  // hooks Untuk Create
  const [showModal, setShowModal] = useState(false);
  const { createItem } = usePost('api/v1/create-banner');
  const [bannerName, setBannerName] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [token, setToken] = useLocalStorage('authToken', '');

  // hooks Untuk Update
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [bannerNameUpdate, setBannerNameUpdate] = useState('');
  const [bannerImageUpdate, setBannerImageUpdate] = useState('');
  const [bannerImagePreview, setBannerImagePreview] = useState('');
  const [bannerImageUpdateFile, setBannerImageUpdateFile] = useState(null);
  const { updateItem } = usePost('api/v1/update-banner');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // untuk delete
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

  const handleName = (e) => {
    setBannerName(e.target.value);
  };

  const handleImage = (e) => {
    setBannerImage(e.target.value);
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
          return alert('Files that are allowed are only of type Image');
        }
        if (profilePictureFile?.size > 500 * 1024) {
          return alert('File size exceeds 500 kb');
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
            console.log(err);
          });
      }

      const bannerData = {
        name: bannerName,
        imageUrl: urlFoto,
      };

      const createdItem = await createItem(bannerData);
      reFetch();
      setShowModal(false);
      alert(`Success: ${createdItem.message}`);
    } catch (error) {
      console.log(error);
      alert(error.message);
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
          return alert('Files that are allowed are only of type Image');
        }
        if (bannerImageUpdateFile?.size > 500 * 1024) {
          return alert('File size exceeds 500 kb');
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
            console.log(err);
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
      alert(`Success: ${updatedItem.message}`);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h1>Banner</h1>
      <Button
        text="Add"
        event={() => setShowModal(true)}
        bgColor="bg-blue-500"
      />

      <Table
        logic={data?.data?.map((banner) => (
          <TableRow
            key={banner.id}
            name={banner.name}
            createdAt={banner.createdAt}
            updatedAt={banner.updatedAt}
            eventDelete={() => handleDelete(banner.id)}
            eventEdit={() => {
              setShowModalUpdate(true);
              setBannerNameUpdate(banner.name);
              setBannerImagePreview(banner.imageUrl);
              setUpdateId(banner.id);
            }}
            // yang bawah nanti dulu
            // eventView={() => setShowModal(true)}
          />
        ))}
      />

      {showModal && (
        <AddPicsModal
          text="Add Banner"
          onHandleName={handleName}
          onHandleImage={handleImage}
          onAddCategory={handleAddCategories}
          onClose={() => setShowModal(false)}
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
    </div>
  );
};

export default Banner;
