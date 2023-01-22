import { Wrapper } from '~/components/customs'
import { bindClassNames } from '~/utils'
import Account from './Account'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

function Header() {
    return (
        <header className={cx('container')}>
            <Wrapper className={cx('wrapper')}>
                <Account />
            </Wrapper>
        </header>
    )
}

export default Header
