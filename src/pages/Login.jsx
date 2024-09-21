import {useState, useEffect} from 'react';
import usePost from '../hooks/usePost';
import useLocalStorage from '../hooks/useLocalStorage';

const Login = () => {
  const [token, setToken] = useLocalStorage('authToken', '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const {createItem: handleLogin} = usePost('api/v1/login');



  return (
    <div>
      <h1>Login</h1>

      <form className="flex flex-col border-4 border-black w-[10rem] h-[10rem]">
        <input
          type="text"
          name="login"
          id="login"
          placeholder="Email"
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
        />
      </form>
      <button onClick={}>Login</button>
    </div>
  );
};

export default Login;
