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

const Banner = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/banners');
  const { deleteItem } = useDelete('api/v1/delete-banner');
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Untuk fungsi Create
  const { createItem } = usePost('api/v1/create-banner');
  const [bannerName, useBannerName] = useState('');
  const [bannerImage, useBannerImage] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [token, setToken] = useLocalStorage('authToken', '');

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
    useBannerName(e.target.value);
  };

  const handleImage = (e) => {
    useBannerImage(e.target.value);
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
              urlFoto = res.data.data.imageUrl;
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
            // yang bawah nanti dulu
            // eventEdit={() => setShowModal(true)}
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
    </div>
  );
};

export default Banner;
