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
  const { className } = props;
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const renderBullet = (index, _className) => {
    return `<span class="${_className} ${cx('dashed')}"></span>`;
  };

  const handleSlideChangle = (swiper) => {
    const { isBeginning, isEnd } = swiper;
    const className = cx('hidden');

    isBeginning
      ? handleClassName.add(navigationPrevRef, className)
      : handleClassName.remove(navigationPrevRef, className);

    isEnd
      ? handleClassName.add(navigationNextRef, className)
      : handleClassName.remove(navigationNextRef, className);
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
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
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
  className: PropTypes.string,
  spaceBetween: PropTypes.number,
  slidesPerView: PropTypes.number,
  onSlideChange: PropTypes.func,
  onSwiper: PropTypes.func,
};
