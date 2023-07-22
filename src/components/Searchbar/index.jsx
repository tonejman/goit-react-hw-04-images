import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputSearch: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { inputSearch } = this.state;

    onSubmit(inputSearch);
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState(prevState => ({ ...prevState, [name]: value }));
  };

  render() {
    const { inputSearch } = this.state;
    return (
      <div>
        <header className={css.searchbar}>
          <form onSubmit={this.handleSubmit} className={css.searchform}>
            <button type="submit" className={css['searchform-button']}>
              <span className={css['searchform-button_label']}>Search</span>
            </button>

            <input
              className={css['searchform-input']}
              type="text"
              name="inputSearch"
              value={inputSearch}
              onChange={this.handleChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};