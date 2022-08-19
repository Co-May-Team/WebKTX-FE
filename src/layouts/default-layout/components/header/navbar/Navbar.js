import { memo, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { VscChromeClose } from 'react-icons/vsc';

import { Button } from '~/components/customs';
import { useClickOutside } from '~/hooks';
import { path, bindClassNames, handleClassName } from '~/utils';
import styles from './Navbar.module.scss';

const cx = bindClassNames(styles);
const navList = [
  { id: Math.random(), display: 'Trang chủ', to: path.HOME },
  { id: Math.random(), display: 'giới thiệu', to: path.INTRODUCE },
  { id: Math.random(), display: 'Thông báo', to: path.NOTIFICATION },
  { id: Math.random(), display: 'tin tức', to: path.NEWS },
  { id: Math.random(), display: 'biểu mẫu', to: path.FORMS_DOWNLOAD },
];

function Navbar({ isShow, setShow }) {
  const navbarRef = useRef();

  const renderNavList = () => {
    return navList.map((item) => (
      <NavLink
        to={item.to}
        key={item.id}
        className={({ isActive }) => cx('nav-item', { active: isActive })}
        onClick={() => setShow(false)}
      >
        {item.display}
      </NavLink>
    ));
  };

  useClickOutside(navbarRef, () => setShow(false));

  useEffect(() => {
    const className = cx('visible');
    if (isShow) {
      handleClassName.add(navbarRef, className);
    } else {
      handleClassName.remove(navbarRef, className);
    }
  }, [isShow]);

  return (
    <div className={cx('navbar')} ref={navbarRef}>
      <nav className={cx('main-nav')}>{renderNavList()}</nav>
      <Button className={cx('close')} onClick={() => setShow(false)}>
        <VscChromeClose />
      </Button>
    </div>
  );
}

export default memo(Navbar);
