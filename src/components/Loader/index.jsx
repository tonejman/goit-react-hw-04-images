// import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Loader.module.css';

import { ThreeDots } from 'react-loader-spinner';

export const Loader = ({ name }) => {
  if (name === 'ThreeDots') {
    return (
      <div className={css.overlay}>
        <ThreeDots
          eight="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }
};

Loader.propTypes = {
  name: PropTypes.string,
};
