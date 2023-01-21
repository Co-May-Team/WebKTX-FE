import classNames from 'classnames/bind'
import Copyright from './copyright/Copyright'
import styles from './Footer.module.scss'
import Widgets from './widgets/Widgets'

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
