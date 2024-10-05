import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useUpdate from '../hooks/useUpdate';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/elements/Button';

const EditActivity = () => {
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

  const handleCategory = (e) => {
    setFormData((prev) => ({ ...prev, categoryId: e.target.value }));
    console.log(e.target.value);
  };

  const handleTitle = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
    console.log(e.target.value);
  };

  const handlePrice = (e) => {
    setFormData((prev) => ({ ...prev, price: e.target.value }));
    console.log(e.target.value);
  };

  const handleDiscount = (e) => {
    setFormData((prev) => ({ ...prev, price_discount: e.target.value }));
    console.log(e.target.value);
  };

  const handleRating = (e) => {
    setFormData((prev) => ({ ...prev, rating: e.target.value }));
    console.log(e.target.value);
  };

  const handleReviews = (e) => {
    setFormData((prev) => ({ ...prev, total_reviews: e.target.value }));
    console.log(e.target.value);
  };

  const handleFacilities = (e) => {
    setFormData((prev) => ({ ...prev, facilities: e.target.value }));
    console.log(e.target.value);
  };

  const handleDescription = (e) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
    console.log(e.target.value);
  };

  const handleProvince = (e) => {
    setFormData((prev) => ({ ...prev, province: e.target.value }));
    console.log(e.target.value);
  };

  const handleCity = (e) => {
    setFormData((prev) => ({ ...prev, city: e.target.value }));
    console.log(e.target.value);
  };

  const handleAddress = (e) => {
    setFormData((prev) => ({ ...prev, address: e.target.value }));
    console.log(e.target.value);
  };

  const handleLocationMaps = (e) => {
    setFormData((prev) => ({ ...prev, location_maps: e.target.value }));
    console.log(e.target.value);
  };

  const handlePicture = (e) => {
    setProfilePictureName(e.target.value);
    setProfilePictureFile(e.target.files);
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

  useEffect(() => {
    getDataActivity(id);
  }, []);

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
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Edit Activity</h1>

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
            value={formData.categoryId || ''}
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
            value={formData.title || ''}
            onChange={handleTitle}
          />
        </span>
        <span>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handlePrice}
          />
        </span>
        <span>
          <label htmlFor="price">Price Discount</label>
          <input
            type="number"
            name="discount"
            id="price"
            value={formData.discount}
            onChange={handleDiscount}
          />
        </span>
        <span>
          <label htmlFor="price">Rating</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.rating}
            onChange={handleRating}
          />
        </span>
        <span>
          <label htmlFor="price">Total Review</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.reviews}
            onChange={handleReviews}
          />
        </span>
        <span>
          <label htmlFor="price">Facilities</label>
          <textarea
            id=""
            className="w-full p-2 border rounded text-darkColor"
            value={formData.facilities || ''}
            onChange={handleFacilities}
          />
        </span>
        <span>
          <label htmlFor="price">Description</label>
          <textarea
            id=""
            className="w-full p-2 border rounded text-darkColor"
            value={formData.description || ''}
            onChange={handleDescription}
          />
        </span>
        <span>
          <label htmlFor="price">Province</label>
          <input
            type="text"
            name="province"
            id="province"
            value={formData.province || ''}
            onChange={handleProvince}
          />
        </span>
        <span>
          <label htmlFor="price">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city || ''}
            onChange={handleCity}
          />
        </span>
        <span>
          <label htmlFor="price">Address</label>
          <textarea
            id=""
            className="w-full p-2 border rounded text-darkColor"
            value={formData.address || ''}
            onChange={handleAddress}
          />
        </span>
        <span>
          <label htmlFor="price">Location Maps</label>
          <textarea
            id=""
            className="w-full p-2 border rounded text-darkColor"
            value={formData.location_maps || ''}
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
        type="submit"
        event={handleUpdate}
        text="Update"
      />
    </div>
  );
};

export default EditActivity;
