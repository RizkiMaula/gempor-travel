import { useRoutes } from 'react-router-dom';
import { RouteList } from './routes/RouteList';

const App = () => {
  const element = useRoutes(RouteList);
  return element;
};

export default App;
