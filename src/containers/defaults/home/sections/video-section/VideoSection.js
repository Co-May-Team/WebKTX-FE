import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { Swiper } from '~/components/customs';
import { bindClassNames } from '~/utils';
import DefaultSection from '../default-section/DefaultSection';
import styles from './VideoSection.module.scss';

const cx = bindClassNames(styles);

export default function VideoSection() {
  const breakpoints = {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  };
  const renderVideosCard = () => {
    return (
      <Swiper spaceBetween={20} breakpoints={breakpoints}>
        {[1, 2, 3, 4, 5].map((item) => (
          <SwiperSlide key={item}>
            <div className={cx('video-item')}>
              <iframe
                className={cx('video-frame')}
                src="https://www.youtube.com/embed/-taMLkDG_ao"
                title="[05/2017] - Ký túc xá Cỏ May học tập thực tế tại doanh nghiệp Cỏ May - tỉnh Đồng Tháp"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className={cx('video-title')}>
                [05/2017] - Ký túc xá Cỏ May học tập thực tế tại doanh nghiệp Cỏ
                May - tỉnh Đồng Tháp
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };
  return (
    <DefaultSection title="VIDEO CỎ MAY">
      <div className={cx('body')}>{renderVideosCard()}</div>
    </DefaultSection>
  );
}
