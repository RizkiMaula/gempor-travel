import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DetailActivity = () => {
  const { id } = useParams();
  const [dataAct, setDataActivity] = useState([]);

  const getDataActivity = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
      headers: {
        apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.data);
        setDataActivity(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataActivity();
  }, []);

  const getGoogleMapsUsingRegex = (url) => {
    const regex = /<iframe.*?src=['"](.*?)['"].*?>/;
    const match = url?.match(regex);
    if (match) {
      return match[1];
    }
  };

  return (
    <>
      <section className="detail-activity">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Title: {dataAct?.title}</h5>
                  <p className="card-text">Description: {dataAct?.description}</p>
                  <p className="card-text">Date: {dataAct?.createdAt}</p>
                  <p className="card-text">Price: {dataAct?.price}</p>
                  <p className="card-text">Address: {dataAct?.address}</p>
                  <p className="card-text">Country: {dataAct?.category?.name}</p>
                  <p className="card-text">
                    <iframe
                      src={getGoogleMapsUsingRegex(dataAct?.location_maps)}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full rounded-md h-96"
                    ></iframe>
                  </p>
                  <Link
                    to="/admin/activity"
                    className="btn btn-primary"
                  >
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailActivity;
