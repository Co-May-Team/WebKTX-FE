import Logo from '~/components/logo/Logo'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'
import listSidebarItem from './listSidebarItem'
import SidebarItem from './SidebarItem'

const cx = bindClassNames(styles)

function Sidebar() {
    return (
        <div className={cx('container')}>
            {/* Logo */}
            <div className={cx('wrap-logo')}>
                <Logo />
            </div>
            <div className={cx('wrap-item')}>
                {listSidebarItem.map((sidebarItem) => (
                    <SidebarItem key={sidebarItem.id} {...sidebarItem} />
                ))}
            </div>
            <div className={cx('copyright')}>
                ©{' '}
                <a className={cx('name')} href="/">
                    Co May Dormitory
                </a>{' '}
                2023
            </div>
        </div>
    )
}

export default Sidebar
