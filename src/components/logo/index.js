import { NavLink } from 'react-router-dom'
import { LogoIcon } from '~/components/Icons'
import { bindClassNames, path } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function Logo({ className }) {
    return (
        <NavLink to={path.HOME} className={cx('logo')}>
            {/* LogoIcon */}
            <LogoIcon className={cx('logo-icon')} />
            {/* Logo name */}
            <div className={cx('logo-name')}>
                <span>KÝ TÚC XÁ</span>
                <span>Cỏ May</span>
            </div>
        </NavLink>
    )
}

export default Logo
