import defaultAvatar from '~/assets/images/dormitory.jpg'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function Account(props) {
    return (
        <div className={cx('container')}>
            <div className={cx('info')}>
                <div className={cx('name')}>Admin</div>
                <div className={cx('position')}>Ký túc xá Cỏ May</div>
            </div>
            <img className={cx('avatar')} src={defaultAvatar} alt="avt" />
        </div>
    )
}

Account.propTypes = {}

export default Account
