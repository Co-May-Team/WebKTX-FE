import { NavLink } from 'react-router-dom';
import { bindClassNames } from '~/utils';
import styles from './Header.module.scss';

const cx = bindClassNames(styles);
function Header() {
  return (
    <div className={cx('default')}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/notifications">notifications</NavLink>
      <NavLink to="/news">news</NavLink>
    </div>
  );
}

export default Header;
