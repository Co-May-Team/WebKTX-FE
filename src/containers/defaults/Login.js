/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from 'formik'
import { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { InputField } from '~/components/Customs'
import { login } from '~/store/auth/actions'
import { authSelector } from '~/store/selectors'

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
  const onSuccess = (response) => {
    const info = parseJwt(response.credential)
    console.log('Đăng nhập thành công - response', response)
    console.log('Đăng nhập thành công - info', info)
    // localStorage.removeItem('userInfoGoogle')
    // localStorage.removeItem('isLogin')
    // localStorage.setItem('userInfoGoogle', JSON.stringify(info))
    // // window.location.href = 'http://localhost:3000/';
    // window.location.href = 'https://www.kytucxacomay.tk/'
  }

  const onFailure = (error) => {
    console.log('Đăng nhập thất bại', error)
  }
  function parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  }
  return (
    <div className="relative " data-nc-id="LayoutPage">
      <div
        className="absolute h-[400px] top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40"
        // src={defaultThumbnail}
        // alt="Ký Túc Xá Cỏ May"
      />
      <div className="container relative pt-10 pb-16 lg:pt-20 lg:pb-28">
        <header className="text-center max-w-2xl mx-auto">
          <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            <span className="mr-4 text-3xl md:text-4xl leading-none">🔑</span>
            ĐĂNG NHẬP
          </h2>
          <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
            Chào mừng bạn đến với Ký Túc Xá Cỏ May
          </span>
        </header>
        <div className="p-5 mx-auto bg-white rounded-[40px] shadow-lg sm:p-10 mt-10 lg:mt-20 lg:p-16 dark:bg-neutral-900">
          <div className="max-w-md mx-auto space-y-6">
            <div className="grid gap-3">
              <GoogleLogin
                clientId="864811280914-uron2hmb33ss57c3eb7jqs7ekbkm45oi.apps.googleusercontent.com"
                className="flex items-center justify-center w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                disabledStyle
                buttonText="Đăng nhập với Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
              />
              {/* <NavLink
                href="#"
                className="flex items-center justify-center w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                  height="2rem"
                  width="2rem"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                <h3 className="text-center text-sm px-3 font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  Đăng nhập với Google
                </h3>
              </NavLink> */}
            </div>
            <div className="relative text-center">
              <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                HOẶC
              </span>
              <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800" />
            </div>
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
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-6"
                >
                  <InputField
                    type="text"
                    name="username"
                    placeholder="Nhập tên người dùng..."
                    label="Tên người dùng"
                    invalid={touched.username && errors.username}
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
                    invalid={touched.password && errors.password}
                    value={values.password}
                    feedback={errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <NavLink
                    className="text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000 text-sm"
                    to="/auth/forgot-password"
                  >
                    Quên mật khẩu?
                  </NavLink>
                  <button
                    type="submit"
                    disabled={!(dirty && isValid)}
                    className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                  >
                    Đăng nhập
                    {isSubmitting && '...'}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
