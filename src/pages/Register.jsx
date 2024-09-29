import { useEffect, useState } from 'react';
import axios from 'axios';
import usePost from '../hooks/usePost';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/elements/Button';
import { Link, useNavigate } from 'react-router-dom';

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

    if (!name) {
      setNameError('Please enter your name.');
      return false;
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      return false;
    }

    if (password !== passwordRepeat) {
      setPasswordRepeatError('Passwords do not match.');
      return false;
    }

    if (!phoneNumberPattern.test(phoneNumber)) {
      setPasswordError('Please enter a valid phone number.');
      return false;
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
    <div
      className="flex flex-col items-center justify-center h-screen "
      style={{ border: '2px solid black' }}
    >
      <h1>Register</h1>
      <form className="flex flex-col w-1/2 gap-3 p-10 bg-red-200 h-1/2">
        <div className="flex gap-3 ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>{emailError}</p>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>{nameError}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>{passwordError}</p>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
          <p>{passwordRepeatError}</p>
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            value="user"
            readOnly
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Number">Phone Number</label>
          <input
            type="text"
            name="Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Profile Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setProfilePictureFile(e.target.files[0])}
          />
        </div>
      </form>
      <Button
        text="Register"
        bgColor="bg-red-500"
        event={handleRegister}
      />
      <h4>Already have an account?</h4> <Link to={'/login'}>Login</Link>
    </div>
  );
};

export default Register;
