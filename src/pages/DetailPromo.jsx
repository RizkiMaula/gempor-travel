import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '../components/elements/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import useUpdate from '../hooks/useUpdate';

const DetailPromo = () => {
  let [searchParams] = useSearchParams();
  // const [data, setData] = useState([]);
  const [data, setData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    terms_condition: '',
    promo_code: '',
    promo_discount_price: 0,
    minimum_claim_price: 0,
    dataId: null,
  });

  const { id } = useParams();
  const editable = searchParams.get('edit') === 'true';

  const navigate = useNavigate();
  const { updateItem } = useUpdate('api/v1/update-promo');
  const [profilePictureFile, setProfilePictureFile] = useState([]);
  const [token, setToken] = useLocalStorage('authToken', '');

  const getDataPromo = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
      headers: {
        apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      },
    };

    axios
      .request(config)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = async () => {
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
        const updatedData = {
          title: data.title,
          description: data.description,
          imageUrl: urlPhoto,
          terms_condition: data.terms_condition,
          promo_code: data.promo_code,
          promo_discount_price: parseInt(data.promo_discount_price),
          minimum_claim_price: parseInt(data.minimum_claim_price),
        };

        console.log(updatedData);

        const updatedItem = await updateItem(id, updatedData);
        alert('Promo updated successfully');
        console.log(updatedItem);
        navigate('/promos');
      }
    } catch (error) {
      console.log(error);
      alert(`error: ${error.message}`);
    }
  };

  useEffect(() => {
    getDataPromo();
  }, []);

  console.log(data);

  if (!data.id) {
    return <h1>Data tidak ditemukan</h1>;
  }

  return (
    <>
      <h1>halaman promo</h1>

      {data && (
        <>
          <span className="flex gap-2 items-center">
            <p>Title</p>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
              disabled={!editable}
              className="border border-gray-300 rounded-md p-2 w-[20rem]"
            />
          </span>
          <span className="flex flex-col gap-2">
            <p>Description</p>
            <textarea
              name=""
              id=""
              className="border border-gray-300 rounded-md p-2 w-[20rem]"
              disabled={!editable}
              value={data.description || ''}
              onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
            ></textarea>
          </span>
          <span>
            <p>Image</p>
            <img
              src={data.imageUrl}
              alt={data.title}
            />
            <input
              type="file"
              onChange={(e) => setData((prev) => ({ ...prev, imageUrl: e.target.value }))}
              disabled={!editable}
              className="border border-gray-300 rounded-md p-2 w-[20rem]"
            />
          </span>
          <span className="flex flex-col gap-2">
            <p>Terms and Conditions</p>
            <textarea
              name=""
              id=""
              className="border border-gray-300 rounded-md p-2 w-[20rem]"
              disabled={!editable}
              value={data.terms_condition || ''}
              onChange={(e) => setData((prev) => ({ ...prev, terms_condition: e.target.value }))}
            ></textarea>
          </span>
          <span className="flex gap-2 items-center">
            <p>Code</p>
            <input
              type="text"
              value={data.promo_code || ''}
              onChange={(e) => setData((prev) => ({ ...prev, promo_code: e.target.value }))}
              disabled={!editable}
              className="border border-gray-300 rounded-md p-2 w-[20rem]"
            />
          </span>
          <span className="flex gap-2 items-center">
            <p>Promo Discout Price</p>
            <input
              type="number"
              value={data.promo_discount_price || ''}
              onChange={(e) => setData((prev) => ({ ...prev, promo_discount_price: e.target.value }))}
              disabled={!editable}
              className="border border-gray-300 rounded-md p-2 w-[20rem]"
            />
          </span>
          <span className="flex gap-2 items-center">
            <p>Minimum Claim Price</p>
            <input
              type="number"
              value={data.minimum_claim_price || ''}
              onChange={(e) => setData((prev) => ({ ...prev, minimum_claim_price: e.target.value }))}
              disabled={!editable}
              className="border border-gray-300 rounded-md p-2 w-[20rem]"
            />
          </span>
          <Button
            text="Edit"
            bgColor="bg-blue-500"
            event={() => {
              handleUpdate();
            }}
          />
        </>
      )}
    </>
  );
};

export default DetailPromo;
