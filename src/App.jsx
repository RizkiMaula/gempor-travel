import { useRoutes } from 'react-router-dom';
import { RouteList } from './routes/RouteList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const element = useRoutes(RouteList);
  const theme = useSelector((state) => state.darkMode.darkMode);
  // const dispatch = useDispatch();
  useEffect(() => {
    console.log({ theme });
    const root = document.documentElement; // untuk panggil root element di document
    if (theme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return element;
};

export default App;
