import { useEffect, useState } from 'react';
import axios from 'axios';
import usePost from '../hooks/usePost';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/elements/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Typography } from '@material-tailwind/react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [role, setRole] = useState('user');
  const [profilePictureName, setProfilePictureName] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [token, setToken] = useLocalStorage('authToken', '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const { createItem } = usePost('api/v1/register');

  const checkFormValid = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    /** check email pake regex (regular expression),
     * ^ -> dimulai dengan menggunakan string
     * [a-zA-Z0-9._-]+ -> yang valid di sini adalah semua huruf kecil dan huruf besar, angka, titik, underscore dan strip (-). tanda tambah (+) maksudnya bisa diulang bisa 1 atau lebih
     * @ -> beneran simbol @ yang ada di email
     * [a-zA-Z0-9.-]+ -> sama yang kaya di atas, tapi gapake underscore. ini buat huruf setelah @. contoh "nama@mail"
     * . -> beneran simbol . yang ada di email
     * [a-zA-Z]{2,4} -> yang valid di sini adalah semua huruf kecil dan huruf besar, 2-4 karakter. dipake buat domain misal .com, .org
     * $ -> diakhiri dengan string
     */

    const phoneNumberPattern = /^[0-9]+$/;

    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }

    if (emailPattern.test(email)) {
      setEmailError('');
    }

    if (!name) {
      setNameError('Please enter your name.');
      return false;
    }

    if (name) {
      setNameError('');
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      return false;
    }

    if (password) {
      setPasswordError('');
    }

    if (password !== passwordRepeat) {
      setPasswordRepeatError('Passwords do not match.');
      return false;
    }

    if (password === passwordRepeat) {
      setPasswordRepeatError('');
    }

    if (!phoneNumberPattern.test(phoneNumber)) {
      setPhoneNumberError('Please enter a valid phone number.');
      return false;
    }

    if (phoneNumberPattern.test(phoneNumber)) {
      setPhoneNumberError('');
    }

    return true;
  };

  useEffect(() => {
    setIsFormValid(checkFormValid());
  }, [email, name, password, passwordRepeat, phoneNumber]);

  const openImagePreview = () => {
    if (profilePictureFile) {
      const imageUrl = URL.createObjectURL(profilePictureFile);
      setPreviewImageUrl(imageUrl);
      setShowPreview(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      let urlFoto = '';
      if (profilePictureFile) {
        const acceptImage = ['image/'];
        if (!acceptImage.some((item) => profilePictureFile.type.includes(item))) {
          return alert('Files that are allowed are only of type Image');
        }
        if (profilePictureFile?.size > 500 * 1024) {
          return alert('File size exceeds 500 kb');
        }
        let formData = new FormData();
        formData.append('image', profilePictureFile);
        await axios
          .post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              urlFoto = res.data.url;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      const registerData = {
        email,
        name,
        password,
        passwordRepeat,
        role,
        profilePictureUrl: urlFoto,
        phoneNumber,
      };

      const createdItem = await createItem(registerData);
      alert(`Success: ${createdItem.message}`);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-transparent rounded-xl my-[5rem] sm:my-[2rem]">
      <h1>Register</h1>
      <form
        action=""
        className="max-w-screen-lg mt-4 mb-2 w-[85%] lg:w-[53.75rem] md:w-[33.75rem] sm:w-[31.75rem] bg-white rounded-xl text-slate-800 px-4"
      >
        <div className="flex flex-col gap-6 p-10 border-2 shadow-md border-slate-200 rounded-xl">
          <div className="flex flex-col justify-center gap-2 md:flex-row">
            {/* Email */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Email</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                name="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p>{emailError}</p>
            </div>
            {/* Name */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="Joko"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p>{nameError}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 md:flex-row">
            {/* Password */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="*****"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>{passwordError}</p>
            </div>
            {/* Confirm Password */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Confirm Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="*****"
                name="confirmPassword"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
              <p>{passwordRepeatError}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 md:flex-row">
            {/* Role */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Role</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="Price Discount"
                name="role"
                value="user"
                readOnly
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            {/* Phone Number */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Phone Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                placeholder="Phone Number"
                name="Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          {/* upload image */}
          <div className="w-full max-w-sm min-w-[200px]">
            <input
              type="file"
              name="image"
              onChange={(e) => setProfilePictureFile(e.target.files[0])}
            />
          </div>
        </div>
      </form>
      <Button
        className="mt-6"
        fullWidth
        text="Register"
        bgColor="bg-blue-500"
        event={handleRegister}
      />
      <Typography
        color="gray"
        className="mt-4 font-normal text-center"
      >
        Already have have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-gray-900"
        >
          Login
        </Link>
      </Typography>
    </div>
  );
};

export default Register;
