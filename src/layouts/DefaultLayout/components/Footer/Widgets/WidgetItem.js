import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function WidgetItem({ widgetItem }) {
  const renderLinks = () => {
    return widgetItem.links.map((item) => {
      const Component = item?.to ? NavLink : 'a'
      return (
        <Component
          to={item.to}
          key={item.id}
          href={item.href}
          target={item.href && '_blank'}
        >
          {item.display}
        </Component>
      )
    })
  }
  return (
    <div className={cx('widget-item')}>
      <h4 className={cx('title')}>{widgetItem.title}</h4>
      <div className={cx('block-list')}>{renderLinks()}</div>
    </div>
  )
}

WidgetItem.propTypes = {
  widgetItem: PropTypes.object,
}
