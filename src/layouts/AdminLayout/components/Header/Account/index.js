import { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { FaCogs } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import defaultAvatar from '~/assets/images/dormitory.jpg'
import Dropdown from '~/components/Customs/Dropdown'
import DropdownItem from '~/components/Customs/Dropdown/DropdownItem'
import { logout } from '~/store/auth/actions'
import { authSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function Account(props) {
  const userInfo = useSelector(authSelector).userInfo

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [visibleAction, setVisibleAction] = useState(false)
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <Dropdown
      visible={visibleAction}
      setVisible={(visible) => setVisibleAction(visible)}
      toggleButton={
        <div className={cx('container')}>
          {/* <div className={cx('info')}>
                        <div className={cx('name')}>Quản trị viên</div>
                        <div className={cx('position')}>Ban quản lý Ký Túc Xá</div>
                    </div> */}
          <img className={cx('avatar')} src={defaultAvatar} alt="avt" />
        </div>
      }
      animationClassNames="animate__animated animate__slideInRight"
    >
      <NavLink
        to="/admin"
        className={({ isActive }) => (isActive ? 'bg-primary text-white' : '')}
      >
        <DropdownItem>
          <FaCogs className="me-2" />
          CPanel
        </DropdownItem>
      </NavLink>
      <DropdownItem onClick={handleLogout}>
        <BiLogOut className="me-2" />
        Đăng xuất
      </DropdownItem>
    </Dropdown>
  )
}

Account.propTypes = {}

export default Account
