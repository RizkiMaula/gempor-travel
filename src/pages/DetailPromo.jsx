import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '../components/elements/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import useUpdate from '../hooks/useUpdate';

const DetailPromo = () => {
  let [searchParams] = useSearchParams();
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
  const [profilePictureFile, setProfilePictureFile] = useState(null);
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
        console.log(profilePictureFile);
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
        searchParams.delete('edit');
        navigate(`/admin/promos/${id}`);
      }
    } catch (error) {
      console.log(error);
      alert(`error: ${error.message}`);
    }
  };

  const handleChangePic = (e) => {
    if (e.target.files[0]) {
      setData((prev) => ({ ...prev, imageUrl: URL.createObjectURL(e.target.files[0]) }));
      setProfilePictureFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    getDataPromo();
  }, []);

  if (!data.id) {
    return <h1>No data Found</h1>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center bg-transparent rounded-xl gap-2 my-[5rem] sm:my-[2rem]">
      <div className="flex justify-between flex-col items-center gap-2">
        <h1 className="block text-xl font-medium text-slate-800">Halaman Promo</h1>
        {!editable && (
          <Button
            text="Edit Promo"
            bgColor="bg-blue-500"
            event={() => {
              searchParams.set('edit', 'true');
              navigate(`/admin/promos/${id}?${searchParams.toString()}`);
            }}
          />
        )}
      </div>
      {data && (
        <>
          <form
            action=""
            className="max-w-screen-lg mt-4 mb-2 w-[85%] lg:w-[53.75rem] md:w-[33.75rem] sm:w-[31.75rem] bg-white rounded-xl text-slate-800 px-4"
          >
            <img
              className="h-96 w-full object-cover object-center"
              src={data.imageUrl}
              alt={data.title}
            />
            <div className="flex flex-col gap-6 border-2 border-slate-200 shadow-md rounded-xl p-10">
              <div className=" flex flex-col md:flex-row gap-2 justify-center">
                {/* Title */}
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    name="title"
                    id="title"
                    value={data.title || ''}
                    onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={!editable}
                  />
                </div>
                <div className="w-full max-w-sm min-w-[200px]">
                  {/* Promo Code */}
                  <label className="block mb-2 text-sm text-slate-600">Promo Code</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    placeholder="Price Discount"
                    name="promo code"
                    id="promo code"
                    value={data.promo_code || ''}
                    onChange={(e) => setData((prev) => ({ ...prev, promo_code: e.target.value }))}
                    disabled={!editable}
                  />
                </div>
              </div>
              <div className=" flex flex-col md:flex-row gap-2 justify-center">
                {/* Discount Price */}
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">Discount Price</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    placeholder="Rating"
                    name="discount"
                    id="price"
                    value={data.promo_discount_price || ''}
                    onChange={(e) => setData((prev) => ({ ...prev, promo_discount_price: e.target.value }))}
                    disabled={!editable}
                  />
                </div>
                {/* Min Claim Price */}
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">Min Claim Price</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                    placeholder="Price Discount"
                    name="price"
                    id="price"
                    value={data.minimum_claim_price || ''}
                    onChange={(e) => setData((prev) => ({ ...prev, minimum_claim_price: e.target.value }))}
                    disabled={!editable}
                  />
                </div>
              </div>
              <div className=" flex flex-col md:flex-row gap-2 justify-center">
                {/* Description */}
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">Description</label>
                  <textarea
                    id=""
                    className="w-full p-2 border rounded text-darkColor"
                    disabled={!editable}
                    value={data.description || ''}
                    onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                {/* Term & Condition */}
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">Term & Condition</label>
                  <textarea
                    id=""
                    className="w-full p-2 border rounded text-darkColor"
                    disabled={!editable}
                    value={data.terms_condition || ''}
                    onChange={(e) => setData((prev) => ({ ...prev, terms_condition: e.target.value }))}
                  />
                </div>
              </div>
              {/* upload image */}
              {editable && (
                <div className="w-full max-w-sm min-w-[200px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChangePic}
                    disabled={!editable}
                    className="border border-gray-300 rounded-md p-2 w-[20rem]"
                  />
                </div>
              )}
            </div>
          </form>
          {editable && (
            <div className="flex gap-2">
              <Button
                text="Edit"
                bgColor="bg-blue-500"
                event={() => {
                  handleUpdate();
                }}
              />
              <Button
                text="Cancel"
                event={() => navigate(`/admin/promos/${id}`)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailPromo;
