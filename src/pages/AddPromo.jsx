import Button from '../components/elements/Button';
import { useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import usePost from '../hooks/usePost';
import useFetch from '../hooks/useFetch';

const AddActivity = () => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoPrice, setPromoPrice] = useState(0);
  const [minClaim, setMinClaim] = useState(0);
  const [description, setDescription] = useState('');
  const [term, setTerm] = useState('');
  const [profilePictureName, setProfilePictureName] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState([]);

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

  const handlePromoPrice = (e) => {
    console.log(e.target.value);
    setPromoPrice(e.target.value);
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
    setProfilePictureFile(e.target.files);
    console.log(e.target.files);
  };

  const handleSubmit = async (e) => {};

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
            type="number"
            name="promo code"
            id="promo code"
            value={code}
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
            value={term}
            onChange={handleTerm}
          />
        </span>
        <span>
          <input
            type="file"
            accept="image/*"
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
