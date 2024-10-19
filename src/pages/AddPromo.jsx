import Button from '../components/elements/Button';
import { useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import usePost from '../hooks/usePost';
import { useNavigate } from 'react-router-dom';

const AddActivity = () => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [title, setTitle] = useState('');
  const [promo_code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [minClaim, setMinClaim] = useState(0);
  const [description, setDescription] = useState('');
  const [terms_condition, setTerm] = useState('');
  const [profilePictureName, setProfilePictureName] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState([]);

  const navigate = useNavigate();

  const { createItem } = usePost('api/v1/create-promo');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const handleMinClaim = (e) => {
    setMinClaim(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleTerm = (e) => {
    setTerm(e.target.value);
  };

  const handlePicture = (e) => {
    setProfilePictureName(e.target.value);
    setProfilePictureFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let urlPhoto = '';
      if (profilePictureFile) {
        const acceptImage = ['image/'];
        if (!acceptImage.some((item) => profilePictureFile.type.includes(item))) {
          return alert('Files that are allowed are only of type Image');
        }
        if (profilePictureFile?.size > 500 * 1024) {
          return alert('Uploaded file exceeds 500 kb');
        }
        const formData = new FormData();
        formData.append('image', profilePictureFile);
        await axios
          .post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: `24405e01-fbc1-45a5-9f5a-be13afcd757c`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              urlPhoto = response?.data?.url;
              console.log(urlPhoto);
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      }

      const formData = {
        title,
        description,
        imageUrl: urlPhoto,
        terms_condition,
        promo_code,
        promo_discount_price: parseInt(discount),
        minimum_claim_price: parseInt(minClaim),
      };

      console.log(formData);
      const createdItem = await createItem(formData);
      console.log('Add promo successful:', createdItem);
      alert('Add promo successful');
      setTimeout(() => {
        navigate('/admin/promos');
      }, 3000);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-transparent rounded-xl my-[5rem] sm:my-[2rem]">
      <h1 className="block text-xl font-medium text-slate-800">Add Promo</h1>

      <form
        action=""
        className="max-w-screen-lg mt-4 mb-2 w-[85%] lg:w-[53.75rem] md:w-[33.75rem] sm:w-[31.75rem] bg-white rounded-xl text-slate-800 px-4"
      >
        <div className="flex flex-col gap-6 border-2 border-slate-200 shadow-md rounded-xl p-10">
          <div className=" flex flex-col md:flex-row gap-2 justify-center">
            {/* Title */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                name="title"
                id="title"
                value={title}
                onChange={handleTitle}
              />
            </div>
            {/* Promo Code */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Promo Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                placeholder="Price Discount"
                name="promo code"
                id="promo code"
                value={promo_code}
                onChange={handleCode}
              />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row gap-2 justify-center">
            {/* Discount Price */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Discount Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                placeholder="Rating"
                name="discount"
                id="price"
                value={discount}
                onChange={handleDiscount}
              />
            </div>
            {/* Min Claim Price */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Min Claim Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                placeholder="Price Discount"
                name="price"
                id="price"
                value={minClaim}
                onChange={handleMinClaim}
              />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row gap-2 justify-center">
            {/* Description */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Description</label>
              <textarea
                id=""
                className="w-full p-2 border rounded text-darkColor"
                value={description}
                onChange={handleDescription}
              />
            </div>
            {/* Term & Condition */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Term & Condition</label>
              <textarea
                id=""
                className="w-full p-2 border rounded text-darkColor"
                value={terms_condition}
                onChange={handleTerm}
              />
            </div>
          </div>
          {/* upload image */}
          <div className="w-full max-w-sm min-w-[200px]">
            <input
              type="file"
              accept="image/*"
              value={profilePictureName}
              onChange={handlePicture}
              multiple
              className="w-full p-2 border rounded text-darkColor"
            />
          </div>
        </div>
      </form>
      <Button
        bgColor="bg-blue-500"
        text="Submit"
        event={handleSubmit}
      />
    </div>
  );
};

export default AddActivity;
