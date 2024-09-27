import Button from '../components/elements/Button';
import { useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import usePost from '../hooks/usePost';
import useFetch from '../hooks/useFetch';

const AddActivity = () => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [facilities, setFacilities] = useState('');
  const [description, setDescription] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [locationMaps, setLocationMaps] = useState('');
  const [profilePictureName, setProfilePictureName] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState([]);

  const { data, loading, error } = useFetch('api/v1/categories');
  const { createItem } = usePost('api/v1/create-activity');

  const handleCategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  const handleTitle = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handlePrice = (e) => {
    console.log(e.target.value);
    setPrice(e.target.value);
  };

  const handleDiscount = (e) => {
    console.log(e.target.value);
    setDiscount(e.target.value);
  };

  const handleRating = (e) => {
    console.log(e.target.value);
    setRating(e.target.value);
  };

  const handleReviews = (e) => {
    console.log(e.target.value);
    setReviews(e.target.value);
  };

  const handleFacilities = (e) => {
    console.log(e.target.value);
    setFacilities(e.target.value);
  };

  const handleDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const handleProvince = (e) => {
    console.log(e.target.value);
    setProvince(e.target.value);
  };

  const handleCity = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  };

  const handleLocationMaps = (e) => {
    console.log(e.target.value);
    setLocationMaps(e.target.value);
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
        <span className="flex flex-col">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id=""
            onChange={handleCategory}
          >
            {data?.data?.map((item, index) => (
              <option
                key={index}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </span>
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
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={handlePrice}
          />
        </span>
        <span>
          <label htmlFor="price">Price Discount</label>
          <input
            type="number"
            name="discount"
            id="price"
            value={discount}
            onChange={handleDiscount}
          />
        </span>
        <span>
          <label htmlFor="price">Rating</label>
          <input
            type="number"
            name="price"
            id="price"
            value={rating}
            onChange={handleRating}
          />
        </span>
        <span>
          <label htmlFor="price">Total Review</label>
          <input
            type="number"
            name="price"
            id="price"
            value={reviews}
            onChange={handleReviews}
          />
        </span>
        <span>
          <label htmlFor="price">Facilities</label>
          <textarea
            id=""
            className="w-full p-2 border rounded text-darkColor"
            value={facilities}
            onChange={handleFacilities}
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
          <label htmlFor="price">Province</label>
          <input
            type="text"
            name="province"
            id="province"
            value={province}
            onChange={handleProvince}
          />
        </span>
        <span>
          <label htmlFor="price">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={handleCity}
          />
        </span>
        <span>
          <label htmlFor="price">Address</label>
          <textarea
            id=""
            className="w-full p-2 border rounded text-darkColor"
            value={address}
            onChange={handleAddress}
          />
        </span>
        <span>
          <label htmlFor="price">Location Maps</label>
          <textarea
            id=""
            className="w-full p-2 border rounded text-darkColor"
            value={locationMaps}
            onChange={handleLocationMaps}
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
