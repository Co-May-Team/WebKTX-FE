/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from 'formik'
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'reactstrap'
import * as Yup from 'yup'
import { InputField } from '~/components/customs'
import { login } from '~/store/auth/actions'
import { authSelector } from '~/store/selectors'
import { bindClassNames } from '~/utils'
import styles from './Login.module.scss'

const cx = bindClassNames(styles)

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector(authSelector).userInfo
    const status = useSelector(authSelector).status

    useEffect(() => {
        if (userInfo) {
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
        dispatch(login(values))
        actions.setSubmitting(false)
    }
    //

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
                        }) => (
                            <Form
                                onSubmit={handleSubmit}
                                className={cx('form')}
                            >
                                <InputField
                                    type="text"
                                    name="username"
                                    placeholder="Tên người dùng"
                                    label="Nhập tên người dùng..."
                                    inputClassName={cx({
                                        'is-invalid':
                                            touched.username && errors.username,
                                    })}
                                    value={values.username}
                                    feedback="Vui lòng nhập tên người dùng."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    label="Nhập mật khẩu"
                                    inputClassName={cx({
                                        'is-invalid':
                                            touched.password && errors.password,
                                    })}
                                    value={values.password}
                                    feedback="Vui lòng nhập mật khẩu."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <div className={cx('actions')}>
                                    <Button
                                        type="submit"
                                        disabled={!(dirty && isValid)}
                                        className={cx('btn-login')}
                                    >
                                        <span className="fw-bold fs-4">
                                            Đăng nhập
                                        </span>
                                        {status === 'loading' && (
                                            <div className="d-inline text-center ms-3">
                                                <div className="spinner-border"></div>
                                            </div>
                                        )}
                                    </Button>
                                    <Button className={cx('btn-forgot-pwd')}>
                                        Quên mật khẩu
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <Button className={cx('google-login')}>
                        <FcGoogle />
                        Đăng nhập với Google
                    </Button>
                </div>
            </div>
        </div>
    )
}
