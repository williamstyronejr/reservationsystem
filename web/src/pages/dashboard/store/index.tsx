import * as React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Modal from "../../../components/Modal";
import LoadingScreen from "../../../components/LoadingScreen";
import "./index.css";

const StoreNotFound = () => (
  <section className="store store--missing">Store not found</section>
);

const StorePage = () => {
  const { id } = useParams();
  const [detailVisible, setDetailVisible] = React.useState<Boolean>(false);

  const { isLoading: fetchingStoreData, data: store } = useQuery(
    `/store/${id}`,
    async () => {
      const res = await axios(`/store/${id}`);
      return res.data;
    }
  );

  if (fetchingStoreData) return <LoadingScreen />;
  if (!store) return <StoreNotFound />;

  return (
    <section className="store">
      <header className="store__header">
        <img
          className="store__background"
          src={store.headerImage}
          alt="Store header"
        />
        <img className="store__icon" src={store.icon} alt="Store icon" />
      </header>

      <div className="store__wrapper">
        <h3 className="store__heading">{store.name}</h3>

        <button
          className="store__toggle"
          type="button"
          onClick={() => setDetailVisible(true)}
        >
          <i className="fas fa-info-circle" />
        </button>

        {detailVisible ? (
          <Modal
            onClose={() => {
              setDetailVisible(false);
            }}
          >
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
          </Modal>
        ) : null}
      </div>

      <div className="store__content">
        <aside className="store__aside">Date select</aside>

        <div className="store__reserve">
          <h3 className="store__subheading">Make Reservation</h3>
          <div className="store__datepicker">Store map</div>
        </div>
      </div>
    </section>
  );
};

export default StorePage;
