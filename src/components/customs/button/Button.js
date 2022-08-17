import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const Button = forwardRef(({ children, className, onClick }, ref) => {
  return (
    <button
      ref={ref}
      className={cx('button', { [className]: className })}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
