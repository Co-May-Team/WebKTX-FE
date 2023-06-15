/* eslint-disable react-hooks/exhaustive-deps */
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { Formik } from "formik"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"
import Motion from "~/components/Motion"
import SeoHelmet from "~/components/SeoHelmet"
import { getUserInfo, login } from "~/store/auth/actions"
import { authSelector } from "~/store/selectors"

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(authSelector).status

  useEffect(() => {
    if (status === "user") {
      navigate(-1)
    }
  }, [status])

  /* Xử lý form */
  const initialValues = {
    username: "",
    password: "",
  }
  const validationSchema = Yup.object({
    username: Yup.string().required("Tên đăng nhập không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
  })
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    await dispatch(login(values))
    actions.setSubmitting(false)
  }
  //
  const onSuccess = async (response) => {
    const info = parseJwt(response.credential)
    localStorage.setItem("accessToken", "Bearer " + response.credential)
    await dispatch(getUserInfo(info.email))
  }

  const onFailure = (error) => {
    Swal.fire({
      title: "Lỗi",
      text: error?.message || "Vui lòng liên hệ nhà phát triển trang Web",
      icon: "error",
    })
  }
  function parseJwt(token) {
    var base64Url = token.split(".")[1]
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join("")
    )

    return JSON.parse(jsonPayload)
  }
  return (
    <Motion>
      <SeoHelmet title='Đăng nhập' />
      <div className='relative'>
        <div
          className='absolute h-[400px] top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40'
          // src={defaultThumbnail}
          // alt="Ký Túc Xá Cỏ May"
        />
        <div className='container relative pt-10 pb-16 lg:pt-20 lg:pb-28'>
          <div className='p-5 mx-auto bg-white rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'>
            <header className='text-center max-w-2xl mx-auto'>
              <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                ĐĂNG NHẬP
              </h2>
              <span className='block text-sm text-neutral-700 sm:text-base dark:text-neutral-200'>
                Chào mừng bạn đến với Ký Túc Xá Cỏ May
              </span>
            </header>
            <div className='max-w-md mx-auto space-y-6 mt-10 mb-10'>
              <GoogleOAuthProvider
                clientId='864811280914-uron2hmb33ss57c3eb7jqs7ekbkm45oi.apps.googleusercontent.com'
                className='grid gap-3'
              >
                <GoogleLogin
                  className='flex items-center justify-center w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]'
                  disabledStyle
                  buttonText='Đăng nhập với Google'
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={false}
                />
              </GoogleOAuthProvider>
              <div className='relative text-center'>
                <span className='relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900'>
                  HOẶC
                </span>
                <div className='absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800' />
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
                    id='formLogin'
                    onSubmit={handleSubmit}
                    className='grid grid-cols-1 gap-6'
                  >
                    <InputField
                      id='username'
                      type='text'
                      name='username'
                      placeholder='Nhập tên đăng nhập...'
                      label='Tên đăng nhập'
                      invalid={touched.username && errors.username}
                      value={values.username}
                      feedback={errors.username}
                      onChange={handleChange}
                      isRequired
                    />
                    <InputField
                      id='password'
                      type='password'
                      name='password'
                      placeholder='Nhập mật khẩu...'
                      label='Mật khẩu'
                      invalid={touched.password && errors.password}
                      value={values.password}
                      feedback={errors.password}
                      onChange={handleChange}
                      isRequired
                    />
                    {/* <NavLink
                      className='text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000 text-sm'
                      to={path.SIGNUP}
                    >
                      Chưa có tài khoản?
                    </NavLink> */}
                    <button
                      id='loginFormSubmit'
                      type='submit'
                      className='relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                    >
                      Đăng nhập
                      {isSubmitting && "..."}
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  )
}
