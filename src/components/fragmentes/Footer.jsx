import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const { data, loading } = useFetch('api/v1/promos');
  return (
    <footer className="w-full bg-white border-3 border-red py-9 bottom-0 relative ">
      <div className="mx-[3rem] my-[1.5rem] flex flex-col gap-9 justify-between  h-[20rem]">
        <div className=" flex justify-between h-full">
          <div className=" w-2/3 h-full flex justify-between">
            <div className="flex flex-col gap-3 w-1/3">
              <h1 className="text-black font-bold">Company</h1>
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
            <div className="flex flex-col gap-3 w-1/3">
              <h1 className="text-black font-bold">Explore</h1>
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
            <div className="flex flex-col gap-3 w-1/3">
              <h1 className="text-black font-bold">Find Promo</h1>
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
          <div className=" w-1/3">
            <div className=" w-full h-full p-3 bg-neutral-100 rounded">
              <div className="flex flex-col gap-3 w-full ">
                <h1 className="text-black font-bold">Subscribe</h1>
                <div className="flex ">
                  <input
                    type="text"
                    className="border-2 rounded-l-lg p-2 w-full "
                    placeholder="Enter your email"
                  />
                  <button className="border-2 rounded-r-lg p-2 bg-blue-500">
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
        <div className=" flex flex-col ">
          <div className="flex justify-between items-center w-full">
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
                  className="text-black text-2xl"
                />
              </button>
              <button className="border-2 border-black p-2 rounded-full w-[3rem] h-[3rem]">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="text-black text-2xl"
                />
              </button>
              <button className="border-2 border-black p-2 rounded-full w-[3rem] h-[3rem]">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-black text-2xl"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center border-t-2 border-slate-600 flex justify-center items-center p-4 ">
          <p className="text-center">Copyright © 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
