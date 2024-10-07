import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/elements/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import usePost from '../hooks/usePost';

const Profile = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/user');
  const [token, setToken] = useLocalStorage('authToken', '');
  const [role, setRole] = useLocalStorage('role', '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePictureName, setProfilePictureName] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const { createItem } = usePost('api/v1/update-profile');
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    phoneNumber,
    profilePictureUrl: '',
  });
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // upload image
      let urlfoto = '';
      if (profilePictureFile) {
        const acceptImage = ['image/'];
        if (!acceptImage.some((item) => profilePictureFile.type.includes(item))) {
          return alert('Files that are allowed are only of type Image');
        }
        if (profilePictureFile?.size > 500 * 1024) {
          return alert('File size exceeds 500 kb');
        }
        const formData = new FormData();
        formData.append('image', profilePictureFile);
        await axios
          .post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              urlfoto = response?.data?.url;
              console.log(urlfoto);
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      }
      // update profile pake useCreate
      const data = {
        name: formData?.name,
        email: formData?.email,
        phoneNumber: formData?.phoneNumber,
        profilePictureUrl: urlfoto,
      };
      const response = await createItem(data);
      console.log(data);
      alert(response.message);
      reFetch();
      formData.name = '';
      formData.email = '';
      formData.phoneNumber = '';
      formData.profilePictureUrl = '';
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  console.log(data.data);

  return (
    <div className="flex justify-center border-2 border-black">
      <div className="flex flex-col items-center justify-center w-1/3 gap-2 border-2 border-red-500">
        <h1>Profile</h1>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}

        {data.data && (
          <div className="flex flex-col items-center gap-2">
            <img
              src={data.data.profilePictureUrl}
              alt={data.data.name}
              className="w-[100px] h-[100px] rounded-full"
            />
            <p>Name: {data.data.name}</p>
            <p>Email: {data.data.email}</p>
            <p>Phone Number: {data.data.phoneNumber}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center w-2/3 gap-2 border-2 border-blue-500">
        <h1>Edit Profile</h1>
        <form className="flex flex-col gap-2 border-2 border-black w-[85%] p-5">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="p-3 border-2 border-black rounded"
            placeholder="Put Your Name Here"
            value={formData.name}
            onChange={(e) => setFromData({ ...formData, name: e.target.value })}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="p-3 border-2 border-black rounded"
            placeholder="Put Your Email Here"
            value={formData.email}
            onChange={(e) => setFromData({ ...formData, email: e.target.value })}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            className="p-3 border-2 border-black rounded"
            placeholder="Put Your Phone Number Here"
            value={formData.phoneNumber}
            onChange={(e) => setFromData({ ...formData, phoneNumber: e.target.value })}
          />
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            onChange={(e) => {
              setProfilePictureName(e.target.files[0].name);
              setProfilePictureFile(e.target.files[0]);
            }}
          />
        </form>

        <Button
          text="Save"
          bgColor="bg-blue-500"
          event={handleUpdateProfile}
        />

        {role === 'admin' && (
          <Button
            text="Dashboard"
            bgColor="bg-red-500"
            event={() => navigate('/admin')}
          />
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
