import React from 'react';
import { NavLink } from 'react-router-dom';
import { Wrapper } from '~/components/customs';
import { bindClassNames } from '~/utils';
import styles from './Copyright.module.scss';

const cx = bindClassNames(styles);

export default function Copyright() {
  return (
    <div className={cx('copyright')}>
      <Wrapper className={cx('wrapper')}>
        <div className={cx('content')}>
          © Copyright by <NavLink to="/">Co May Dormitory</NavLink> 2022.
        </div>
      </Wrapper>
    </div>
  );
}
