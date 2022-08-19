import { NavLink } from 'react-router-dom';
import { LogoIcon } from '~/components/icons';
import { bindClassNames, path } from '~/utils';
import styles from './Logo.module.scss';

const cx = bindClassNames(styles);

function Logo() {
  return (
    <NavLink to={path.HOME} className={cx('logo')}>
      {/* LogoIcon */}
      <LogoIcon className={cx('logo-icon')} />
      {/* Logo name */}
      <div className={cx('logo-name')}>
        <span>KÝ TÚC XÁ</span>
        <span>Cỏ May</span>
      </div>
    </NavLink>
  );
}

export default Logo;
