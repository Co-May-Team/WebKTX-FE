import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import '~/styles/index.scss'

export default function GlobalStyles({ children }) {
    return children
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
}
