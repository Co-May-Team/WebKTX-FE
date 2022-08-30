import React from 'react';
import { bindClassNames } from '~/utils';
import { NotificationSection } from '../home/sections';
import styles from './Notifications.module.scss';

const cx = bindClassNames(styles);

export default function Notifications() {
  return <NotificationSection />;
}
