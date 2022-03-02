import React from 'react';
import Modal from './Modal';
import './styles/reviewModal.css';

const ReviewModal = ({
  onClose,
  username,
  message,
}: {
  onClose: Function;
  username: String;
  message: String;
}) => (
  <Modal onClose={onClose}>
    <div className="modal__review">
      <h3 className="modal__review-heading">{username}</h3>
      <p className="modal__review-message">{message}</p>
      <button
        className="modal__review-toggle"
        type="button"
        onClick={() => onClose()}
      >
        Close
      </button>
    </div>
  </Modal>
);

export default ReviewModal;
