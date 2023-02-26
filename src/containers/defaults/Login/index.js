/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from 'formik'
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Spinner } from 'reactstrap'
import * as Yup from 'yup'
import { InputField, Wrapper } from '~/components/Customs'
import { login } from '~/store/auth/actions'
import { authSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
const cx = bindClassNames(styles)
export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector(authSelector).userInfo
    const status = useSelector(authSelector).status

    useEffect(() => {
        if (userInfo?.id) {
            navigate('/admin')
        }
    }, [status])

    /* Xử lý form */
    const initialValues = {
        username: '',
        password: '',
    }
    const validationSchema = Yup.object({
        username: Yup.string().required('Vui lòng nhập tên người dùng.'),
        password: Yup.string().required('Vui lòng nhập mật khẩu.'),
    })
    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        await dispatch(login(values))
        actions.setSubmitting(false)
    }
    //
    const dangNhhapThanhCong = (response) => {
        const info = parseJwt(response.credential);
        console.log("Đăng nhập thành công - response", response);
        console.log("Đăng nhập thành công - info", info);
        localStorage.removeItem('userInfoGoogle');
        localStorage.removeItem('isLogin');
        localStorage.setItem(
            'userInfoGoogle',
            JSON.stringify(info));
        // window.location.href = 'http://localhost:3000/';
        window.location.href = 'http://222.255.238.159:3800/'; 
        
    }
    const thoat = (response) => {
        console.log("Đã thoát", response);
    }
    const dangNhapThatBai = (response) => {
        console.log("Đăng nhập thất bại", response);
    }
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
    const backgroundImage =
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

    return (
        <Wrapper>
            <GoogleOAuthProvider clientId="864811280914-uron2hmb33ss57c3eb7jqs7ekbkm45oi.apps.googleusercontent.com">
                <div className={cx('container')}>
                    <div className={cx('inner')}>
                        <div
                            className={cx('img')}
                            style={{ backgroundImage: `url('${backgroundImage}')` }}
                        ></div>
                        <div className={cx('content')}>
                            <h3 className={cx('title')}>Đăng nhập</h3>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isValid,
                                    dirty,
                                    isSubmitting,
                                }) => (
                                    <Form
                                        onSubmit={handleSubmit}
                                        className={cx('form')}
                                    >
                                        <InputField
                                            type="text"
                                            name="username"
                                            placeholder="Nhập tên người dùng..."
                                            label="Tên người dùng"
                                            inputClassName={cx({
                                                'is-invalid':
                                                    touched.username &&
                                                    errors.username,
                                            })}
                                            invalid={
                                                touched.username && errors.username
                                            }
                                            value={values.username}
                                            feedback={errors.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <InputField
                                            type="password"
                                            name="password"
                                            placeholder="Nhập mật khẩu..."
                                            label="Mật khẩu"
                                            inputClassName={cx({
                                                'is-invalid':
                                                    touched.password &&
                                                    errors.password,
                                            })}
                                            invalid={
                                                touched.password && errors.password
                                            }
                                            value={values.password}
                                            feedback={errors.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <div className={cx('actions')}>
                                            <Button
                                                color="primary"
                                                type="submit"
                                                disabled={!(dirty && isValid)}
                                            >
                                                Đăng nhập
                                                {isSubmitting && (
                                                    <Spinner
                                                        color="white"
                                                        size="sm"
                                                        className="ms-2"
                                                    >
                                                        Loading...
                                                    </Spinner>
                                                )}
                                            </Button>
                                            <div className={cx('btn-forgot-pwd')}>
                                                Quên mật khẩu
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            {/* <Button>
                            <FcGoogle />
                            Đăng nhập với Google
                        </Button> */}
                            <GoogleLogin
                                onSuccess={dangNhhapThanhCong} onError={dangNhapThatBai}
                            /> &nbsp;
                        </div>
                    </div>
                </div>
            </GoogleOAuthProvider>
        </Wrapper>
    )
}
