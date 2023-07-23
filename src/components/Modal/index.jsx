import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ onModalClose, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.keyCode === 27 || e.currentTarget === e.target) {
      return onModalClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleKeyDown}>
      <div className={css.modal}>
        <img className={css.img} src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  onModalClose: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};
