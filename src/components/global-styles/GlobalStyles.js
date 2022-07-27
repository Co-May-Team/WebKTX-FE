import PropTypes from 'prop-types';

import '~/styles/index.scss';

function GlobalStyles({ children }) {
  return children;
}

export default GlobalStyles;

GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};
