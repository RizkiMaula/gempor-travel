import UserLayout from '../components/elements/UserLayout';

const Home = () => {
  return (
    <UserLayout classname="bg-blue-500 border-3 border-yellow-400">
      <div>
        <h1 className="text-3xl">home</h1>
      </div>
      <div>
        <h1 className="text-3xl">Promo</h1>
      </div>
      <div>
        <h1 className="text-3xl">Categories</h1>
      </div>
    </UserLayout>
  );
};

export default Home;
