import { NavLink } from 'react-router-dom'
import { LogoIcon } from '~/components/Icons'
import { bindClassNames, path } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function Logo() {
  return (
    <NavLink to={path.HOME}>
      <div
        className={
          'icon icon-custom-size sidebar-brand-full ' + cx('Container')
        }
      >
        {/* LogoIcon */}
        <LogoIcon />
        {/* Logo name */}
        <div className={cx('LogoName')}>
          <span>KÝ TÚC XÁ</span>
          <span>Cỏ May</span>
        </div>
      </div>
      <div className="icon icon-custom-size sidebar-brand-narrow">
        <LogoIcon />
      </div>
    </NavLink>
  )
}

export default Logo
