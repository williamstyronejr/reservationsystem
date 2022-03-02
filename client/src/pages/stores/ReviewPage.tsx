import React from 'react';
// import { useParams } from 'react-router-dom';
import './styles/reviewsPage.css';

const ReviewsPage = () => {
  // const { storeId } = useParams();

  const reviews: any = [
    {
      id: '123',
      username: 'User 1',
      message: 'Test Review Message',
    },
    {
      id: '123',
      username: 'User 1',
      message: 'Test Review Message',
    },
    {
      id: '123',
      username: 'User 1',
      message: 'Test Review Message',
    },
    {
      id: '123',
      username: 'User 1',
      message: 'Test Review Message',
    },
    {
      id: '123',
      username: 'User 1',
      message: 'Test Review Message',
    },
    {
      id: '123',
      username: 'User 1',
      message: 'Test Review Message',
    },
  ];

  return (
    <section className="reviews">
      <header className="reviews__header">
        <h2 className="reviews__heading">Reviews</h2>
      </header>

      <div className="">
        <ul className="reviews__list">
          {reviews.map((review: any) => (
            <li className="reviews__item" key={`reviews-${review.id}`}>
              <h3 className="reviews__username">{review.username}</h3>
              <p className="reviews__message">{review.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReviewsPage;
