import React from 'react';
import { bindClassNames, path } from '~/utils';
import styles from './Home.module.scss';
import {
  HeroSection,
  ImageSection,
  IntroSection,
  NotificationSection,
  VideoSection,
} from './sections';

const cx = bindClassNames(styles);
export default function Home() {
  return (
    <div className={cx('home-container')}>
      {/* Hero section */}
      <HeroSection />

      {/* Intro */}
      <div className={cx('space-between')}>
        <IntroSection />
      </div>

      {/* Notification */}
      <div className={cx('space-between')}>
        <NotificationSection />
      </div>

      {/* image */}
      <div className={cx('space-between')}>
        <ImageSection />
      </div>

      {/* Videos */}
      <div className={cx('space-between')}>
        <VideoSection />
      </div>
    </div>
  );
}
