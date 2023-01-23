import 'bootstrap/dist/css/bootstrap.css'
import PropTypes from 'prop-types'
import '~/styles/index.scss'

export default function GlobalStyles({ children }) {
    return children
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
}
