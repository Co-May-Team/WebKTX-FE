/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Badge } from 'reactstrap'

function ListItem({ items }) {
  const navLink = (name, icon, badge) => {
    const Icon = icon
    return (
      <>
        {icon && <Icon className="nav-icon" />}
        {name && name}
        {badge && (
          <Badge color={badge.color} className="ms-auto">
            {badge.text}
          </Badge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { name, badge, icon, ...rest } = item
    return (
      rest.to &&
      !rest.children && (
        <li key={index} className="nav-item">
          <NavLink
            to={rest.to}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            end
          >
            {navLink(name, icon, badge)}
          </NavLink>
        </li>
      )
    )
  }
  const navGroup = (item, index) => {
    const { name, icon } = item
    const [show, setShow] = useState(false)
    return (
      <li key={index} className={show ? 'nav-group show' : 'nav-group'}>
        <div
          className="nav-link nav-group-toggle"
          onClick={() => setShow(!show)}
        >
          {navLink(name, icon)}
        </div>
        <ul
          className="nav-group-items"
          style={show ? { display: 'block', height: 'auto' } : null}
        >
          {item.children?.map((item, index) =>
            item.children ? navGroup(item, index) : navItem(item, index)
          )}
        </ul>
      </li>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) =>
          item.children ? navGroup(item, index) : navItem(item, index)
        )}
    </React.Fragment>
  )
}

ListItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default ListItem
