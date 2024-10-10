import UserLayout from '../components/elements/UserLayout';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
// import Carousel from '../components/elements/Carousel';
// import ProperCarousel from '../components/elements/ProperCarousel';
import { Button, Carousel, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react';

const Home = () => {
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
  const [categoryid, setCategoryid] = useState('');

  const handleCategory = (e) => {
    setCategoryid(e.target.value);
    console.log(e.target.value);
  };

  // console.log(activities?.data?.map((v) => v.imageUrls));
  // console.log(categories?.data?.map((v) => v.name));

  // console.log(activities?.data?.[1]?.imageUrls);

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
    <UserLayout classname="bg-blue-500">
      <div
        className="bg-white w-[100%] h-1/4 flex flex-col justify-center items-center"
        style={{ border: '2px solid black', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      >
        <div
          className="w-[100%] h-[100%] flex justify-between items-center border-3 border-black"
          style={{ border: '2px solid black' }}
        >
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
      <div
        className="bg-[#d8e9fe] w-[90%] h-1/4 flex-col flex items-center "
        style={{ border: '2px solid black' }}
      >
        <div
          className="flex items-center w-full h-1/5 justify-between px-9"
          style={{ border: '2px solid black' }}
        >
          <h1 className="text-3xl">Discover More Promos</h1>
          <Link
            to="/promo"
            className="text-blue-500 font-bold hover:text-blue-700 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid w-full gap-4 h-4/5">
          <figure className="w-full h-full flex flex-col gap-5">
            <img
              className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
              src={active}
              alt={'gallery-image'}
              onClick={handleChangeImage}
            />
            <div className="flex justify-around items-center">
              <h1>Promo: {changePromo} </h1>
              <h1>Price: {changePrice}</h1>
            </div>
          </figure>
          <div className="grid grid-cols-5 gap-4">
            {promo?.data?.slice(0, 5).map((promo) => (
              <div key={promo.id}>
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
      <div className="bg-white w-[90%] h-1/4 flex flex-col justify-center items-center">
        <div
          className="flex items-center w-full h-1/5 justify-between px-9"
          style={{ border: '2px solid black' }}
        >
          <h1 className="text-3xl">Discover Our Fun Activities Here</h1>
        </div>
        <div className="grid w-full gap-4 h-4/5">
          <Tabs value={categories.data?.[0]?.name || 'default'}>
            <TabsHeader>
              {categories.data?.map((category) => (
                <Tab
                  key={category.id}
                  value={category.name}
                  onClick={handleCategory}
                >
                  {category.name}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="grid grid-cols-1 gap-4 ">
              {activities.data
                ?.filter((activity) => activity.categoryId === categories.data?.id)
                .map((activity) => (
                  <TabPanel
                    className="grid grid-cols-2 gap-4 md:grid-cols-3"
                    key={activity.categoryId}
                    value={activity.categoryId}
                  >
                    {activity.data?.map((activity, index) => (
                      <div key={index}>
                        <img
                          className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                          src={activity.imageUrls[0]}
                          alt="image-photo"
                        />
                      </div>
                    ))}
                  </TabPanel>
                ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
      <div className="bg-blue-200 w-[90%] h-1/4 flex flex-col justify-center items-center">
        <h1 className="text-3xl">Categories</h1>
      </div>
    </UserLayout>
  );
};

export default Home;
