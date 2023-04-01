import { Formik } from 'formik'
import { useEffect } from 'react'
import { Form } from 'reactstrap'
import * as Yup from 'yup'
import { InputField } from '~/components/Customs'

const universities = [
  'Đại học Văn Hiến',
  'Học viện Cán bộ Thành phố Hồ Chí Minh',
  'Học viện Công nghệ Bưu chính Viễn thông (Cơ sở phía Nam)',
  'Học viện Hàng không Việt Nam',
  'Học viện Kỹ thuật Mật mã (cơ sở phía Nam)',
  'Học viện Thanh thiếu niên Việt Nam (cơ sở phía Nam)',
  'Học viện Tư pháp (Cơ sở Thành Phố Hồ Chí Minh)',
  'Khoa Y - ĐH Quốc gia TP.HCM',
  'Nhạc viện Thành phố Hồ Chí Minh',
  'Phân hiệu Đại học Giao thông vận tải tại TP.HCM',
  'Trường Sĩ quan Kỹ thuật quân sự (Đại học Trần Đại Nghĩa)',
  'Đại học An ninh Nhân dân',
  'Đại học Bách Khoa - ĐHQG TP.HCM',
  'Đại học Cảnh sát nhân dân',
  'Đại học Công nghệ Sài Gòn',
  'Đại học Công nghệ Thành phố Hồ Chí Minh',
  'Đại học Công nghệ Thông tin - ĐH Quốc gia TP.HCM',
  'Đại học Công nghiệp Thành phố Hồ Chí Minh',
  'Đại học Công nghiệp Thực phẩm Thành phố Hồ Chí Minh',
  'Đại học FPT Hồ Chí Minh',
  'Đại học Gia Định',
  'Đại học Giao thông vận tải Thành phố Hồ Chí Minh',
  'Đại học Hoa Sen',
  'Đại học Hùng Vương Thành phố Hồ Chí Minh',
  'Đại học Khoa học Tự nhiên - ĐHQG TP Hồ Chí Minh',
  'Đại học Khoa học Xã hội và Nhân văn - ĐHQG TP.HCM',
  'Đại học Kiến trúc Thành phố Hồ Chí Minh',
  'Đại học Kinh tế - Luật (ĐH Quốc gia TP.HCM)',
  'Đại học Kinh tế - Tài chính TP.HCM',
  'Đại học Kinh tế TP. HCM',
  'Đại học Lao động Xã hội - Cơ sở 2 Tp.HCM',
  'Đại học Luật TP.HCM',
  'Đại học Mở Thành phố Hồ Chí Minh',
  'Đại học Mỹ thuật Công nghiệp Á Châu (Cơ sở TP HCM)',
  'Đại học Mỹ thuật Thành phố Hồ Chí Minh',
  'Đại học Ngân hàng TP. HCM',
  'Đại học Ngoại ngữ - Tin học TP.HCM',
  'Đại học Ngoại thương (Cơ sở TP.HCM)',
  'Đại học Nguyễn Tất Thành',
  'Đại học Nội vụ Hà Nội (cơ sở Tp.HCM)',
  'Đại học Nông Lâm Thành phố Hồ Chí Minh',
  'Đại học Quốc gia TP.HCM',
  'Đại học Quốc tế - ĐH Quốc gia TP.HCM',
  'Đại học Quốc tế Hồng Bàng',
  'Đại học Quốc tế Sài Gòn',
  'Đại học RMIT Nam Sài Gòn',
  'Đại học Sài Gòn',
  'Đại học Sân khấu - Điện ảnh Thành phố Hồ Chí Minh',
  'Đại học Sư phạm Kỹ thuật TP.HCM',
  'Đại học Sư phạm Thể dục Thể thao TP.HCM',
  'Đại học Sư phạm TP. HCM',
  'Đại học Tài chính - Marketing',
  'Đại học Tài nguyên và Môi trường Thành phố Hồ Chí Minh',
  'Đại học Thể dục thể thao Thành phố Hồ Chí Minh',
  'Đại học Thủy lợi - Cơ sở 2',
  'Đại học Tôn Đức Thắng',
  'Đại học Văn hóa Thành phố Hồ Chí Minh',
  'Đại học Văn Lang',
  'Đại học Việt - Đức (Cơ sở TP. HCM)',
  'Đại học Y Dược TP.HCM',
  'Đại học Y khoa Phạm Ngọc Thạch',
]

export default function StudentInfoForm() {
  const handleSaveInput = (e) => {
    const { name, value } = e.target
    const currentStudentInfo = JSON.parse(localStorage.getItem('studentInfo'))
    currentStudentInfo[name] = value
    localStorage.setItem('studentInfo', JSON.stringify(currentStudentInfo))
  }
  const handleSaveOption = (name, value) => {
    if (localStorage.getItem('studentInfo')) {
      const currentStudentInfo = JSON.parse(localStorage.getItem('studentInfo'))
      currentStudentInfo[name] = value
      localStorage.setItem('studentInfo', JSON.stringify(currentStudentInfo))
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('studentInfo')) {
      localStorage.setItem(
        'studentInfo',
        JSON.stringify({
          studentType: '',
          universityName: '',
          major: '',
          classCode: '',
          studentCode: '',
          grade10Semester1: '',
          grade10Semester2: '',
          grade11Semester1: '',
          grade11Semester2: '',
          grade12Semester1: '',
          grade12Semester2: '',
          highSchoolGraduationExamScore: '',
          dgnlScore: '',
          admissionViaDirectMethod: '',
          achievements: '',
          dream: '',
        })
      )
    }
  }, [])

  /* Thông tin sinh viên */
  const initialValuesStudentInfo = JSON.parse(
    localStorage.getItem('studentInfo')
  ) || {
    studentType: '',
    universityName: '',
    major: '',
    classCode: '',
    studentCode: '',
    grade10Semester1: '',
    grade10Semester2: '',
    grade11Semester1: '',
    grade11Semester2: '',
    grade12Semester1: '',
    grade12Semester2: '',
    highSchoolGraduationExamScore: '',
    dgnlScore: '',
    admissionViaDirectMethod: '',
    achievements: '',
    dream: '',
  }

  const validationSchemaStudentInfo = Yup.object().shape({
    studentType: Yup.array()
      .of(Yup.object())
      .min(1, 'Bạn phải chọn ít nhất 1 đối tượng'),
    universityName: Yup.object()
      .nullable()
      .required('Vui lòng chọn trường đại học của bạn'),
    major: Yup.string().required('Vui lòng nhập ngành của bạn'),
    classCode: Yup.string().required('Vui lòng nhập mã lớp'),
    studentCode: Yup.string().required('Vui lòng nhập mã số sinh viên'),
    grade10Semester1: Yup.string().required(
      'Vui lòng nhập điểm trung bình HK1 lớp 10'
    ),
    grade10Semester2: Yup.string().required(
      'Vui lòng nhập điểm trung bình HK2 lớp 10'
    ),
    grade11Semester1: Yup.string().required(
      'Vui lòng nhập điểm trung bình HK1 lớp 11'
    ),
    grade11Semester2: Yup.string().required(
      'Vui lòng nhập điểm trung bình HK2 lớp 11'
    ),
    grade12Semester1: Yup.string().required(
      'Vui lòng nhập điểm trung bình HK1 lớp 12'
    ),
    grade12Semester2: Yup.string().required(
      'Vui lòng nhập điểm trung bình HK2 lớp 12'
    ),
    highSchoolGraduationExamScore: Yup.string().required(
      'Vui lòng nhập điểm thi tốt nghiệp'
    ),
    dgnlScore: Yup.string(),
    admissionViaDirectMethod: Yup.string(),
    achievements: Yup.string(),
    dream: Yup.string().required(
      'Vui lòng trình bày ước mơ và định hướng của bạn trong tương lai.'
    ),
  })

  const handleSubmitStudentInfo = async (values, actions) => {
    actions.setSubmitting(true)
    console.log(values)
    actions.setSubmitting(false)
  }
  /* */
  return (
    <div
      id="student-info"
      className="container relative pt-10 pb-16 lg:pt-20 lg:pb-28"
    >
      <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl sm:p-10 lg:p-16 dark:bg-neutral-900">
        <header className=" my-5 text-center mx-auto">
          <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            III. THÔNG TIN XÉT TUYỂN
          </h2>
          <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
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
            <Form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <InputField
                  type="select"
                  name="studentType"
                  label="Đối tượng (có thể chọn nhiều đối tượng)"
                  placeholder="Chọn loại đối tượng của bạn."
                  isMulti
                  value={values.studentType}
                  onChange={(selectedOption) => {
                    setFieldValue('studentType', selectedOption)
                    handleSaveOption('studentType', selectedOption)
                  }}
                  clearValue={() => {
                    setFieldValue('studentType', '')
                  }}
                  feedback={errors.studentType}
                  invalid={touched.studentType && errors.studentType}
                  options={[
                    { value: 'Nhóm ưu tiên 1', label: 'Nhóm ưu tiên 1' },
                    { value: 'Nhóm ưu tiên 2', label: 'Nhóm ưu tiên 2' },
                    { value: 'Khu vực 1', label: 'Khu vực 1' },
                    { value: 'Khu vực 2 - NT', label: 'Khu vực 2 - NT' },
                    { value: 'Khu vực 2', label: 'Khu vực 2' },
                    { value: 'Khu vực 3', label: 'Khu vực 3' },
                  ]}
                  isRequired
                />
                <InputField
                  type="select"
                  name="universityName"
                  label="Là sinh viên trường"
                  placeholder="Chọn trường đại học của bạn..."
                  value={values.universityName}
                  onChange={(selectedOption) => {
                    setFieldValue('universityName', selectedOption)
                    handleSaveOption('universityName', selectedOption)
                  }}
                  clearValue={() => {
                    setFieldValue('universityName', '')
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
                  type="text"
                  name="major"
                  placeholder="Nhập ngành học..."
                  label="Ngành học"
                  value={values.major}
                  feedback={errors.major}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.major && errors.major}
                  isRequired
                />
                <InputField
                  type="text"
                  name="classCode"
                  placeholder="Nhập mã lớp..."
                  label="Mã lớp"
                  value={values.classCode}
                  feedback={errors.classCode}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.classCode && errors.classCode}
                  isRequired
                />
                <InputField
                  type="text"
                  name="studentCode"
                  placeholder="Nhập mã số sinh viên..."
                  label="Mã số sinh viên"
                  value={values.studentCode}
                  feedback={errors.studentCode}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.studentCode && errors.studentCode}
                  isRequired
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    type="text"
                    name="grade10Semester1"
                    placeholder="Nhập điểm trung bình HK1 lớp 10..."
                    label="Điểm trung bình HK1 lớp 10"
                    value={values.grade10Semester1}
                    feedback={errors.grade10Semester1}
                    onChange={(e) => {
                      handleChange(e)
                      handleSaveInput(e)
                    }}
                    onBlur={handleBlur}
                    invalid={
                      touched.grade10Semester1 && errors.grade10Semester1
                    }
                    isRequired
                  />
                  <InputField
                    type="text"
                    name="grade10Semester2"
                    placeholder="Nhập điểm trung bình HK2 lớp 10..."
                    label="Điểm trung bình HK2 lớp 10"
                    value={values.grade10Semester2}
                    feedback={errors.grade10Semester2}
                    onChange={(e) => {
                      handleChange(e)
                      handleSaveInput(e)
                    }}
                    onBlur={handleBlur}
                    invalid={
                      touched.grade10Semester2 && errors.grade10Semester2
                    }
                    isRequired
                  />
                  <InputField
                    type="text"
                    name="grade11Semester1"
                    placeholder="Nhập điểm trung bình HK1 lớp 11..."
                    label="Điểm trung bình HK1 lớp 11"
                    value={values.grade11Semester1}
                    feedback={errors.grade11Semester1}
                    onChange={(e) => {
                      handleChange(e)
                      handleSaveInput(e)
                    }}
                    onBlur={handleBlur}
                    invalid={
                      touched.grade11Semester1 && errors.grade11Semester1
                    }
                    isRequired
                  />
                  <InputField
                    type="text"
                    name="grade11Semester2"
                    placeholder="Nhập điểm trung bình HK2 lớp 11..."
                    label="Điểm trung bình HK2 lớp 10"
                    value={values.grade11Semester2}
                    feedback={errors.grade11Semester2}
                    onChange={(e) => {
                      handleChange(e)
                      handleSaveInput(e)
                    }}
                    onBlur={handleBlur}
                    invalid={
                      touched.grade11Semester2 && errors.grade11Semester2
                    }
                    isRequired
                  />
                  <InputField
                    type="text"
                    name="grade12Semester1"
                    placeholder="Nhập điểm trung bình HK1 lớp 12..."
                    label="Điểm trung bình HK1 lớp 12"
                    value={values.grade12Semester1}
                    feedback={errors.grade12Semester1}
                    onChange={(e) => {
                      handleChange(e)
                      handleSaveInput(e)
                    }}
                    onBlur={handleBlur}
                    invalid={
                      touched.grade12Semester1 && errors.grade12Semester1
                    }
                    isRequired
                  />
                  <InputField
                    type="text"
                    name="grade12Semester2"
                    placeholder="Nhập điểm trung bình HK2 lớp 12..."
                    label="Điểm trung bình HK2 lớp 12"
                    value={values.grade12Semester2}
                    feedback={errors.grade12Semester2}
                    onChange={(e) => {
                      handleChange(e)
                      handleSaveInput(e)
                    }}
                    onBlur={handleBlur}
                    invalid={
                      touched.grade12Semester2 && errors.grade12Semester2
                    }
                    isRequired
                  />
                  <InputField
                    type="text"
                    name="highSchoolGraduationExamScore"
                    placeholder="Nhập điểm trúng tuyển..."
                    label="Điểm trúng tuyển"
                    value={values.highSchoolGraduationExamScore}
                    feedback={errors.highSchoolGraduationExamScore}
                    onChange={(e) => {
                      handleChange(e)
                      handleSaveInput(e)
                    }}
                    onBlur={handleBlur}
                    invalid={
                      touched.highSchoolGraduationExamScore &&
                      errors.highSchoolGraduationExamScore
                    }
                    isRequired
                  />
                  <InputField
                    type="text"
                    name="dgnlScore"
                    placeholder="Nhập điểm thi ĐGNL..."
                    label="Điểm thi ĐGNL (nếu có)"
                    value={values.dgnlScore}
                    onChange={(e) => {
                      handleChange(e)
                      handleSaveInput(e)
                    }}
                  />
                </div>
                <InputField
                  type="textarea"
                  name="achievements"
                  rows={10}
                  placeholder="Ghi ngắn gọn các giải thưởng đã đạt được. Không trình bày dài dòng..."
                  label="Thành tích học tập"
                  value={values.achievements}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                />
                <InputField
                  type="text"
                  name="admissionViaDirectMethod"
                  placeholder="Nhập hình thức được tuyển thẳng (HSG Tỉnh, IELTS,...)..."
                  label="Tuyển thẳng (nếu có): "
                  value={values.admissionViaDirectMethod}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                />
                <InputField
                  type="textarea"
                  name="dream"
                  rows={10}
                  placeholder="Bạn hãy trình bày định hướng và ước mơ cụ thể của mình trong tương lai nếu bạn nhận được học bổng...."
                  label="Định hướng và ước mơ trong tương lai"
                  value={values.dream}
                  feedback={errors.dream}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.dream && errors.dream}
                  isRequired
                />
                <button
                  className="relative w-full h-auto mt-5 inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                  type="submit"
                >
                  Lưu
                  {isSubmitting && '...'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
