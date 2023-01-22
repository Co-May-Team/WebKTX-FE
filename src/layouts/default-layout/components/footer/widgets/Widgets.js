import { Wrapper } from '~/components/customs'
import { bindClassNames, path } from '~/utils'
import WidgetItem from './WidgetItem'
import styles from './Widgets.module.scss'

const cx = bindClassNames(styles)
const widgets = [
    {
        id: Math.random(),
        title: 'liên kết nhanh',
        links: [
            {
                id: Math.random(),
                to: path.INTRODUCE,
                display: 'Giới thiệu',
            },
            {
                id: Math.random(),
                to: path.NOTIFICATION,
                display: 'Thông báo',
            },
            {
                id: Math.random(),
                to: path.NEWS,
                display: 'Tin tức',
            },
            {
                id: Math.random(),
                to: path.FORMS_DOWNLOAD,
                display: 'Biểu mẫu',
            },
        ],
    },
    {
        id: Math.random(),
        title: 'liên kết',
        links: [
            {
                id: Math.random(),
                href: 'https://www.facebook.com/profile.php?id=100077916485181',
                display: 'Cỏ May Lai Vung',
            },
            {
                id: Math.random(),
                href: 'https://www.facebook.com/profile.php?id=100077916485181',
                display: 'Sinh viên',
            },
            {
                id: Math.random(),
                href: 'https://www.facebook.com/profile.php?id=100077916485181',
                display: 'Youtube',
            },
            {
                id: Math.random(),
                href: 'https://www.facebook.com/profile.php?id=100077916485181',
                display: 'Facebook',
            },
        ],
    },
]

export default function Widgets() {
    return (
        <div className={cx('widgets')}>
            <Wrapper>
                <div className={cx('inner')}>
                    {widgets.map((item) => (
                        <WidgetItem widgetItem={item} key={item.id} />
                    ))}
                    <div className={cx('widget-item')}>
                        <h4 className={cx('title')}>KÝ TÚC XÁ</h4>
                        <div className={cx('contact-list')}>
                            <div className={cx('contact-item')}>
                                <span>Địa chỉ:</span>
                                <span>
                                    Đường Số 4, Khu Phố 6, Phường Linh Trung, TP
                                    Thủ Đức, TP. Hồ Chí Minh.
                                </span>
                            </div>
                            <div className={cx('contact-item')}>
                                <span>Số điện thoại:</span>
                                <span>0913.887.055</span>
                            </div>
                            <div className={cx('contact-item')}>
                                <span>Email:</span>
                                <span>kytucxa@comaygroup.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}
