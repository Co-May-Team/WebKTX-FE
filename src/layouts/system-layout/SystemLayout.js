import PropTypes from 'prop-types'

import { Header, Sidebar } from './components'

function SystemLayout({ children }) {
    return (
        <>
            <Header></Header>
            <Sidebar></Sidebar>
            {children}
        </>
    )
}

export default SystemLayout

SystemLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
