import { FaBars } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useEventListener } from '~/hooks'
import {
  toggleSidebarBackdropShow,
  toggleSidebarShow,
} from '~/store/sidebar/actions'
import Account from './Account'

function Header() {
  const dispatch = useDispatch()

  const handleResize = () => {
    const mobileWidth = 768
    if (window.innerWidth < mobileWidth) {
      dispatch(toggleSidebarBackdropShow(true))
    } else {
      dispatch(toggleSidebarBackdropShow(false))
    }
  }

  useEventListener('resize', handleResize)

  return (
    <header className="header header-sticky mb-4">
      <FaBars
        size={35}
        className="header-toggler ps-1"
        onClick={() => dispatch(toggleSidebarShow())}
      />
      <div className="col" />
      <Account />
    </header>
  )
}

export default Header
