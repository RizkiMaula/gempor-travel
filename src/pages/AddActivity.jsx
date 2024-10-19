import Button from '../components/elements/Button';
import { useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import usePost from '../hooks/usePost';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

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

  const { data } = useFetch('api/v1/categories');
  const { createItem } = usePost('api/v1/create-activity');
  const navigate = useNavigate();

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleReviews = (e) => {
    setReviews(e.target.value);
  };

  const handleFacilities = (e) => {
    setFacilities(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleProvince = (e) => {
    setProvince(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleLocationMaps = (e) => {
    setLocationMaps(e.target.value);
  };

  const handlePicture = (e) => {
    setProfilePictureName(e.target.value);
    setProfilePictureFile(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imgUrlList = [];
      const acceptImage = ['image/'];
      for (const item of profilePictureFile) {
        let isFileValid = false;

        for (const type of acceptImage) {
          if (item.type.startsWith(type)) {
            isFileValid = true;
            break;
          }
        }
        if (!isFileValid) {
          alert('File not valid');
          return;
        }
        if (item?.size > 500 * 1024) {
          alert('File too large');
          return;
        }

        let data = new FormData();
        data.append('image', item);
        await axios
          .post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', data, {
            headers: {
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              imgUrlList.push(res.data.url);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      const formData = {
        categoryId: category,
        title: title,
        description: description,
        imageUrls: imgUrlList,
        price: parseInt(price),
        price_discount: parseInt(discount),
        rating: parseInt(rating),
        total_reviews: parseInt(reviews),
        facilities: facilities,
        address: address,
        province: province,
        city: city,
        location_maps: locationMaps,
      };

      console.log(formData);
      const res = await createItem(formData);
      alert(res.message);
      setTimeout(() => {
        navigate('/admin/activity');
      }, 3000);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-transparent rounded-xl my-[5rem] sm:my-[2rem]">
      <h1 className="block text-xl font-medium text-slate-800">Add Activity</h1>
      <form
        action=""
        className="max-w-screen-lg mt-4 mb-2 w-[85%] lg:w-[53.75rem] md:w-[33.75rem] sm:w-[31.75rem] bg-white rounded-xl text-slate-800 px-4"
      >
        <div className="flex flex-col gap-6 border-2 border-slate-200 shadow-md rounded-xl p-10">
          <div className=" flex justify-center flex-col md:flex-row gap-2">
            {/* select option */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-800 dark:text-black">Category</label>
              <div className="relative">
                <select
                  className="w-full py-2 pl-3 pr-8 text-sm transition duration-300 bg-transparent border rounded shadow-sm appearance-none cursor-pointer placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 focus:shadow-md dark:text-black"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.2"
                  stroke="currentColor"
                  className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </div>
            </div>
            {/* title */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                placeholder="Your Name"
                name="title"
                id="title"
                value={title}
                onChange={handleTitle}
              />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row gap-2 justify-center">
            {/* price */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                name="price"
                id="price"
                value={price}
                onChange={handlePrice}
              />
            </div>
            {/* price discount */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Price Discount</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                placeholder="Price Discount"
                name="discount"
                id="price"
                value={discount}
                onChange={handleDiscount}
              />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row gap-2 justify-center">
            {/* rating */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Rating</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                placeholder="Rating"
                name="price"
                id="price"
                value={rating}
                onChange={handleRating}
              />
            </div>
            {/* total Review */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Total Review</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                placeholder="Price Discount "
                name="price"
                id="price"
                value={reviews}
                onChange={handleReviews}
              />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row gap-2 justify-center">
            {/* Facilities */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Facilities</label>
              <textarea
                id=""
                className="w-full p-2 border rounded text-darkColor"
                value={facilities}
                onChange={handleFacilities}
              />
            </div>
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
          </div>
          <div className=" flex flex-col md:flex-row gap-2 justify-center">
            {/* Province */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Province</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                placeholder="Province"
                name="province"
                id="province"
                value={province}
                onChange={handleProvince}
              />
            </div>
            {/* City */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">City</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow dark:text-black"
                placeholder="City"
                name="city"
                id="city"
                value={city}
                onChange={handleCity}
              />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row gap-2 justify-center ">
            {/* Address */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Address</label>
              <textarea
                id=""
                className="w-full p-2 border rounded text-darkColor"
                value={address}
                onChange={handleAddress}
              />
            </div>
            {/* Location Maps */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600 dark:text-black">Location Maps</label>
              <textarea
                id=""
                className="w-full p-2 border rounded text-darkColor"
                value={locationMaps}
                onChange={handleLocationMaps}
              />
            </div>
          </div>
          {/* upload image */}
          <div className="w-full max-w-sm min-w-[200px]">
            <input
              type="file"
              accept="image/*"
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
