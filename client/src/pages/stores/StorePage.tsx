import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import ReviewModal from '../../components/ReviewModal';
import Modal from '../../components/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import StoreLayout from '../../components/StoreLayout';
import LoadingScreen from '../../components/LoadingScreen';
import './styles/storePage.css';

const NoStoreFound = () => (
  <section className="store store--missing">Store not found</section>
);

const StorePage = () => {
  const [selectedReview, setSelectedReview] = React.useState<any>(null);
  const [detailVisible, setDetailVisible] = React.useState<boolean>(false);
  const [dateTime, setDateTime] = React.useState(new Date());
  const { storeId } = useParams();

  const { isLoading, data: store } = useQuery('/stores', async () => {
    const { data } = await axios.get(`/store/${storeId}`);

    return Object.keys(data).length === 0 ? null : data;
  });

  if (isLoading) return <LoadingScreen />;
  if (!store) return <NoStoreFound />;

  return (
    <section className="store">
      {detailVisible ? (
        <Modal onClose={() => setDetailVisible(false)}>
          <h3 className="store__details-heading">{store.name}</h3>

          <div className="store__details-item">{store.location}</div>
          <div className="store__details-item">
            {store.phone ? store.phone : 'No Phone number listed'}
          </div>
        </Modal>
      ) : null}

      <header className="store__header">
        <img
          className="store__background"
          src={store.headerImage}
          alt="Store header"
        />
        <img className="store__icon" src={store.icon} alt="Store icon" />

        <div className="store__wrapper">
          <h3 className="store__heading">{store.name}</h3>

          <button
            className="store__toggle"
            type="button"
            onClick={() => setDetailVisible(!detailVisible)}
          >
            d<i className="fas fa-info-circle" />
          </button>

          <div className="store__info">
            <span className="store__info-tags">{store.tags}</span>
            <span className="store__info-dividor">
              <i className="fas fa-circle" />
            </span>
            <span className="store__info-rating">
              {`${store.avgRating} `}
              <i className="fas fa-star" />
            </span>
          </div>
        </div>
      </header>

      <div className="store__reviews">
        <Link className="store__view-more" to={`/stores/${store.id}/reviews`}>
          See All Reviews
        </Link>
        <h4 className="store__reviews-heading">Reviews</h4>

        {selectedReview ? (
          <ReviewModal
            username={selectedReview.username}
            message={selectedReview.message}
            onClose={() => setSelectedReview(null)}
          />
        ) : null}

        <ul className="store__reviews-list">
          {store.reviews.length === 0 && (
            <li className="store__reviews-item store__reviews-item--empty">
              No reviews
            </li>
          )}

          {store.reviews.map((review: any) => (
            <li className="store__reviews-item" key={`review-${review.id}`}>
              <button
                className="store__reviews-toggle"
                type="button"
                onClick={() => setSelectedReview(review)}
              >
                <h3 className="store__reviews-user">{review.username}</h3>
                <p className="store__reviews-message">{review.message}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="store__availability">
        <h3 className="store__subheading">Make Reservation</h3>
        <div className="store__datepicker">
          <DatePicker
            selected={dateTime}
            onChange={(date: Date) => setDateTime(date)}
            showTimeSelect
          />
        </div>

        <StoreLayout />
      </div>
    </section>
  );
};

export default StorePage;
