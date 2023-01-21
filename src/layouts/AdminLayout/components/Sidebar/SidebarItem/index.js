import PropTypes from 'prop-types'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function SidebarItem({ id, label, icon, to, children }) {
    const [activeParent, setActiveParent] = useState(false)
    return (
        <>
            {children && children.length > 0 ? (
                <div
                    key={id}
                    className={cx('group-item', { active: activeParent })}
                >
                    <div
                        className={cx('parent-item', { active: activeParent })}
                        onClick={() => setActiveParent(!activeParent)}
                    >
                        {icon}
                        <div className={cx('label')}>{label}</div>
                    </div>
                    {children.map((children) => (
                        <SidebarItem {...children} />
                    ))}
                </div>
            ) : (
                <NavLink
                    to={to}
                    className={({ isActive }) =>
                        isActive ? cx('item', 'active') : cx('item')
                    }
                    end
                >
                    {icon}
                    <div className={cx('label')}>{label}</div>
                </NavLink>
            )}
        </>
    )
}

SidebarItem.propTypes = {
    id: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    to: PropTypes.string,
    children: PropTypes.array,
}

export default SidebarItem
