import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const Carousel = ({ text }) => {
  const { data: promo, loading: promoLoading, error: promoError, reFetch: promoReFetch } = useFetch('api/v1/promos');
  const navigate = useNavigate();
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <Slider
      className="w-[100%] h-[100%]"
      {...settings2}
    >
      {promo?.data
        ?.filter((promo, index) => index % 2 === 0)
        .map((promo) => (
          <div
            key={promo.id}
            className="h-[20rem] w-[20rem] flex flex-col justify-between text-center rounded-3xl"
          >
            <img
              src={promo.imageUrl}
              alt={promo.title}
              className="object-cover w-full h-[65%] border-2 "
            />
            <p className="z-10 text-2xl">{promo.title}</p>
            <div className="z-10 flex justify-around pb-4 text-xs">
              <p>Promo Code: {promo.promo_code}</p>
              <p>Minimum Claim: Rp. {promo.minimum_claim_price} </p>
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default Carousel;
