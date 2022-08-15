import PropTypes from 'prop-types';
import { bindClassNames } from '~/utils';
import { Footer, Header } from './components';
import styles from './DefaultLayout.module.scss';

const cx = bindClassNames(styles);

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className={cx('default')}>{children}</div>
      <Footer />
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
