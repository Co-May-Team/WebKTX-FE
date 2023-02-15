import classNames from 'classnames/bind'
import Copyright from './Copyright'
import styles from './index.module.scss'
import Widgets from './Widgets'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <footer className={cx('Container')}>
            {/* Widgets */}
            <Widgets></Widgets>
            {/* Copyright */}
            <Copyright></Copyright>
        </footer>
    )
}

export default Footer
