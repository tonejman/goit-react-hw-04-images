import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [inputSearch, setInputSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(inputSearch);

    setInputSearch('');
  };

  const handleChange = e => {
    setInputSearch(e.target.value);
  };

  return (
    <div>
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchform}>
          <button type="submit" className={css['searchform-button']}>
            <span className={css['searchform-button_label']}>Search</span>
          </button>

          <input
            className={css['searchform-input']}
            type="text"
            name="inputSearch"
            value={inputSearch}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};
