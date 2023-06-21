import { Formik } from "formik"
import { useEffect } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { Form } from "reactstrap"
import Swal from "sweetalert2"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"
import Motion from "~/components/Motion"
import admissionApi from "~/services/admissionApi"

const universities = [
  "Đại học Văn Hiến",
  "Học viện Cán bộ Thành phố Hồ Chí Minh",
  "Học viện Công nghệ Bưu chính Viễn thông (Cơ sở phía Nam)",
  "Học viện Hàng không Việt Nam",
  "Học viện Kỹ thuật Mật mã (cơ sở phía Nam)",
  "Học viện Thanh thiếu niên Việt Nam (cơ sở phía Nam)",
  "Học viện Tư pháp (Cơ sở Thành Phố Hồ Chí Minh)",
  "Khoa Y - ĐH Quốc gia TP.HCM",
  "Nhạc viện Thành phố Hồ Chí Minh",
  "Phân hiệu Đại học Giao thông vận tải tại TP.HCM",
  "Trường Sĩ quan Kỹ thuật quân sự (Đại học Trần Đại Nghĩa)",
  "Đại học An ninh Nhân dân",
  "Đại học Bách Khoa - ĐHQG TP.HCM",
  "Đại học Cảnh sát nhân dân",
  "Đại học Công nghệ Sài Gòn",
  "Đại học Công nghệ Thành phố Hồ Chí Minh",
  "Đại học Công nghệ Thông tin - ĐH Quốc gia TP.HCM",
  "Đại học Công nghiệp Thành phố Hồ Chí Minh",
  "Đại học Công nghiệp Thực phẩm Thành phố Hồ Chí Minh",
  "Đại học FPT Hồ Chí Minh",
  "Đại học Gia Định",
  "Đại học Giao thông vận tải Thành phố Hồ Chí Minh",
  "Đại học Hoa Sen",
  "Đại học Hùng Vương Thành phố Hồ Chí Minh",
  "Đại học Khoa học Tự nhiên - ĐHQG TP Hồ Chí Minh",
  "Đại học Khoa học Xã hội và Nhân văn - ĐHQG TP.HCM",
  "Đại học Kiến trúc Thành phố Hồ Chí Minh",
  "Đại học Kinh tế - Luật (ĐH Quốc gia TP.HCM)",
  "Đại học Kinh tế - Tài chính TP.HCM",
  "Đại học Kinh tế TP. HCM",
  "Đại học Lao động Xã hội - Cơ sở 2 Tp.HCM",
  "Đại học Luật TP.HCM",
  "Đại học Mở Thành phố Hồ Chí Minh",
  "Đại học Mỹ thuật Công nghiệp Á Châu (Cơ sở TP HCM)",
  "Đại học Mỹ thuật Thành phố Hồ Chí Minh",
  "Đại học Ngân hàng TP. HCM",
  "Đại học Ngoại ngữ - Tin học TP.HCM",
  "Đại học Ngoại thương (Cơ sở TP.HCM)",
  "Đại học Nguyễn Tất Thành",
  "Đại học Nội vụ Hà Nội (cơ sở Tp.HCM)",
  "Đại học Nông Lâm Thành phố Hồ Chí Minh",
  "Đại học Quốc gia TP.HCM",
  "Đại học Quốc tế - ĐH Quốc gia TP.HCM",
  "Đại học Quốc tế Hồng Bàng",
  "Đại học Quốc tế Sài Gòn",
  "Đại học RMIT Nam Sài Gòn",
  "Đại học Sài Gòn",
  "Đại học Sân khấu - Điện ảnh Thành phố Hồ Chí Minh",
  "Đại học Sư phạm Kỹ thuật TP.HCM",
  "Đại học Sư phạm Thể dục Thể thao TP.HCM",
  "Đại học Sư phạm TP. HCM",
  "Đại học Tài chính - Marketing",
  "Đại học Tài nguyên và Môi trường Thành phố Hồ Chí Minh",
  "Đại học Thể dục thể thao Thành phố Hồ Chí Minh",
  "Đại học Thủy lợi - Cơ sở 2",
  "Đại học Tôn Đức Thắng",
  "Đại học Văn hóa Thành phố Hồ Chí Minh",
  "Đại học Văn Lang",
  "Đại học Việt - Đức (Cơ sở TP. HCM)",
  "Đại học Y Dược TP.HCM",
  "Đại học Y khoa Phạm Ngọc Thạch",
]
const highSchoolTypes = [
  { id: 1, value: "Giỏi" },
  { id: 2, value: "Khá" },
  { id: 3, value: "Trung bình" },
]

export default function StudentInfoForm({ handleFormChange }) {
  const handleChangeStudentInfo = (name, value, setFieldValue) => {
    let currentStudentInfo = JSON.parse(localStorage.getItem("studentInfo"))
    currentStudentInfo = {
      ...currentStudentInfo,
      [name]: value,
    }
    setFieldValue(name, value)
    localStorage.setItem("studentInfo", JSON.stringify(currentStudentInfo))
  }

  useEffect(() => {
    if (!localStorage.getItem("studentInfo")) {
      localStorage.setItem(
        "studentInfo",
        JSON.stringify({
          studentType: "",
          universityName: "",
          studentProgram: "",
          major: "",
          classCode: "",
          studentCode: "",
          highSchoolType: "",
          highSchoolGraduationExamScore: "",
          dgnlScore: "",
          admissionViaDirectMethod: "",
          achievements: "",
          dream: "",
        })
      )
    }
  }, [])

  /* Thông tin sinh viên */
  const initialValuesStudentInfo = JSON.parse(
    localStorage.getItem("studentInfo")
  ) || {
    studentType: "",
    universityName: "",
    studentProgram: "",
    major: "",
    classCode: "",
    studentCode: "",
    highSchoolType: "",
    highSchoolGraduationExamScore: "",
    dgnlScore: "",
    admissionViaDirectMethod: "",
    achievements: "",
    dream: "",
  }

  const validationSchemaStudentInfo = Yup.object().shape({
    studentType: Yup.array()
      .of(Yup.object())
      .required("Vui lòng chọn đối tượng của bạn")
      .min(1, "Bạn phải chọn ít nhất 1 đối tượng"),
    universityName: Yup.object()
      .nullable()
      .required("Vui lòng chọn trường của bạn"),
    studentProgram: Yup.object()
      .nullable()
      .required("Vui lòng chọn loại chương trình học của bạn"),
    major: Yup.string().required("Vui lòng nhập ngành của bạn"),
    classCode: Yup.string(),
    // .required("Vui lòng nhập mã lớp"),
    studentCode: Yup.string(),
    // .required("Vui lòng nhập mã số sinh viên"),
    highSchoolType: Yup.object()
      .nullable()
      .required("Vui lòng chọn loại học bạ cấp 3 của bạn"),
    highSchoolGraduationExamScore: Yup.number()
      .required("Vui lòng nhập điểm thi tốt nghiệp")
      .min(0, "Vui lòng nhập điểm >= 0")
      .max(40, "Vui lòng nhập điểm <= 40"),
    dgnlScore: Yup.number("Điểm đánh giá năng lực phải là một số hợp lệ")
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .nullable(),
    admissionViaDirectMethod: Yup.string(),
    achievements: Yup.string()
      .required("Vui lòng nhập các thành tích hoặc giải thưởng đã đạt được")
      .max(1000, "Tối đa 1000 ký tự, vui lòng điều chỉnh lại cho hợp lý."),
    dream: Yup.string()
      .required(
        "Vui lòng trình bày ước mơ và định hướng của bạn trong tương lai"
      )
      .max(1000, "Tối đa 1000 ký tự, vui lòng điều chỉnh lại cho hợp lý."),
  })

  const validateForm = async (values) => {
    // try {
    //   await validationSchemaStudentInfo.validate(values, { abortEarly: false })
    //   localStorage.setItem(
    //     "studentInfo",
    //     JSON.stringify({ ...values, finished: true })
    //   )
    // } catch (err) {
    //   localStorage.setItem(
    //     "studentInfo",
    //     JSON.stringify({ ...values, finished: false })
    //   )
    // }
  }

  const handleSubmitStudentInfo = async (values, actions) => {
    actions.setSubmitting(true)

    // Thực hiện cập nhật thông tin đăng ký sau khi đã gửi các tập tin lên server thành công
    const info = {
      personalInfo: JSON.parse(localStorage.getItem("personalInfo")),
      familyInfo: JSON.parse(localStorage.getItem("familyInfo")),
      studentInfo: JSON.parse(localStorage.getItem("studentInfo")),
    }
    const data = {
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
        let currentStudentInfo = JSON.parse(localStorage.getItem("studentInfo"))
        currentStudentInfo = {
          ...currentStudentInfo,
          dormStudentCode: response.data.data,
        }
        localStorage.setItem("studentInfo", JSON.stringify(currentStudentInfo))
        Swal.fire({
          icon: "success",
          title: "Lưu thông tin thành công",
          text: "Thông tin hồ sơ của bạn đã được cập nhật lên hệ thống thành công. Vui lòng thực hiện tiếp tục bước upload hồ sơ",
        }).then(() => handleFormChange(4))
      } else {
        Swal.fire({
          icon: "warning",
          title: "Lưu thông tin hồ sơ thất bại",
          text: response.data?.message,
        })
      }
    })

    actions.setSubmitting(false)
  }
  /* */
  return (
    <Motion className='container relative pt-10 pb-16 lg:pt-20 lg:pb-28'>
      <div className='p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl sm:p-10 lg:p-16 dark:bg-neutral-900'>
        <header className=' my-5 text-center mx-auto'>
          <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
            III. THÔNG TIN XÉT TUYỂN
          </h2>
          <span className='block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200'>
            Các bạn vui lòng điền đúng thông tin xét tuyển của mình ở bên dưới
            để tránh sai sót nhé!
          </span>
        </header>
        <Formik
          initialValues={initialValuesStudentInfo}
          validationSchema={validationSchemaStudentInfo}
          onSubmit={handleSubmitStudentInfo}
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
            <Form onChange={() => validateForm(values)} onSubmit={handleSubmit}>
              <div className='grid gap-6'>
                <div className='grid gap-6'>
                  <InputField
                    type='select'
                    name='studentType'
                    label='Đối tượng (có thể chọn nhiều đối tượng)'
                    placeholder='Chọn loại đối tượng của bạn...'
                    isMulti
                    value={values.studentType}
                    onChange={(selectedOption) => {
                      handleChangeStudentInfo(
                        "studentType",
                        selectedOption,
                        setFieldValue
                      )
                    }}
                    clearValue={() => {
                      handleChangeStudentInfo("studentType", "", setFieldValue)
                    }}
                    feedback={errors.studentType}
                    invalid={touched.studentType && errors.studentType}
                    options={[
                      { value: "Hộ nghèo", label: "Hộ nghèo" },
                      { value: "Hộ cận nghèo", label: "Hộ cận nghèo" },
                      {
                        value: "Gia đình có hoàn cảnh khó khăn",
                        label: "Gia đình có hoàn cảnh khó khăn",
                      },
                      { value: "Mồ côi", label: "Mồ côi" },
                      {
                        value: "Con của thương binh, liệt sĩ",
                        label: "Con của thương binh, liệt sĩ",
                      },
                      { value: "Dân tộc thiểu số", label: "Dân tộc thiểu số" },
                      { value: "Khuyết tật", label: "Khuyết tật" },
                    ]}
                    isRequired
                  />
                  <InputField
                    type='select'
                    name='universityName'
                    label='Là sinh viên trường'
                    placeholder='Chọn trường đại học của bạn...'
                    value={values.universityName}
                    onChange={(selectedOption) => {
                      handleChangeStudentInfo(
                        "universityName",
                        selectedOption,
                        setFieldValue
                      )
                    }}
                    clearValue={() => {
                      handleChangeStudentInfo(
                        "universityName",
                        "",
                        setFieldValue
                      )
                    }}
                    feedback={errors.universityName}
                    invalid={touched.universityName && errors.universityName}
                    options={universities.map((university) => ({
                      value: university,
                      label: university,
                    }))}
                    isRequired
                  />
                  <InputField
                    type='select'
                    name='studentProgram'
                    label='Loại chương trình học'
                    placeholder='Chọn loại chương trình học của bạn...'
                    value={values.studentProgram}
                    onChange={(selectedOption) => {
                      handleChangeStudentInfo(
                        "studentProgram",
                        selectedOption,
                        setFieldValue
                      )
                    }}
                    clearValue={() => {
                      handleChangeStudentInfo(
                        "studentProgram",
                        "",
                        setFieldValue
                      )
                    }}
                    feedback={errors.studentProgram}
                    invalid={touched.studentProgram && errors.studentProgram}
                    options={[
                      {
                        id: 1,
                        value: "Đại trà",
                      },
                      {
                        id: 2,
                        value: "Chất lượng cao",
                      },
                      {
                        id: 3,
                        value: "Tiên tiến",
                      },
                    ]}
                    getOptionLabel={(option) => option.value}
                    isRequired
                  />
                  <InputField
                    type='text'
                    name='major'
                    placeholder='Nhập ngành học...'
                    label='Ngành học'
                    value={values.major}
                    feedback={errors.major}
                    onChange={(e) => {
                      handleChangeStudentInfo(
                        "major",
                        e.target.value,
                        setFieldValue
                      )
                    }}
                    invalid={touched.major && errors.major}
                    isRequired
                  />
                  <InputField
                    type='text'
                    name='classCode'
                    placeholder='Nhập mã lớp...'
                    label='Mã lớp'
                    value={values.classCode}
                    feedback={errors.classCode}
                    onChange={(e) => {
                      handleChangeStudentInfo(
                        "classCode",
                        e.target.value,
                        setFieldValue
                      )
                    }}
                    invalid={touched.classCode && errors.classCode}
                    // isRequired
                  />
                  <InputField
                    type='text'
                    name='studentCode'
                    placeholder='Nhập mã số sinh viên...'
                    label='Mã số sinh viên'
                    value={values.studentCode}
                    feedback={errors.studentCode}
                    onChange={(e) => {
                      handleChangeStudentInfo(
                        "studentCode",
                        e.target.value,
                        setFieldValue
                      )
                    }}
                    invalid={touched.studentCode && errors.studentCode}
                    // isRequired
                  />
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                  <InputField
                    type='select'
                    name='highSchoolType'
                    label='Loại học bạ cấp 3'
                    placeholder='Chọn loại học bạ cấp 3 của bạn...'
                    value={values.highSchoolType}
                    onChange={(selectedOption) => {
                      handleChangeStudentInfo(
                        "highSchoolType",
                        selectedOption,
                        setFieldValue
                      )
                    }}
                    clearValue={() => {
                      handleChangeStudentInfo(
                        "highSchoolType",
                        "",
                        setFieldValue
                      )
                    }}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.value}
                    feedback={errors.highSchoolType}
                    invalid={touched.highSchoolType && errors.highSchoolType}
                    options={highSchoolTypes}
                    isRequired
                  />
                  <InputField
                    type='number'
                    name='highSchoolGraduationExamScore'
                    placeholder='Nhập điểm trúng tuyển...'
                    label='Điểm trúng tuyển'
                    value={values.highSchoolGraduationExamScore}
                    feedback={errors.highSchoolGraduationExamScore}
                    onChange={(e) => {
                      handleChangeStudentInfo(
                        "highSchoolGraduationExamScore",
                        e.target.value,
                        setFieldValue
                      )
                    }}
                    invalid={
                      touched.highSchoolGraduationExamScore &&
                      errors.highSchoolGraduationExamScore
                    }
                    isRequired
                  />
                  <InputField
                    type='number'
                    name='dgnlScore'
                    placeholder='Nhập điểm thi ĐGNL...'
                    label='Điểm thi ĐGNL (nếu có)'
                    value={values.dgnlScore}
                    onChange={(e) => {
                      handleChangeStudentInfo(
                        "dgnlScore",
                        e.target.value,
                        setFieldValue
                      )
                    }}
                  />
                  <InputField
                    type='text'
                    name='admissionViaDirectMethod'
                    placeholder='Nhập hình thức được tuyển thẳng (HSG Tỉnh, IELTS,...)...'
                    label='Tuyển thẳng (nếu có): '
                    value={values.admissionViaDirectMethod}
                    onChange={(e) => {
                      handleChangeStudentInfo(
                        "admissionViaDirectMethod",
                        e.target.value,
                        setFieldValue
                      )
                    }}
                  />
                </div>
                <div className='grid gap-6'>
                  <InputField
                    type='textarea'
                    name='achievements'
                    rows={10}
                    placeholder='Ghi ngắn gọn các giải thưởng đã đạt được. Không trình bày dài dòng...'
                    label='Thành tích học tập (tối đa 1000 ký tự)'
                    value={values.achievements}
                    feedback={errors.achievements}
                    onChange={(e) => {
                      handleChangeStudentInfo(
                        "achievements",
                        e.target.value,
                        setFieldValue
                      )
                    }}
                    invalid={touched.achievements && errors.achievements}
                    isRequired
                  />
                  <InputField
                    type='textarea'
                    name='dream'
                    rows={10}
                    placeholder='Bạn hãy trình bày sơ lược định hướng và ước mơ của mình trong tương lai nếu bạn nhận được học bổng....'
                    label='Định hướng và ước mơ trong tương lai (tối đa 1000 ký tự)'
                    value={values.dream}
                    feedback={errors.dream}
                    onChange={(e) => {
                      handleChangeStudentInfo(
                        "dream",
                        e.target.value,
                        setFieldValue
                      )
                    }}
                    invalid={touched.dream && errors.dream}
                    isRequired
                  />
                  <div className='mt-10 inline-flex items-center justify-center gap-5'>
                    <button
                      className='block rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-10 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                      onClick={() => handleFormChange(2)}
                    >
                      <BsArrowLeft className='inline' /> Quay lại
                    </button>
                    <button
                      className='block rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-10 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                      type='submit'
                    >
                      {isSubmitting && (
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 inline'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx={12}
                            cy={12}
                            r={10}
                            stroke='currentColor'
                            strokeWidth={3}
                          />
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          />
                        </svg>
                      )}
                      Tiếp tục <BsArrowRight className='inline' />
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Motion>
  )
}
