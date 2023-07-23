import { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import getParams, { getTotalPages } from './apiget';
import { Loader } from './Loader';
import Modal from './Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [, setLoadMore] = useState(false);

  const handleSubmit = event => {
    setQuery(event);
    setPage(1);
    setIsLoading(true);
    setImages([]);
    setLoadMore(false);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const data = await getParams(query, page);

        if (data.hits.length === 0) {
          return;
        }

        setImages(prevImages => [...prevImages, ...data.hits]);

        setLoadMore(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setPage(prevState => prevState + 1);
  };

  const ShowButton = () => {
    const noMoreImages = getTotalPages === page;

    if (images.length < 12 || noMoreImages) {
      return false;
    } else if (query !== null) {
      return true;
    }
  };

  const onClickImage = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const onModalClose = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div className="wrapper">
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader name="ThreeDots" />}
      <ImageGallery
        images={images}
        onLoadMore={handleLoadMore}
        onClickImage={onClickImage}
      />
      {ShowButton() && <Button onLoadMore={handleLoadMore} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </div>
  );
};

export default App;
