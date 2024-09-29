import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import usePost from '../hooks/usePost';
import Button from '../components/elements/Button';
const Login = () => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [role, setRole] = useLocalStorage('role', '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      console.log(response);
      console.log(`role: ${response.data.role}, token: ${response.token}`);
      setToken(response.token);
      setRole(response.data.role);
      setTimeout(() => {
        if (response.data.role === 'admin') {
          navigate('/admin');
        } else {
          if (response.data.role === 'user') {
            navigate('/');
          }
        }
      }, 3000);
    } catch (error) {
      alert(`error: ${error}`);
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Login</h1>

      <form className="flex flex-col border-4 border-black w-[10rem] h-[10rem]">
        <input
          type="text"
          name="login"
          id="login"
          placeholder="Email"
          onChange={handleEmail}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handlePassword}
        />
      </form>

      <Button
        text="Login"
        bgColor="bg-blue-500"
        event={handleLogin}
      />

      <Button
        text="Register"
        bgColor="bg-red-500"
        event={() => navigate('/register')}
      />
    </div>
  );
};

export default Login;
