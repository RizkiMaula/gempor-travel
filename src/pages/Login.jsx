import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import usePost from '../hooks/usePost';
import Button from '../components/elements/Button';
import { Card, Typography } from '@material-tailwind/react';
import useAlert from '../hooks/alerts/useAlert';
import image2 from '../assets/login2.jpg';

const Login = () => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [role, setRole] = useLocalStorage('role', '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { successAlert, errorAlert } = useAlert();

  const { createItem: login } = usePost('api/v1/login'); // createItem: login itu buat aliasnya. (bahasa manusianya "login itu alias dari createItem yang ada di hook usePost")

  const navigate = useNavigate();

  const handleEmail = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = { email, password };
      const response = await login(loginData);
      setToken(response.token);
      setRole(response.data.role);
      setTimeout(() => {
        if (response.data.role === 'admin') {
          successAlert({ title: 'Success', text: 'Login Success as Admin' });
          navigate('/admin');
        } else {
          successAlert({ title: 'Success', text: 'Login Success' });
          if (response.data.role === 'user') {
            navigate('/');
          }
        }
      }, 3000);
    } catch (error) {
      // alert(`error: ${error}`);
      errorAlert({ title: 'Error', text: error });
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <img
        src={image2}
        alt="Group-1"
        className="w-[60%] h-[60%] hidden md:block object-cover"
      />
      <Card
        color="transparent"
        shadow={false}
        className="max-w-[25rem] flex flex-col items-center justify-center border-2 shadow-2xl py-10 gap-3"
      >
        <Typography
          variant="h4"
          color="blue-gray"
        >
          Login
        </Typography>

        <form className="max-w-screen-lg px-10 mt-8 mb-2 w-80 sm:w-96">
          <div className="flex flex-col gap-6 mb-1">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
            >
              Your Email
            </Typography>
            <input
              type="text"
              name="login"
              id="login"
              placeholder="Email"
              onChange={handleEmail}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-3 border-2 border-gray-300 rounded-xl"
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
            >
              Your Password
            </Typography>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handlePassword}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 p-3 border-2 border-gray-300 rounded-xl"
            />
          </div>
        </form>

        <Button
          className="gap-3 mt-6 mb-2 w-80 sm:w-96"
          text="Login"
          bgColor="bg-blue-500"
          event={handleLogin}
        >
          sign up
        </Button>
        <Typography
          color="gray"
          className="mt-4 font-normal text-center"
        >
          Haven&apos;t have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-gray-900 hover:underline hover:text-blue-600"
          >
            Register
          </Link>
        </Typography>
      </Card>
    </div>
  );
};

export default Login;
