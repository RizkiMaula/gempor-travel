import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/elements/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import usePost from '../hooks/usePost';
import { useSelector } from 'react-redux';
import useAlert from '../hooks/alerts/useAlert';

const Profile = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/user');
  const [token, setToken] = useLocalStorage('authToken', '');
  const [role, setRole] = useLocalStorage('role', '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePictureName, setProfilePictureName] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const { createItem } = usePost('api/v1/update-profile');
  const { successAlert, errorAlert } = useAlert();
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    phoneNumber,
    profilePictureUrl: '',
  });
  const navigate = useNavigate();
  // Redux
  const dark = useSelector((state) => state.darkMode);

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
      // alert(response.message);
      successAlert({ title: 'Success', text: response.message });
      reFetch();
      formData.name = '';
      formData.email = '';
      formData.phoneNumber = '';
      formData.profilePictureUrl = '';
    } catch (error) {
      console.log(error);
      // alert(error.message);
      errorAlert({ title: 'Error', text: 'Something went wrong, please try again' });
    }
  };

  return (
    <div className={`flex flex-col`}>
      <div className="grid grid-cols-2 gap-8 p-3">
        <div className="flex flex-col items-center justify-center col-span-2 gap-2 md:col-span-1">
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
        <div className="flex flex-col items-center col-span-2 gap-2 md:col-span-1">
          <h1 className="text-xl">Edit Profile</h1>
          <form className="flex flex-col gap-2 w-[85%] p-5">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="p-3 border-2 border-black rounded dark:text-black"
              placeholder="Put Your Name Here"
              value={formData.name}
              onChange={(e) => setFromData({ ...formData, name: e.target.value })}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="p-3 border-2 border-black rounded dark:text-black"
              placeholder="Put Your Email Here"
              value={formData.email}
              onChange={(e) => setFromData({ ...formData, email: e.target.value })}
            />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              className="p-3 border-2 border-black rounded dark:text-black"
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
          <div className="flex items-center justify-center gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default Profile;

// col-span fungsinya menggunakan 2 kolom
