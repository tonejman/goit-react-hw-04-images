import { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import getParams, { getTotalPages } from './apiget';
import { Loader } from './Loader';
import Modal from './Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [, setLoadMore] = useState(false);

  const handleSubmit = event => {
    setInputSearch(event);
    setCurrentPage(1);
    setIsLoading(true);
    setImages([]);
    setLoadMore(false);
  };

  useEffect(() => {
    if (inputSearch === '') {
      return;
    }

    const getPictures = async (inputSearch, currentPage) => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await getParams(inputSearch, currentPage);

        if (hits.length === 0) {
          setImages(false);
          return;
        }

        if (totalPages < currentPage) {
          setTotalPages(totalPages => totalPages + 1);
        }

        setImages(prevImages => [...prevImages, ...hits]);

        // setLoadMore(currentPage < Math.ceil(totalHits / 12));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPictures();
  }, [inputSearch, currentPage, totalPages]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setCurrentPage(prevState => prevState + 1);
  };

  const ShowButton = () => {
    const noMoreImages = getTotalPages === currentPage;

    if (images.length < 12 || noMoreImages) {
      return false;
    } else if (inputSearch !== null) {
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
