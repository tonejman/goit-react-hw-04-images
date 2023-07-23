import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onLoadMore }) => {
  const chandleClick = () => {
    onLoadMore();
  };

  return (
    <div>
      <button className={css.button} onClick={chandleClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};

export default Button;
