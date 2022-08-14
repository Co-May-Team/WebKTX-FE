import PropTypes from 'prop-types';

import { Header, Footer } from './components';

function MainLayout({ children }) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
}

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
