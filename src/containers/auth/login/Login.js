import { FcGoogle } from 'react-icons/fc'
import { Button, InputField } from '~/components/customs'
import { bindClassNames } from '~/utils'
import styles from './Login.module.scss'

const cx = bindClassNames(styles)

export default function Login() {
    const backgroundImage =
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

    return (
        <div className={cx('container')}>
            <div className={cx('inner')}>
                <div
                    className={cx('img')}
                    style={{ backgroundImage: `url('${backgroundImage}')` }}
                ></div>
                <div className={cx('content')}>
                    <h3 className={cx('title')}>Đăng nhập</h3>
                    <div className={cx('form')}>
                        <InputField label="Tên đăng nhập / email (*)" />
                        <InputField label="Mật khẩu (*)" />
                        <div className={cx('actions')}>
                            <Button className={cx('btn-login')}>
                                Đăng nhập
                            </Button>
                            <Button className={cx('btn-forgot-pwd')}>
                                Quên mật khẩu
                            </Button>
                        </div>
                    </div>
                    <Button className={cx('google-login')}>
                        <FcGoogle />
                        Đăng nhập với Google
                    </Button>
                </div>
            </div>
        </div>
    )
}
