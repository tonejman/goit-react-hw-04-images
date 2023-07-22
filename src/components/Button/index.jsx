import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

class Button extends Component {
  chandleClick = () => {
    const { onLoadMore } = this.props;
    onLoadMore();
  };

  render() {
    return (
      <div>
        <button className={css.button} onClick={this.chandleClick}>
          Load more
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onLoadMore: PropTypes.func,
};

export default Button;
