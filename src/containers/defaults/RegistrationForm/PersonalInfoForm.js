import { Formik } from "formik"
import { useEffect, useState } from "react"
import { BsArrowRight } from "react-icons/bs"
import { Form } from "reactstrap"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"
import Motion from "~/components/Motion"
import districts from "~/utils/mockData/districts"
import ethnics from "~/utils/mockData/ethnics"
import provinces from "~/utils/mockData/provinces"
import religions from "~/utils/mockData/religions"
import wards from "~/utils/mockData/wards"

const provincesData = Object.values(provinces)

export default function PersonalInfoForm({ handleFormChange }) {
  const [districtsData, setDistrictsData] = useState([])
  const [loadingDistrictsData, setLoadingDistrictsData] = useState(true)
  const [wardsData, setWardsData] = useState([])
  const [loadingWardsData, setLoadingWardsData] = useState(true)

  const handleChangePersonalInfo = (name, value, setFieldValue) => {
    let currentPersonalInfo = JSON.parse(localStorage.getItem("personalInfo"))
    if (name === "fullName" || name === "detailAddress") {
      value = value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    } else if (name === "email") {
      value = value.toLowerCase()
    }
    currentPersonalInfo = {
      ...currentPersonalInfo,
      [name]: value,
    }
    setFieldValue(name, value)
    localStorage.setItem("personalInfo", JSON.stringify(currentPersonalInfo))
  }

  useEffect(() => {
    if (!localStorage.getItem("personalInfo")) {
      localStorage.setItem(
        "personalInfo",
        JSON.stringify({
          fullName: "",
          dateOfBirth: "",
          gender: "",
          phoneNumber: "",
          email: "",
          ethnic: "",
          religion: "",
          hometown: "",
          provinceAddress: "",
          districtAddress: "",
          wardAddress: "",
          detailAddress: "",
          idNumber: "",
          idIssueDate: "",
          idIssuePlace: "",
        })
      )
    }
  }, [])

  const handleProvinceChange = (province) => {
    setLoadingDistrictsData(true)
    setDistrictsData(
      Object.values(districts).filter(
        (district) => district.parent_code === province?.code
      )
    )
    setLoadingDistrictsData(false)
  }

  const handleDistrictChange = (district) => {
    setLoadingWardsData(true)
    setWardsData(
      Object.values(wards).filter((ward) => ward.parent_code === district?.code)
    )
    setLoadingWardsData(false)
  }

  /* Thông tin cá nhân */
  const initialValuesPersonalInfo = JSON.parse(
    localStorage.getItem("personalInfo")
  ) || {
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    ethnic: "",
    religion: "",
    hometown: "",
    provinceAddress: "",
    districtAddress: "",
    wardAddress: "",
    detailAddress: "",
    idNumber: "",
    idIssueDate: "",
    idIssuePlace: "",
  }

  const validationSchemaPersonalInfo = Yup.object({
    fullName: Yup.string().required("Họ và tên không được để trống"),
    dateOfBirth: Yup.string().required("Ngày sinh không được để trống"),
    gender: Yup.object().nullable().required("Giới tính không được để trống"),
    phoneNumber: Yup.string()
      .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại không được để trống"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    ethnic: Yup.object().nullable().required("Dân tộc không được để trống"),
    religion: Yup.object().nullable().required("Tôn giáo không được để trống"),
    hometown: Yup.object().nullable().required("Quê quán không được để trống"),
    provinceAddress: Yup.object()
      .nullable()
      .required("Tỉnh/thành phố không được để trống"),
    districtAddress: Yup.object()
      .nullable()
      .required("Quận/huyện không được để trống"),
    wardAddress: Yup.object()
      .nullable()
      .required("Xã/phường/thị trấn không được để trống"),
    detailAddress: Yup.string().required(
      "Số nhà, tên đường không được để trống"
    ),
    idNumber: Yup.string().required("Số CMND/CCCD không được để trống"),
    idIssueDate: Yup.string().required(
      "Ngày cấp CMND/CCCD không được để trống"
    ),
    idIssuePlace: Yup.string().required(
      "Nơi cấp CMND/CCCD không được để trống"
    ),
  })

  const validateForm = async (values) => {
    // try {
    //   await validationSchemaPersonalInfo.validate(values, { abortEarly: false })
    //   localStorage.setItem(
    //     "personalInfo",
    //     JSON.stringify({ ...values, finished: true })
    //   )
    // } catch (err) {
    //   localStorage.setItem(
    //     "personalInfo",
    //     JSON.stringify({ ...values, finished: false })
    //   )
    // }
  }

  const handleSubmitPersonalInfo = async (values, actions) => {
    handleFormChange(2)
  }
  /* */
  return (
    <Motion className='container relative pt-10 pb-16 lg:pt-20 lg:pb-28'>
      <div className='p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl sm:p-10 lg:p-16 dark:bg-neutral-900'>
        <header className=' my-5 text-center mx-auto'>
          <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
            I. THÔNG TIN CÁ NHÂN
          </h2>
          <span className='block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200'>
            Các bạn vui lòng điền đúng thông tin cá nhân của mình ở bên dưới để
            tránh sai sót nhé!
          </span>
        </header>
        <Formik
          initialValues={initialValuesPersonalInfo}
          validationSchema={validationSchemaPersonalInfo}
          onSubmit={handleSubmitPersonalInfo}
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
                <InputField
                  type='text'
                  name='fullName'
                  placeholder='Nhập họ và tên...'
                  label='Họ và tên'
                  value={values.fullName}
                  feedback={errors.fullName}
                  onChange={(e) => {
                    handleChangePersonalInfo(
                      "fullName",
                      e.target.value,
                      setFieldValue
                    )
                  }}
                  invalid={touched.fullName && errors.fullName}
                  isRequired
                />
                <InputField
                  type='date'
                  name='dateOfBirth'
                  placeholder='Nhập ngày sinh...'
                  label='Ngày sinh'
                  value={values.dateOfBirth}
                  feedback={errors.dateOfBirth}
                  onChange={(e) => {
                    handleChangePersonalInfo(
                      "dateOfBirth",
                      e.target.value,
                      setFieldValue
                    )
                  }}
                  invalid={touched.dateOfBirth && errors.dateOfBirth}
                  isRequired
                />
                <InputField
                  type='select'
                  name='gender'
                  label='Giới tính'
                  placeholder='Chọn giới tính của bạn.'
                  value={values.gender}
                  onChange={(selectedOption) => {
                    handleChangePersonalInfo(
                      "gender",
                      selectedOption,
                      setFieldValue
                    )
                  }}
                  clearValue={() => {
                    handleChangePersonalInfo("gender", "", setFieldValue)
                  }}
                  feedback={errors.gender}
                  invalid={touched.gender && errors.gender}
                  options={[
                    { value: "Nam", label: "Nam" },
                    { value: "Nữ", label: "Nữ" },
                  ]}
                  isRequired
                />
                <InputField
                  type='text'
                  name='phoneNumber'
                  placeholder='Nhập số điện thoại...'
                  label='Số điện thoại'
                  value={values.phoneNumber}
                  feedback={errors.phoneNumber}
                  onChange={(e) => {
                    handleChangePersonalInfo(
                      "phoneNumber",
                      e.target.value,
                      setFieldValue
                    )
                  }}
                  invalid={touched.phoneNumber && errors.phoneNumber}
                  isRequired
                />
                <InputField
                  type='text'
                  name='email'
                  placeholder='Nhập email...'
                  label='Email'
                  value={values.email}
                  feedback={errors.email}
                  onChange={(e) => {
                    handleChangePersonalInfo(
                      "email",
                      e.target.value,
                      setFieldValue
                    )
                  }}
                  invalid={touched.email && errors.email}
                  isRequired
                />
                <div className='grid md:grid-cols-2 gap-6'>
                  <InputField
                    type='select'
                    name='ethnic'
                    label='Dân tộc'
                    placeholder='Chọn dân tộc của bạn...'
                    value={values.ethnic}
                    onChange={(selectedOption) => {
                      handleChangePersonalInfo(
                        "ethnic",
                        selectedOption,
                        setFieldValue
                      )
                    }}
                    clearValue={() => {
                      handleChangePersonalInfo("ethnic", "", setFieldValue)
                    }}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    loadingMessage={() => "Đang tải dữ liệu"}
                    feedback={errors.ethnic}
                    invalid={touched.ethnic && errors.ethnic}
                    options={ethnics}
                    isRequired
                  />
                  <InputField
                    type='select'
                    name='religion'
                    label='Tôn giáo'
                    placeholder='Chọn tôn giáo của bạn...'
                    value={values.religion}
                    onChange={(selectedOption) => {
                      handleChangePersonalInfo(
                        "religion",
                        selectedOption,
                        setFieldValue
                      )
                    }}
                    clearValue={() => {
                      handleChangePersonalInfo("religion", "", setFieldValue)
                    }}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    feedback={errors.religion}
                    invalid={touched.religion && errors.religion}
                    options={religions}
                    isRequired
                  />
                </div>
                <InputField
                  type='select'
                  label='Quê quán'
                  placeholder='Chọn quê quán...'
                  value={values.hometown}
                  onChange={(selectedOption) => {
                    handleChangePersonalInfo(
                      "hometown",
                      selectedOption,
                      setFieldValue
                    )
                  }}
                  getOptionValue={(option) => option.code}
                  getOptionLabel={(option) => option.name_with_type}
                  feedback={errors.hometown}
                  invalid={touched.hometown && errors.hometown}
                  options={provincesData}
                  isRequired
                />

                <div className='p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'>
                  <header className='mb-5 text-center mx-auto'>
                    <h2 className='flex items-center leading-[115%] md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                      Địa chỉ thường trú (xem trong hộ khẩu)
                    </h2>
                  </header>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <InputField
                      type='select'
                      label='Tỉnh/thành phố'
                      placeholder='Chọn tỉnh/thành phố...'
                      value={values.provinceAddress}
                      onChange={(selectedOption) => {
                        handleChangePersonalInfo(
                          "provinceAddress",
                          selectedOption,
                          setFieldValue
                        )
                        handleChangePersonalInfo(
                          "districtAddress",
                          "",
                          setFieldValue
                        )
                        handleChangePersonalInfo(
                          "wardAddress",
                          "",
                          setFieldValue
                        )
                        setWardsData([])
                        handleProvinceChange(selectedOption)
                      }}
                      clearValue={() => {
                        handleChangePersonalInfo(
                          "districtAddress",
                          "",
                          setFieldValue
                        )
                        handleChangePersonalInfo(
                          "wardAddress",
                          "",
                          setFieldValue
                        )
                      }}
                      getOptionValue={(option) => option.code}
                      getOptionLabel={(option) => option.name_with_type}
                      onBlur={handleBlur}
                      feedback={errors.provinceAddress}
                      invalid={
                        touched.provinceAddress && errors.provinceAddress
                      }
                      options={provincesData}
                      isRequired
                    />
                    <InputField
                      type='select'
                      label='Quận/huyện'
                      placeholder='Chọn quận/huyện...'
                      value={values.districtAddress}
                      onChange={(selectedOption) => {
                        handleChangePersonalInfo(
                          "districtAddress",
                          selectedOption,
                          setFieldValue
                        )
                        handleChangePersonalInfo(
                          "wardAddress",
                          "",
                          setFieldValue
                        )
                        handleDistrictChange(selectedOption)
                      }}
                      clearValue={() => {
                        handleChangePersonalInfo(
                          "districtAddress",
                          "",
                          setFieldValue
                        )
                        handleChangePersonalInfo(
                          "wardAddress",
                          "",
                          setFieldValue
                        )
                      }}
                      isLoading={loadingDistrictsData}
                      getOptionValue={(option) => option.code}
                      getOptionLabel={(option) => option.name_with_type}
                      loadingMessage={() => "Vui lòng chọn tỉnh/thành phố"}
                      feedback={errors.districtAddress}
                      invalid={
                        touched.districtAddress && errors.districtAddress
                      }
                      options={districtsData}
                      isRequired
                    />
                    <InputField
                      type='select'
                      label='Xã/phường/thị trấn'
                      placeholder='Chọn xã/phường/thị trấn...'
                      value={values.wardAddress}
                      onChange={(selectedOption) => {
                        handleChangePersonalInfo(
                          "wardAddress",
                          selectedOption,
                          setFieldValue
                        )
                      }}
                      clearValue={() => {
                        handleChangePersonalInfo(
                          "wardAddress",
                          "",
                          setFieldValue
                        )
                      }}
                      loadingMessage={() => "Vui lòng chọn quận/huyện"}
                      isLoading={loadingWardsData}
                      getOptionValue={(option) => option.code}
                      getOptionLabel={(option) => option.name_with_type}
                      feedback={errors.wardAddress}
                      invalid={touched.wardAddress && errors.wardAddress}
                      options={wardsData}
                      isRequired
                    />
                    <InputField
                      type='text'
                      name='detailAddress'
                      placeholder='Nhập số nhà, tên đường, khu phố...'
                      label='Số nhà, tên đường, khu phố'
                      value={values.detailAddress}
                      feedback={errors.detailAddress}
                      onChange={(e) => {
                        handleChangePersonalInfo(
                          "detailAddress",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={touched.detailAddress && errors.detailAddress}
                      isRequired
                    />
                  </div>
                </div>
                <InputField
                  type='text'
                  name='idNumber'
                  placeholder='Nhập số CMND/CCCD...'
                  label='Số CMND/CCCD'
                  value={values.idNumber}
                  feedback={errors.idNumber}
                  onChange={(e) => {
                    handleChangePersonalInfo(
                      "idNumber",
                      e.target.value,
                      setFieldValue
                    )
                  }}
                  invalid={touched.idNumber && errors.idNumber}
                  isRequired
                />
                <InputField
                  type='date'
                  name='idIssueDate'
                  placeholder='Nhập ngày cấo CMND/CCCD...'
                  label='Ngày cấp CMND/CCCD'
                  value={values.idIssueDate}
                  feedback={errors.idIssueDate}
                  onChange={(e) => {
                    handleChangePersonalInfo(
                      "idIssueDate",
                      e.target.value,
                      setFieldValue
                    )
                  }}
                  invalid={touched.idIssueDate && errors.idIssueDate}
                  isRequired
                />
                <InputField
                  type='text'
                  name='idIssuePlace'
                  placeholder='Nhập ngày cấp CMND/CCCD...'
                  label='Nơi cấp CMND/CCCD'
                  value={values.idIssuePlace}
                  feedback={errors.idIssuePlace}
                  onChange={(e) => {
                    handleChangePersonalInfo(
                      "idIssuePlace",
                      e.target.value,
                      setFieldValue
                    )
                  }}
                  invalid={touched.idIssuePlace && errors.idIssuePlace}
                  isRequired
                />
                <div className='mt-10 inline-flex items-center justify-center gap-5'>
                  <button
                    className='inline rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-10 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                    type='submit'
                  >
                    Tiếp tục <BsArrowRight className='inline' />
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
