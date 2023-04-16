import { Formik } from "formik"
import { Form } from "reactstrap"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"

export default function FilesUploadForm({ children }) {
  /* Thông tin cá nhân */
  const initialValuesFilesUpload = {
    application: "",
    transcript: "",
    academicAchievements: "",
    poorFamilyConfirmation: "",
    admissionNotice: "",
    evaluationResult: "",
    personalProfile: "",
    identityCard: "",
    photo: "",
    houseImage: "",
  }

  const validationSchemaFilesUpload = Yup.object({
    application: Yup.mixed()
      .required("Vui lòng tải lên đơn xin xét chọn vào ký túc xá.")
      .test("fileType", "Tệp tin phải có định dạng PDF", (value) => {
        if (!value) return true
        return value && value.type === "application/pdf"
      }),
    transcript: Yup.mixed()
      .required("Vui lòng tải lên học bạ THPT.")
      .test("fileType", "Tệp tin phải có định dạng PDF", (value) => {
        if (!value) return true
        return value && value.type === "application/pdf"
      }),
    academicAchievements: Yup.mixed()
      .required("Vui lòng tải lên thành tích học tập.")
      .test("fileType", "Tệp tin phải có định dạng PDF", (value) => {
        if (!value) return true
        return value && value.type === "application/pdf"
      }),
    poorFamilyConfirmation: Yup.mixed()
      .required(
        "Vui lòng tải lên sổ hộ nghèo, giấy xác nhận hộ cận nghèo, giấy xác nhận hoàn cảnh gia đình thật sự khó khăn của địa phương."
      )
      .test("fileType", "Tệp tin phải có định dạng PDF", (value) => {
        if (!value) return true
        return value && value.type === "application/pdf"
      }),
    admissionNotice: Yup.mixed()
      .required(
        "Vui lòng tải lên giấy báo nhập học của Trường đại học năm học 2022-2023."
      )
      .test("fileType", "Tệp tin phải có định dạng PDF", (value) => {
        if (!value) return true
        return value && value.type === "application/pdf"
      }),
    evaluationResult: Yup.mixed().test(
      "fileType",
      "Tệp tin phải có định dạng PDF",
      (value) => {
        if (!value) return true
        return value && value.type === "application/pdf"
      }
    ),
    personalProfile: Yup.mixed()
      .required(
        "Vui lòng tải lên lý lịch cá nhân có dán ảnh và đóng dấu xác nhận của địa phương."
      )
      .test("fileType", "Tệp tin phải có định dạng PDF", (value) => {
        if (!value) return true
        return value && value.type === "application/pdf"
      }),
    identityCard: Yup.mixed()
      .required("Vui lòng tải lên CMND hoặc CCCD.")
      .test("fileType", "Tệp tin phải có định dạng PDF", (value) => {
        if (!value) return true
        return value && value.type === "application/pdf"
      }),
    photo: Yup.mixed()
      .required(
        "Vui lòng tải lên ảnh 4x6 cm , ghi rõ thông tin bao gồm họ tên, năm sinh phía sau ảnh."
      )
      .test("fileType", "Tệp tin phải có định dạng PDF", (value) => {
        if (!value) return true
        return value && value.type === "application/pdf"
      }),
    houseImage: Yup.mixed()
      .required("Vui lòng tải lên hình ảnh căn nhà đang ở.")
      .test("fileType", "Tệp tin phải có định dạng PDF", (value) => {
        if (!value) return true
        return value && value.type === "application/pdf"
      }),
  })

  const handleSubmitFilesUpload = async (values, actions) => {
    actions.setSubmitting(true)
  }
  /* */
  return (
    <div
      id='files-upload'
      className='container relative pt-10 pb-16 lg:pt-20 lg:pb-28'
    >
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
                <div className='mb-5'>
                  <InputField
                    type='file'
                    accept='application/pdf'
                    name='application'
                    label='1. Đơn xin xét chọn vào ký túc xá'
                    value={values.application}
                    feedback={errors.application}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.application && errors.application}
                    isRequired
                  />
                </div>
                <div className='mb-5'>
                  <InputField
                    type='file'
                    accept='application/pdf'
                    name='transcript'
                    label='2. Học bạ THPT'
                    value={values.transcript}
                    feedback={errors.transcript}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.transcript && errors.transcript}
                    isRequired
                  />
                </div>
                <div className='mb-5'>
                  <InputField
                    type='file'
                    accept='application/pdf'
                    name='academicAchievements'
                    label='3. Thành tích học tập'
                    value={values.academicAchievements}
                    feedback={errors.academicAchievements}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={
                      touched.academicAchievements &&
                      errors.academicAchievements
                    }
                    isRequired
                  />
                </div>
                <div className='mb-5'>
                  <InputField
                    type='file'
                    accept='application/pdf'
                    name='poorFamilyConfirmation'
                    label='4. Sổ hộ nghèo, giấy xác nhận hộ cận nghèo, giấy xác nhận hoàn cảnh gia đình thật sự khó khăn của địa phương'
                    value={values.poorFamilyConfirmation}
                    feedback={errors.poorFamilyConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={
                      touched.poorFamilyConfirmation &&
                      errors.poorFamilyConfirmation
                    }
                    isRequired
                  />
                </div>
                <div className='mb-5'>
                  <InputField
                    type='file'
                    accept='application/pdf'
                    name='admissionNotice'
                    label='5. Giấy báo nhập học của Trường đại học năm học 2023 - 2024'
                    value={values.admissionNotice}
                    feedback={errors.admissionNotice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.admissionNotice && errors.admissionNotice}
                    isRequired
                  />
                </div>
                <div className='mb-5'>
                  <InputField
                    type='file'
                    accept='application/pdf'
                    name='evaluationResult'
                    label='6. Giấy báo điểm kỳ thi đánh giá năng lực của trường hoặc của ĐHQG (nếu có)'
                    value={values.evaluationResult}
                    feedback={errors.evaluationResult}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={
                      touched.evaluationResult && errors.evaluationResult
                    }
                  />
                </div>
                <div className='mb-5'>
                  <InputField
                    type='file'
                    accept='application/pdf'
                    name='personalProfile'
                    label='7. Lý lịch cá nhân (có dán ảnh và đóng dấu xác nhận của địa phương)'
                    value={values.personalProfile}
                    feedback={errors.personalProfile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.personalProfile && errors.personalProfile}
                    isRequired
                  />
                </div>
                <div className='mb-5'>
                  <InputField
                    type='file'
                    accept='application/pdf'
                    name='identityCard'
                    label='8. CMND hoặc CCCD'
                    value={values.identityCard}
                    feedback={errors.identityCard}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.identityCard && errors.identityCard}
                    isRequired
                  />
                </div>
                <div className='mb-5'>
                  <InputField
                    type='file'
                    accept='application/pdf'
                    name='photo'
                    label='9. Ảnh 4x6 (ghi rõ thông tin bao gồm họ tên, năm sinh phía sau ảnh)'
                    value={values.photo}
                    feedback={errors.photo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.photo && errors.photo}
                    isRequired
                  />
                </div>
                <div className='mb-5'>
                  <InputField
                    type='file'
                    accept='application/pdf'
                    name='houseImage'
                    label='10. Hình ảnh căn nhà đang ở'
                    value={values.houseImage}
                    feedback={errors.houseImage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.houseImage && errors.houseImage}
                    isRequired
                  />
                </div>
              </div>
              <button
                className='relative w-full h-auto mt-5 inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                type='submit'
              >
                Lưu
                {isSubmitting && "..."}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
