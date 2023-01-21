
import { Wrapper } from '~/components/customs'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'
import Account from './Account'

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
