import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import getParams, { getTotalPages } from './apiget';
import { Loader } from './Loader';
import Modal from './Modal';

export class App extends Component {
  state = {
    images: [],
    inputSearch: '',
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    setLoading: false,
    showModal: false,
    largeImageURL: '',
  };

  handleSubmit = event => {
    this.setState({ inputSearch: event, currentPage: 1, isLoading: true });
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      const { inputSearch, currentPage, totalPages } = this.state;

      if (
        prevState.inputSearch !== inputSearch ||
        prevState.currentPage !== currentPage
      ) {
        const data = await getParams({
          inputSearch,
          currentPage,
        });

        if (prevState.inputSearch !== inputSearch) {
          this.setState({
            images: data.hits,
            totalPages: getTotalPages(data.totalHits, 12),
          });

          return this.setState({ isLoading: false });
        }

        if (totalPages < currentPage) {
          this.setState({ currentPage: totalPages + 1 });
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  ShowButton = () => {
    const { images, inputSearch, currentPage, totalPages } = this.state;
    const noMoreImages = totalPages === currentPage;

    if (images.length < 12 || noMoreImages) {
      return false;
    } else if (inputSearch !== null) {
      return true;
    }
  };

  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };
  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  onLoader = () => {
    this.setState({ isLoading: true });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <div className="wrapper">
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader name="ThreeDots" />}
        <ImageGallery
          images={images}
          onLoadMore={this.handleLoadMore}
          onClickImage={this.onClickImage}
        />
        {this.ShowButton() && <Button onLoadMore={this.handleLoadMore} />}

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}

export default App;
