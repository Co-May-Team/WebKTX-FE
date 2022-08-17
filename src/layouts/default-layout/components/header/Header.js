import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { VscChromeClose } from 'react-icons/vsc';
import { Wrapper, Button } from '~/components/customs';
import { bindClassNames } from '~/utils';
import styles from './Header.module.scss';

const cx = bindClassNames(styles);
const navList = [
  { id: Math.random(), display: 'Trang chủ', to: '/' },
  { id: Math.random(), display: 'giới thiệu', to: '/introduces' },
  { id: Math.random(), display: 'Thông báo', to: '/notifications' },
  { id: Math.random(), display: 'tin tức', to: '/news' },
  { id: Math.random(), display: 'biểu mẫu', to: '/form-download' },
];

function Header() {
  const [isShow, setShow] = useState(false);
  const headerRef = useRef();
  const navbarRef = useRef();
  const barsBtnRef = useRef();

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
  useEffect(() => {
    if (isShow) {
      navbarRef.current.classList.add(cx('visible'));
    } else {
      navbarRef.current.classList.remove(cx('visible'));
    }
  }, [isShow]);

  useEffect(() => {
    function handleResize() {
      const mobileWidth = 768;
      if (window.innerWidth > mobileWidth) {
        setShow(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        !barsBtnRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    }
    // Bind the event listener
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const headerheight = 80;
      if (
        document.body.scrollTop > headerheight ||
        document.documentElement.scrollTop > headerheight
      ) {
        headerRef.current.classList.add(cx('shrink'));
      } else {
        headerRef.current.classList.remove(cx('shrink'));
      }
    }
    // Bind the event listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cx('container')} ref={headerRef}>
      <Wrapper className={cx('wrapper')}>
        {/* Logo */}
        <div className={cx('logo')}>Logo</div>
        <Button className={cx('bars-icon')} onClick={() => setShow(!isShow)}>
          <FaBars />
        </Button>
        {/* Navbar */}
        <div className={cx('navbar')} ref={navbarRef}>
          <nav className={cx('main-nav')}>{renderNavList()}</nav>
          {/* line */}
          <div className={cx('line')}></div>
          <Button
            ref={barsBtnRef}
            className={cx('close')}
            onClick={() => setShow(false)}
          >
            <VscChromeClose />
          </Button>
        </div>
      </Wrapper>
    </header>
  );
}

export default Header;
