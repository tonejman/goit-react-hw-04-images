import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ onClickImage, images }) => {
  return (
    <ul className={css['image-gallery']}>
      {images.map(el => (
        <ImageGalleryItem
          key={el.id}
          src={el.webformatURL}
          alt={el.tags}
          largeimage={el.largeImageURL}
          onClickImage={onClickImage}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onClickImage: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGallery;
