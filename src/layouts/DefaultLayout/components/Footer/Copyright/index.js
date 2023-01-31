import { NavLink } from 'react-router-dom'
import { Wrapper } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function Copyright() {
    return (
        <div className={cx('copyright')}>
            <Wrapper className={cx('wrapper')}>
                <div className={cx('content')}>
                    © Copyright by <NavLink to="/">Co May Dormitory</NavLink>{' '}
                    2023.
                </div>
            </Wrapper>
        </div>
    )
}
