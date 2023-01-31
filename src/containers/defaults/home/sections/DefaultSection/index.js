import PropTypes from 'prop-types'
import { Wrapper } from '~/components/Customs'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function DefaultSection({ title, children }) {
    return (
        <Wrapper>
            <div className={cx('inner')}>
                <div className={cx('heading')}>
                    {title && <h3 className={cx('title')}>{title}</h3>}
                </div>
                {/* body */}
                {children}
            </div>
        </Wrapper>
    )
}

DefaultSection.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
}
