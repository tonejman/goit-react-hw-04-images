import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ onClickImage, largeimage, src, alt }) => {
  return (
    <>
      <li className={css['gallery-item']}>
        <img
          className={css['gallery-item_image']}
          onClick={() => onClickImage(largeimage)}
          largeimage={largeimage}
          src={src}
          alt={alt}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  onClickImage: PropTypes.func,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeimage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
