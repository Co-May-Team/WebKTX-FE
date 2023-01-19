import classNames from 'classnames/bind'
import Widgets from './widgets/Widgets'
import styles from './Footer.module.scss'
import Copyright from './copyright/Copyright'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <footer className={cx('container')}>
            {/* Widgets */}
            <Widgets></Widgets>
            {/* Copyright */}
            <Copyright></Copyright>
        </footer>
    )
}

export default Footer
