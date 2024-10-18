import UserLayout from '../components/elements/UserLayout';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button, Card, CardBody, CardHeader, Carousel, Typography } from '@material-tailwind/react';
import useLocalStorage from '../hooks/useLocalStorage';

const Home = () => {
  // Redux
  const dark = useSelector((state) => state.darkMode);

  const { data: banners, loading: bannerLoading, error: bannerError, reFetch: bannerReFetch } = useFetch('api/v1/banners');
  const { data: promo, loading: promoLoading, error: promoError, reFetch: promoReFetch } = useFetch('api/v1/promos');
  const { data: activities, loading: activitiesLoading, error: activitiesError, reFetch: activitiesReFetch } = useFetch('api/v1/activities');
  const { data: categories, loading: categoriesLoading, error: categoriesError, reFetch: categoriesRefetch } = useFetch('api/v1/categories');

  const initialPromo = promo?.data?.[1]?.promo_code;
  const [changePromo, setChangePromo] = useState(initialPromo);
  const initialPrice = promo?.data?.[1]?.promo_discount_price;
  const [changePrice, setChangePrice] = useState(initialPrice);
  const initialImage = promo?.data?.[1]?.imageUrl;
  const [active, setActive] = useState(initialImage);

  const [mode, setMode] = useLocalStorage('mode', dark?.darkMode || true);
  console.log(mode);

  useEffect(() => {
    if (initialImage) {
      setActive(initialImage);
    }
    if (initialPromo) {
      setChangePromo(initialPromo);
    }
    if (initialPrice) {
      setChangePrice(initialPrice);
    }
  }, [initialImage, initialPromo, initialPrice]);
  const handleChangeImage = (newImageUrl, newPromoCode, newPrice) => {
    setActive(newImageUrl);
    setChangePromo(newPromoCode);
    setChangePrice(newPrice);
  };

  return (
    <UserLayout>
      {/* banner */}
      <div className="bg-white w-[100%] h-[25%] flex flex-col -top-50">
        <div className="w-[100%] h-[100%] flex justify-between items-center">
          {bannerLoading && <div>Loading...</div>}
          {bannerError && <div>Error: {bannerError}</div>}
          {banners?.data === undefined || (banners?.data?.length === 0 && <div>No data available.</div>)}
          <Carousel
            loop={true}
            autoplay={true}
          >
            {banners?.data
              ?.filter((banner, index) => index < 5)
              .map((banner) => (
                <figure
                  key={banner.id}
                  className="relative w-full h-full"
                >
                  <img
                    className="object-cover object-center w-full h-full"
                    src={banner.imageUrl}
                    alt={banner.title}
                  />
                  <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                    <div>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                      >
                        {banner.name}
                      </Typography>
                    </div>
                  </figcaption>
                </figure>
              ))}
          </Carousel>
        </div>
      </div>
      {/* promo */}
      <div className={`w-[90%] flex-col flex items-center dark:text-white`}>
        <div className="flex items-center justify-between w-full py-10 px-9">
          <h1 className="text-lg sm:text-xl md:text-2xl">Discover More Promos</h1>
          <Link
            to="/user/all-promos"
            className="font-bold text-blue-500 hover:text-blue-700 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid w-full gap-4">
          <figure className="relative w-full h-96">
            <img
              className="object-cover object-center w-full h-full rounded-xl"
              src={active}
              alt="image"
              onClick={handleChangeImage}
            />
            <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
              {promoLoading && <div>Loading...</div>}
              {promoError && <div>Error: {promoError}</div>}
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="text-sm"
                >
                  Promo:
                </Typography>
                <Typography
                  color="gray"
                  className="mt-2 text-sm font-normal"
                >
                  {changePromo}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="text-sm"
                >
                  Price:
                </Typography>
                <Typography
                  color="gray"
                  className="mt-2 text-sm font-normal"
                >
                  Rp.{changePrice}
                </Typography>
              </div>
            </figcaption>
          </figure>
          <div className="grid grid-cols-5 gap-4 ">
            {promo?.data?.slice(0, 5).map((promo) => (
              <div
                key={promo.id}
                className="flex justify-center"
              >
                <img
                  onClick={() => handleChangeImage(promo.imageUrl, promo.promo_code, promo.promo_discount_price)}
                  src={promo.imageUrl}
                  className="object-cover object-center h-20 max-w-full rounded-lg cursor-pointer"
                  alt="gallery-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* activities */}
      <div className="w-[90%] flex flex-col justify-center items-center">
        <div className="flex items-center justify-between w-full py-10 px-9">
          <h1 className="text-lg sm:text-xl md:text-2xl">Discover Fun Activities</h1>
          <Link
            to="/user/all-activities"
            className="font-bold text-blue-500 hover:text-blue-700 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {activities?.data
            ?.filter((activity, index) => index <= 5)
            .map((activity, index) => (
              <div
                key={index}
                className="grid-flow-col gap-2"
              >
                <Card className="w-full max-w-[48rem] flex-row">
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="w-2/5 m-0 rounded-r-none shrink-0"
                  >
                    <img
                      src={activity.imageUrls[0]}
                      alt="card-image"
                      className="object-cover w-full h-full"
                    />
                  </CardHeader>
                  <CardBody className="w-full truncate">
                    <Typography
                      variant="h4"
                      color="blue-gray"
                      className="mb-2 truncate"
                    >
                      {activity.title}
                    </Typography>
                    <Typography
                      color="gray"
                      className="mb-8 font-normal truncate"
                    >
                      {activity.description}
                    </Typography>
                    <a
                      href="#"
                      className="inline-block"
                    >
                      <Button
                        variant="text"
                        className="flex items-center gap-2"
                      >
                        Learn More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </Button>
                    </a>
                  </CardBody>
                </Card>
              </div>
            ))}
        </div>
      </div>
      {/* categories(destinations) */}
      <div className=" w-[90%] h-1/4 flex flex-col">
        <div className="flex items-center justify-between w-full py-10 px-9">
          <h1 className="text-sm sm:text-lg md:text-xl">Choose Your Destinaion</h1>
          <Link
            to="/user/all-categories"
            className="font-bold text-blue-500 hover:text-blue-700 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categories?.data
            ?.filter((category, index) => index < 4)
            .map((category, index) => (
              <div key={index}>
                <img
                  className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                  src={category.imageUrl}
                  alt="gallery-photo"
                />
              </div>
            ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Home;
