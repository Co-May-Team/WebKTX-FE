import { Formik } from "formik"
import { BsArrowLeft, BsArrowRight, BsCheckLg } from "react-icons/bs"
import { Form } from "reactstrap"
import Swal from "sweetalert2"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"
import Motion from "~/components/Motion"
import admissionApi from "~/services/admissionApi"
import axiosClient from "~/services/axiosClient"

export default function FilesUploadForm({ children, handleFormChange }) {
  /* Thông tin cá nhân */
  const initialValuesFilesUpload = {
    application: "",
    transcriptAndAchievements: "",
    personalProfile: "",
    photo: "",
    houseImage: "",
  }

  const validationSchemaFilesUpload = Yup.object({
    application: Yup.mixed().required(
      "Vui lòng tải lên đơn xin xét chọn vào ký túc xá."
    ),
    transcriptAndAchievements: Yup.mixed().required(
      "Vui lòng tải lên học bạ THPT."
    ),
    personalProfile: Yup.mixed().required(
      "Vui lòng tải lên lý lịch cá nhân có dán ảnh và đóng dấu xác nhận của địa phương."
    ),
    photo: Yup.mixed().required(
      "Vui lòng tải lên ảnh 4x6 cm , ghi rõ thông tin bao gồm họ tên, năm sinh phía sau ảnh."
    ),
    houseImage: Yup.mixed().required(
      "Vui lòng tải lên hình ảnh căn nhà đang ở."
    ),
  })

  const handleSubmitFilesUpload = async (values, actions) => {
    actions.setSubmitting(true)
    const info = {
      personalInfo: JSON.parse(localStorage.getItem("personalInfo")),
      familyInfo: JSON.parse(localStorage.getItem("familyInfo")),
      studentInfo: JSON.parse(localStorage.getItem("studentInfo")),
    }
    let data = {
      ...info,
      familyInfo: {
        relatives: [
          {
            relationship: {
              id: 1,
              label: "Cha",
            },
            ...info.familyInfo.father,
          },
          {
            relationship: {
              id: 2,
              label: "Mẹ",
            },
            ...info.familyInfo.mother,
          },
          ...info.familyInfo.relatives?.map((relative) => ({
            status: {
              value: "Có thông tin",
              label: "Có thông tin",
            },
            ...relative,
          })),
        ],
        familyBackground: info.familyInfo.familyBackground,
      },
    }
    admissionApi.submit(data).then((response) => {
      if (response.data?.status === "OK") {
        Swal.fire({
          icon: "success",
          title: "Gửi hồ sơ thành công",
          text: "Nếu bạn muốn cập nhật lại hồ sơ, hãy cập nhật lại thông tin trong trang này và ấn gửi lần nữa!"
        })
      }
      else {
        Swal.fire({
          icon: "warning",
          title: "Gửi hồ sơ thất bại",
          text: response.data?.data
        })
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "success",
        title: "Có lỗi trong quá trình gửi hồ sơ",
        text: error?.message
      })
    })
    actions.setSubmitting(false)
  }
  /* */
  return (
    <Motion className='container relative pt-10 pb-16 lg:pt-20 lg:pb-28'>
      <div className='p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl sm:p-10 lg:p-16 dark:bg-neutral-900'>
        {children}
        <header className=' my-5 text-center mx-auto'>
          <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
            IV. HỒ SƠ XÉT TUYỂN
          </h2>
          <span className='block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200'>
            Các bạn vui lòng tải lên đúng hồ sơ của mình ở bên dưới để tránh sai
            sót nhé!
          </span>
        </header>
        <Formik
          initialValues={initialValuesFilesUpload}
          validationSchema={validationSchemaFilesUpload}
          onSubmit={handleSubmitFilesUpload}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            setFieldError,
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className='grid gap-6'>
                <InputField
                  type='file'
                  accept='application/pdf'
                  name='application'
                  label='Đơn xin xét chọn vào ký túc xá'
                  value={values.application}
                  feedback={errors.application}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.application && errors.application}
                  isRequired
                />
                <InputField
                  type='file'
                  accept='application/pdf'
                  name='transcriptAndAchievements'
                  label='Học bạ THPT và Thành tích học tập'
                  value={values.transcriptAndAchievements}
                  feedback={errors.transcriptAndAchievements}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={
                    touched.transcriptAndAchievements &&
                    errors.transcriptAndAchievements
                  }
                  isRequired
                />
                <InputField
                  type='file'
                  accept='application/pdf'
                  name='personalProfile'
                  label='Lý lịch cá nhân (có dán ảnh và đóng dấu xác nhận của địa phương)'
                  value={values.personalProfile}
                  feedback={errors.personalProfile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.personalProfile && errors.personalProfile}
                  isRequired
                />
                <InputField
                  type='file'
                  accept='application/pdf'
                  name='photo'
                  label='Ảnh thẻ'
                  value={values.photo}
                  feedback={errors.photo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.photo && errors.photo}
                  isRequired
                />
                <InputField
                  type='file'
                  accept='application/pdf'
                  name='houseImage'
                  label='Hình ảnh căn nhà đang ở'
                  value={values.houseImage}
                  feedback={errors.houseImage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.houseImage && errors.houseImage}
                  isRequired
                />
                <div className='mt-10 inline-flex items-center justify-center gap-5'>
                  <button
                    className='block rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-10 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                    onClick={() => handleFormChange(3)}
                  >
                    <BsArrowLeft className='inline' /> Quay lại
                  </button>
                  <button
                    className='block rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-10 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                    type='submit'
                  >
                    Gửi hồ sơ <BsCheckLg className='inline' />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Motion>
  )
}
