import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { onClickImage, src, alt, largeimage } = this.props;

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
  }
}

ImageGalleryItem.propTypes = {
  onClickImage: PropTypes.func,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeimage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
