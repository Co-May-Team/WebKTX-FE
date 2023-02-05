import PropTypes from 'prop-types'
import React from 'react'
import { Button as BootstrapButton } from 'reactstrap'

function Button(props) {
    return <BootstrapButton {...props} />
}

Button.propTypes = {}

export default Button
