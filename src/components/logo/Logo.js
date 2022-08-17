import classnames from 'classnames/bind';

import styles from './Logo.module.scss';
import { LogoIcon } from '../icons';

const cx = classnames.bind(styles);

function Logo() {
  return (
    <div className={cx('logo')}>
      <LogoIcon />
      <div className={cx('logo-name')}>
        <span>KÝ TÚC XÁ</span>
        <span>CỎ MAY</span>
      </div>
    </div>
  );
}

export default Logo;
