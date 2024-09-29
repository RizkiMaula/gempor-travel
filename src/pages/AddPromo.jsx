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
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handleCode = (e) => {
    console.log(e.target.value);
    setCode(e.target.value);
  };

  const handleDiscount = (e) => {
    console.log(e.target.value);
    setDiscount(e.target.value);
  };

  const handleMinClaim = (e) => {
    console.log(e.target.value);
    setMinClaim(e.target.value);
  };

  const handleDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const handleTerm = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  const handlePicture = (e) => {
    setProfilePictureName(e.target.value);
    setProfilePictureFile(e.target.files[0]);
    console.log(e.target.files);
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
    <>
      <h1>Add Activity</h1>

      <form
        action=""
        className="flex flex-col border-4 border-black"
      >
        <span>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitle}
          />
        </span>
        <span>
          <label htmlFor="promo code">Promo code</label>
          <input
            type="text"
            name="promo code"
            id="promo code"
            value={promo_code}
            onChange={handleCode}
          />
        </span>
        <span>
          <label htmlFor="price">Discount Price</label>
          <input
            type="number"
            name="discount"
            id="price"
            value={discount}
            onChange={handleDiscount}
          />
        </span>
        <span>
          <label htmlFor="price">Min Claim Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={minClaim}
            onChange={handleMinClaim}
          />
        </span>
        <span>
          <label htmlFor="price">Description</label>
          <textarea
            id=""
            className="w-full p-2 border rounded text-darkColor"
            value={description}
            onChange={handleDescription}
          />
        </span>
        <span>
          <label htmlFor="price">Term & Condition</label>
          <textarea
            id=""
            className="w-full p-2 border rounded text-darkColor"
            value={terms_condition}
            onChange={handleTerm}
          />
        </span>
        <span>
          <input
            type="file"
            accept="image/*"
            value={profilePictureName}
            onChange={handlePicture}
            multiple
          />
        </span>
      </form>
      <Button
        bgColor="bg-blue-500"
        text="Submit"
        event={handleSubmit}
      />
    </>
  );
};

export default AddActivity;
