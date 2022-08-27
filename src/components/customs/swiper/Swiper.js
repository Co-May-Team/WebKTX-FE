import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Swiper as DefaultSwiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { bindClassNames, handleClassName } from '~/utils';
import styles from './Swiper.module.scss';

const cx = bindClassNames(styles);

export default function Swiper(props) {
  const { className, data, children } = props;
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const renderBullet = (index, _className) => {
    return `<span class="${_className} ${cx('dashed')}"></span>`;
  };

  const renderSwiperSlide = (data) => {
    if (!data) return;
    return data?.map((item) => (
      <SwiperSlide key={item.id}>
        <img src={item.url} alt={item.alt} className={cx('image-slide')} />
      </SwiperSlide>
    ));
  };

  const toogleNavigation = (isHidden, navRef, className) => {
    if (!navRef.current) return;
    isHidden
      ? handleClassName.add(navRef, className)
      : handleClassName.remove(navRef, className);
  };

  const handleSlideChangle = (swiper) => {
    const { isBeginning, isEnd } = swiper;
    const className = cx('hidden');

    toogleNavigation(isBeginning, navigationPrevRef, className);
    toogleNavigation(isEnd, navigationNextRef, className);
  };

  useEffect(() => {
    const className = cx('hidden');
    handleClassName.add(navigationPrevRef, className);
  }, []);

  return (
    <DefaultSwiper
      {...props}
      onSlideChange={handleSlideChangle}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = navigationPrevRef.current;
        swiper.params.navigation.nextEl = navigationNextRef.current;
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        renderBullet,
      }}
      modules={[Pagination, Navigation]}
      className={cx('default', { [className]: className })}
    >
      {/* Render image slide */}
      {data && renderSwiperSlide(data)}
      {children}
      <div ref={navigationPrevRef} className={cx('nav', 'prev')}>
        <FiArrowLeft />
      </div>
      <div ref={navigationNextRef} className={cx('nav', 'next')}>
        <FiArrowRight />
      </div>
    </DefaultSwiper>
  );
}

Swiper.propTypes = {
  breakpoints: PropTypes.object,
  // data: PropTypes.array.isRequired,
  className: PropTypes.string,
  spaceBetween: PropTypes.number,
  slidesPerView: PropTypes.number,
  onSlideChange: PropTypes.func,
  onSwiper: PropTypes.func,
};
