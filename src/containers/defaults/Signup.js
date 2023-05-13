import { Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, NavLink } from "react-router-dom"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"
import Motion from "~/components/Motion"
import SeoHelmet from "~/components/SeoHelmet"
import { signup } from "~/store/auth/actions"
import { authSelector } from "~/store/selectors"
import { path } from "~/utils"

export default function Signup() {
  const dispatch = useDispatch()
  const status = useSelector(authSelector).status
  const userInfo = useSelector(authSelector).userInfo

  if (status === "user") {
    if (!userInfo?.admin) {
      return <Navigate to='/' />
    } else {
      return <Navigate to={`${path.ADMIN + path.ADMIN_HOME}`} replace />
    }
  }

  /* Xử lý form */
  const initialValues = {
    fullName: "",
    dob: "",
    email: "",
    phoneNumber: "",
    citizenId: "",
    username: "",
    password: "",
    repassword: "",
  }
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Họ tên không được để trống"),
    dob: Yup.string().required("Ngày sinh không được để trống"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    phoneNumber: Yup.string()
      .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại không được để trống"),
    citizenId: Yup.string().required("Số CMND/CCCD không được để trống"),
    username: Yup.string().required("Tên người dùng không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
    repassword: Yup.string()
      .required("Mật khẩu không được để trống")
      .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
  })
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    await dispatch(signup(values))
    actions.setSubmitting(false)
  }
  //
  return (
    <Motion>
      <SeoHelmet title='Đăng ký' />
      <div className='relative'>
        <div
          className='absolute h-[400px] top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40'
          // src={defaultThumbnail}
          // alt="Ký Túc Xá Cỏ May"
        />
        <div className='container relative pt-10 pb-16 lg:pt-20 lg:pb-28'>
          <div className='p-5 mx-auto bg-white rounded-[40px] shadow-lg sm:p-10 mt-10 lg:mt-20 lg:p-16 dark:bg-neutral-900'>
            <header className='text-center max-w-2xl mx-auto'>
              <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                ĐĂNG KÝ
              </h2>
              <span className='block text-sm text-neutral-700 sm:text-base dark:text-neutral-200'>
                Các bạn hãy nhập đúng thông tin bên dưới nhé!
              </span>
            </header>
            <div className='max-w-md mx-auto space-y-6 mt-10 mb-10'>
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
                  id="formSignup"
                    onSubmit={handleSubmit}
                    className='grid grid-cols-1 gap-4'
                  >
                    <InputField
                      id='fullName'
                      type='text'
                      name='fullName'
                      placeholder='Nhập họ tên...'
                      label='Họ tên'
                      invalid={touched.fullName && errors.fullName}
                      value={values.fullName}
                      feedback={errors.fullName}
                      onChange={handleChange}
                      isRequired
                    />
                    <InputField
                      id='dob'
                      type='date'
                      name='dob'
                      label='Ngày sinh'
                      invalid={touched.dob && errors.dob}
                      value={values.dob}
                      feedback={errors.dob}
                      onChange={handleChange}
                      isRequired
                    />
                    <InputField
                      id='email'
                      type='email'
                      name='email'
                      placeholder='Nhập email...'
                      label='Email'
                      invalid={touched.email && errors.email}
                      value={values.email}
                      feedback={errors.email}
                      onChange={handleChange}
                      isRequired
                    />
                    <InputField
                      id='phoneNumber'
                      type='text'
                      name='phoneNumber'
                      placeholder='Nhập số điện thoại...'
                      label='Số điện thoại'
                      invalid={touched.phoneNumber && errors.phoneNumber}
                      value={values.phoneNumber}
                      feedback={errors.phoneNumber}
                      onChange={handleChange}
                      isRequired
                    />
                    <InputField
                      id='citizenId'
                      type='text'
                      name='citizenId'
                      placeholder='Nhập số CMND/CCCD...'
                      label='Số CMND/CCCD'
                      invalid={touched.citizenId && errors.citizenId}
                      value={values.citizenId}
                      feedback={errors.citizenId}
                      onChange={handleChange}
                      isRequired
                    />
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
                    <InputField
                      id='repassword'
                      type='password'
                      name='repassword'
                      placeholder='Nhập lại mật khẩu...'
                      label='Nhập lại mật khẩu'
                      invalid={touched.repassword && errors.repassword}
                      value={values.repassword}
                      feedback={errors.repassword}
                      onChange={handleChange}
                      isRequired
                    />
                    <NavLink
                      className='text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000 text-sm'
                      to={path.LOGIN}
                    >
                      Đã có tài khoản?
                    </NavLink>
                    <button
                      id='signupFormSubmit'
                      type='submit'
                      className='relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                    >
                      Đăng ký
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
