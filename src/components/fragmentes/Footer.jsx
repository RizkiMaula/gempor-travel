import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const { data, loading } = useFetch('api/v1/promos');
  return (
    <footer className="relative bottom-0 w-full bg-white border-3 border-red py-9 ">
      <div className="mx-[3rem] my-[1.5rem] flex flex-col gap-9 justify-between  h-[20rem]">
        <div className="flex justify-between h-full ">
          <div className="flex justify-between w-2/3 h-full ">
            <div className="flex flex-col w-1/3 gap-3">
              <h1 className="font-bold text-black">Company</h1>
              <ul>
                <li>
                  <Link to={'#'}>About</Link>
                </li>
                <li>
                  <Link to={'#'}>Environment</Link>
                </li>
                <li>
                  <Link to={'#'}>Policy</Link>
                </li>
                <li>
                  <Link to={'#'}>Analitcs</Link>
                </li>
                <li>
                  <Link to={'#'}>Partners</Link>
                </li>
                <li>
                  <Link to={'#'}>Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col w-1/3 gap-3">
              <h1 className="font-bold text-black">Explore</h1>
              <ul>
                <li>
                  <Link to={'#'}>Recourses</Link>
                </li>
                <li>
                  <Link to={'#'}>Blog</Link>
                </li>
                <li>
                  <Link to={'#'}>Documents</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col w-1/3 gap-3">
              <h1 className="font-bold text-black">Find Promo</h1>
              <ul>
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    {data?.data?.slice(0, 3)?.map((v, i) => (
                      <li key={i}>
                        <Link to={'#'}>{v.title}</Link>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="w-1/3 ">
            <div className="w-full h-full p-3 rounded  bg-neutral-100">
              <div className="flex flex-col w-full gap-3 ">
                <h1 className="font-bold text-black">Subscribe</h1>
                <div className="flex ">
                  <input
                    type="text"
                    className="w-full p-2 border-2 rounded-l-lg "
                    placeholder="Enter your email"
                  />
                  <button className="p-2 bg-blue-500 border-2 rounded-r-lg">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-justify">
                <p>Let us make it for you. We will send you news and promotions for you by email. Hope you enjoy the promos and stay safe.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="flex items-center justify-between w-full">
            <div className="w-[4rem] h-[4rem] border-2 border-black">Logo</div>
            <div>
              <ul className="flex gap-5 font-bold ">
                <li>Terms</li>
                <li>Privacy</li>
                <li>Cookies</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button className="border-2 border-black p-2 rounded-full w-[3rem] h-[3rem]">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-2xl text-black"
                />
              </button>
              <button className="border-2 border-black p-2 rounded-full w-[3rem] h-[3rem]">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="text-2xl text-black"
                />
              </button>
              <button className="border-2 border-black p-2 rounded-full w-[3rem] h-[3rem]">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-2xl text-black"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 text-center border-t-2 border-slate-600 ">
          <p className="text-center">Copyright © 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
