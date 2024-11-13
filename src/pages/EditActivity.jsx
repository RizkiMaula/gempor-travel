import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import useUpdate from '../hooks/useUpdate';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/elements/Button';
import Loading from '../components/elements/Loading';

const EditActivity = () => {
  let [searchParams] = useSearchParams();
  const { id } = useParams();

  const [dataAct, setDataActivity] = useState([]);

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrl2, setImgUrl2] = useState('');
  const [profilePictureName, setProfilePictureName] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState([]);
  const [token, setToken] = useLocalStorage('authToken', '');
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    imageUrls: [imgUrl, imgUrl2],
    price: 0,
    price_discount: 0,
    rating: 0,
    total_reviews: 0,
    facilities: '',
    address: '',
    province: '',
    city: '',
    location_maps: '',
    dataId: null,
  });

  const { data } = useFetch('api/v1/categories'); //ambil categories dan taro di scrollbar
  const { updateItem } = useUpdate('api/v1/update-activity');
  const navigate = useNavigate();
  const editable = searchParams.get('edit') === 'true';
  const fetchImg = dataAct?.imageUrls;

  console.log(dataAct.data);

  const handleCategory = (e) => {
    setFormData((prev) => ({ ...prev, categoryId: e.target.value }));
  };

  const handleTitle = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handlePrice = (e) => {
    setFormData((prev) => ({ ...prev, price: e.target.value }));
  };

  const handleDiscount = (e) => {
    setFormData((prev) => ({ ...prev, price_discount: e.target.value }));
  };

  const handleRating = (e) => {
    setFormData((prev) => ({ ...prev, rating: e.target.value }));
  };

  const handleReviews = (e) => {
    setFormData((prev) => ({ ...prev, total_reviews: e.target.value }));
  };

  const handleFacilities = (e) => {
    setFormData((prev) => ({ ...prev, facilities: e.target.value }));
  };

  const handleDescription = (e) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleProvince = (e) => {
    setFormData((prev) => ({ ...prev, province: e.target.value }));
  };

  const handleCity = (e) => {
    setFormData((prev) => ({ ...prev, city: e.target.value }));
  };

  const handleAddress = (e) => {
    setFormData((prev) => ({ ...prev, address: e.target.value }));
  };

  const handleLocationMaps = (e) => {
    setFormData((prev) => ({ ...prev, location_maps: e.target.value }));
  };

  const handlePicture = (e) => {
    setProfilePictureName(e.target.value);
    setProfilePictureFile(e.target.files);
  };

  const getGoogleMapsUsingRegex = (url) => {
    const regex = /<iframe.*?src=['"](.*?)['"].*?>/;
    const match = url?.match(regex);
    if (match) {
      return match[1];
    }
  };

  const getDataActivity = async (id) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
      headers: {
        apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.data);
        setDataActivity(response.data.data);
        if (response.data.status === 'OK') {
          setFormData({
            categoryId: response.data.data.categoryId,
            title: response.data.data.title,
            description: response.data.data.description,
            imageUrls: response.data.data.imageUrls,
            price: response.data.data.price,
            price_discount: response.data.data.price_discount,
            rating: response.data.data.rating,
            total_reviews: response.data.data.total_reviews,
            facilities: response.data.data.facilities,
            address: response.data.data.address,
            province: response.data.data.province,
            city: response.data.data.city,
            location_maps: response.data.data.location_maps,
            dataId: id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = async () => {
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
        // if (item?.size > 500 * 1024) {
        //   alert('File too large');
        //   return;
        // }

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

      const updatedData = {
        title: formData.title,
        categoryId: formData.categoryId,
        description: formData.description,
        imageUrls: imgUrlList,
        price: parseInt(formData.price),
        price_discount: parseInt(formData.price_discount),
        rating: parseInt(formData.rating),
        total_reviews: parseInt(formData.total_reviews),
        facilities: formData.facilities,
        address: formData.address,
        province: formData.province,
        city: formData.city,
        location_maps: formData.location_maps,
      };
      console.log(updatedData);
      //   nanti update logicnya di bawah
      const response = await updateItem(id, updatedData);
      alert('Update success');
      console.log(response);
      navigate(`/admin/activity/edit/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    getDataActivity(id);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center bg-transparent rounded-xl my-[5rem] sm:my-[2rem]">
      <h1 className="block text-xl font-medium text-slate-800">Edit Activity</h1>
      {!editable && (
        <Button
          text="Edit Activity"
          bgColor="bg-blue-500"
          event={() => {
            searchParams.set('edit', 'true');
            navigate(`/admin/activity/edit/${id}?${searchParams.toString()}`);
          }}
        />
      )}
      <form
        action=""
        className="max-w-screen-lg mt-4 mb-2 w-[85%] lg:w-[53.75rem] md:w-[33.75rem] sm:w-[31.75rem] bg-white rounded-xl text-slate-800 px-4 dark:text-black"
      >
        <div className="flex flex-col items-center justify-center">
          {!fetchImg && <Loading />}
          <img
            src={fetchImg}
            alt={dataAct?.title}
            className="object-cover w-full h-[90%]"
          />
        </div>
        <div className="flex flex-col gap-6 p-10 border-2 shadow-md border-slate-200 rounded-xl">
          <div className="flex flex-col justify-center gap-2 md:flex-row w-f">
            {/* select option */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-800">Category</label>
              <div className="relative">
                <select
                  className="w-full py-2 pl-3 pr-8 text-sm transition duration-300 bg-transparent border rounded shadow-sm appearance-none cursor-pointer placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 focus:shadow-md"
                  name="category"
                  id=""
                  onChange={handleCategory}
                  value={formData.categoryId}
                  disabled={!editable}
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
              <label className="block mb-2 text-sm text-slate-600">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="Your Name"
                name="title"
                id="title"
                value={formData.title || ''}
                onChange={handleTitle}
                disabled={!editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 md:flex-row">
            {/* price */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                name="price"
                id="price"
                value={formData.price}
                onChange={handlePrice}
                disabled={!editable}
              />
            </div>
            {/* price discount */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Price Discount</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="Price Discount"
                name="discount"
                id="price"
                value={formData.price_discount}
                onChange={handleDiscount}
                disabled={!editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 md:flex-row">
            {/* rating */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Rating</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="Rating"
                name="price"
                id="price"
                value={formData.rating}
                onChange={handleRating}
                disabled={!editable}
              />
            </div>
            {/* total Review */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Total Review</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="Price Discount"
                name="price"
                id="price"
                value={formData.total_reviews}
                onChange={handleReviews}
                disabled={!editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 md:flex-row">
            {/* Facilities */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Facilities</label>
              <textarea
                id=""
                className="w-full p-2 border rounded text-darkColor"
                value={formData.facilities || ''}
                onChange={handleFacilities}
                disabled={!editable}
              />
            </div>
            {/* Description */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Description</label>
              <textarea
                id=""
                className="w-full p-2 border rounded text-darkColor"
                value={formData.description || ''}
                onChange={handleDescription}
                disabled={!editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 md:flex-row">
            {/* Province */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Province</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="Province"
                name="province"
                id="province"
                value={formData.province || ''}
                onChange={handleProvince}
                disabled={!editable}
              />
            </div>
            {/* City */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">City</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="City"
                name="city"
                id="city"
                value={formData.city || ''}
                onChange={handleCity}
                disabled={!editable}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 md:flex-row">
            {/* Address */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Address</label>
              <textarea
                id=""
                className="w-full p-2 border rounded text-darkColor"
                value={formData.address || ''}
                onChange={handleAddress}
                disabled={!editable}
              />
            </div>
            {/* Location Maps */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Location Maps</label>
              <textarea
                id=""
                className="w-full p-2 border rounded text-darkColor"
                value={formData.location_maps || ''}
                onChange={handleLocationMaps}
                disabled={!editable}
              />
            </div>
          </div>
          {editable && (
            // {/* upload image */}
            <div className="w-full max-w-sm min-w-[200px]">
              <input
                type="file"
                accept="image/*"
                onChange={handlePicture}
                multiple
              />
            </div>
          )}
        </div>
      </form>
      {!editable && (
        <iframe
          src={getGoogleMapsUsingRegex(dataAct?.location_maps)}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          // className="w-full rounded-md h-96"
          className="max-w-screen-lg mt-4 mb-2 w-[85%] lg:w-[53.75rem] md:w-[33.75rem] sm:w-[31.75rem] h-96 bg-white rounded-xl text-slate-800 px-4 dark:text-black"
        ></iframe>
      )}
      {editable && (
        <div className="flex gap-2">
          <Button
            bgColor="bg-blue-500"
            event={handleUpdate}
            text="Update"
          />
          <Button
            event={() => navigate(`../activity/edit/${id}`)}
            text="Cancel"
          />
        </div>
      )}
    </div>
  );
};

export default EditActivity;
