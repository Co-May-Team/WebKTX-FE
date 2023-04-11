import axios from 'axios'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Form } from 'reactstrap'
import * as Yup from 'yup'
import { InputField } from '~/components/Customs'

export default function PersonalInfoForm() {
  const [provinces, setProvinces] = useState([])
  const [loadingProvinces, setLoadingProvinces] = useState(true)
  const [districts, setDistricts] = useState([])
  const [loadingDistricts, setLoadingDistricts] = useState(true)
  const [wards, setWards] = useState([])
  const [loadingWards, setLoadingWards] = useState(true)

  const handleSaveInput = (e) => {
    const { name, value } = e.target
    const currentPersonalInfo = JSON.parse(localStorage.getItem('personalInfo'))
    currentPersonalInfo[name] = value
    localStorage.setItem('personalInfo', JSON.stringify(currentPersonalInfo))
  }
  const handleSaveOption = (name, value) => {
    if (localStorage.getItem('personalInfo')) {
      const currentPersonalInfo = JSON.parse(
        localStorage.getItem('personalInfo')
      )
      currentPersonalInfo[name] = value
      localStorage.setItem('personalInfo', JSON.stringify(currentPersonalInfo))
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('personalInfo')) {
      localStorage.setItem(
        'personalInfo',
        JSON.stringify({
          fullName: '',
          dateOfBirth: '',
          gender: '',
          phoneNumber: '',
          email: '',
          ethnic: '',
          religion: '',
          hometown: '',
          provinceAddress: '',
          districtAddress: '',
          wardAddress: '',
          detailAddress: '',
          idNumber: '',
          idIssueDate: '',
          idIssuePlace: '',
        })
      )
    }
  }, [])

  useEffect(() => {
    setLoadingProvinces(true)
    if (JSON.parse(localStorage.getItem('provinces'))?.length > 0) {
      setProvinces(JSON.parse(localStorage.getItem('provinces')))
      setLoadingProvinces(false)
    } else {
      axios
        .get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
        .then((response) => {
          localStorage.setItem(
            'provinces',
            JSON.stringify(response.data.data.data)
          )
          setProvinces(response.data.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
          setLoadingProvinces(false)
        })
    }
  }, [])

  const handleProvinceChange = (province) => {
    setLoadingDistricts(true)
    if (province?.code) {
      axios
        .get(
          `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${province.code}&limit=-1`
        )
        .then((response) => {
          setDistricts(response.data.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
          setLoadingDistricts(false)
        })
    }
  }

  const handleDistrictChange = (district) => {
    setLoadingWards(true)
    if (district?.code) {
      axios
        .get(
          `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${district.code}&limit=-1`
        )
        .then((response) => {
          setWards(response.data.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
          setLoadingWards(false)
        })
    }
  }

  /* Thông tin cá nhân */
  const initialValuesPersonalInfo = JSON.parse(
    localStorage.getItem('personalInfo')
  ) || {
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    ethnic: '',
    religion: '',
    hometown: '',
    provinceAddress: '',
    districtAddress: '',
    wardAddress: '',
    detailAddress: '',
    idNumber: '',
    idIssueDate: '',
    idIssuePlace: '',
  }

  const validationSchemaPersonalInfo = Yup.object({
    fullName: Yup.string().required('Họ và tên không được để trống'),
    dateOfBirth: Yup.string().required('Ngày sinh không được để trống'),
    gender: Yup.object().nullable().required('Giới tính không được để trống'),
    phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
    email: Yup.string().required('Email không được để trống'),
    ethnic: Yup.string().required('Dân tộc không được để trống'),
    religion: Yup.string().required('Tôn giáo không được để trống'),
    hometown: Yup.object().nullable().required('Quê quán không được để trống'),
    provinceAddress: Yup.object()
      .nullable()
      .required('Tỉnh/thành phố không được để trống'),
    districtAddress: Yup.object()
      .nullable()
      .required('Quận/huyện không được để trống'),
    wardAddress: Yup.object()
      .nullable()
      .required('Xã/phường/thị trấn không được để trống'),
    detailAddress: Yup.string().required(
      'Số nhà, tên đường không được để trống'
    ),
    idNumber: Yup.string().required('Số CMND/CCCD không được để trống'),
    idIssueDate: Yup.string().required(
      'Ngày cấp CMND/CCCD không được để trống'
    ),
    idIssuePlace: Yup.string().required(
      'Nơi cấp CMND/CCCD không được để trống'
    ),
  })

  const handleSubmitPersonalInfo = async (values, actions) => {
    actions.setSubmitting(true)
    console.log(values)
    actions.setSubmitting(false)
  }
  /* */
  return (
    <div
      id="personal-info"
      className="container relative pt-10 pb-16 lg:pt-20 lg:pb-28"
    >
      <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl sm:p-10 lg:p-16 dark:bg-neutral-900">
        <header className=" my-5 text-center mx-auto">
          <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            I. THÔNG TIN CÁ NHÂN
          </h2>
          <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
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
            <Form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <InputField
                  type="text"
                  name="fullName"
                  placeholder="Nhập họ và tên..."
                  label="Họ và tên"
                  value={values.fullName}
                  feedback={errors.fullName}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.fullName && errors.fullName}
                  isRequired
                />
                <InputField
                  type="date"
                  name="dateOfBirth"
                  placeholder="Nhập ngày sinh..."
                  label="Ngày sinh"
                  value={values.dateOfBirth}
                  feedback={errors.dateOfBirth}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.dateOfBirth && errors.dateOfBirth}
                  isRequired
                />
                <InputField
                  type="select"
                  name="gender"
                  label="Giới tính"
                  placeholder="Chọn giới tính của bạn."
                  value={values.gender}
                  onChange={(selectedOption) => {
                    setFieldValue('gender', selectedOption)
                    handleSaveOption('gender', selectedOption)
                  }}
                  clearValue={() => {
                    setFieldValue('gender', '')
                  }}
                  feedback={errors.gender}
                  invalid={touched.gender && errors.gender}
                  options={[
                    { value: 'Nam', label: 'Nam' },
                    { value: 'Nữ', label: 'Nữ' },
                  ]}
                  isRequired
                />
                <InputField
                  type="text"
                  name="phoneNumber"
                  placeholder="Nhập số điện thoại..."
                  label="Số điện thoại"
                  value={values.phoneNumber}
                  feedback={errors.phoneNumber}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.phoneNumber && errors.phoneNumber}
                  isRequired
                />
                <InputField
                  type="text"
                  name="email"
                  placeholder="Nhập email..."
                  label="Email"
                  value={values.email}
                  feedback={errors.email}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.email && errors.email}
                  isRequired
                />
                <InputField
                  type="text"
                  name="ethnic"
                  placeholder="Nhập dân tộc..."
                  label="Dân tộc"
                  value={values.ethnic}
                  feedback={errors.ethnic}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.ethnic && errors.ethnic}
                  isRequired
                />
                <InputField
                  type="text"
                  name="religion"
                  placeholder="Nhập tôn giáo..."
                  label="Tôn giáo"
                  value={values.religion}
                  feedback={errors.religion}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.religion && errors.religion}
                  isRequired
                />

                <InputField
                  type="select"
                  label="Quê quán"
                  placeholder="Chọn quê quán..."
                  value={values.hometown}
                  onChange={(selectedOption) => {
                    setFieldValue('hometown', selectedOption)
                    handleSaveOption('hometown', selectedOption)
                  }}
                  clearValue={() => {
                    setFieldValue('hometown', '')
                    handleSaveOption('hometown', '')
                  }}
                  isLoading={loadingProvinces}
                  getOptionValue={(option) => option._id}
                  getOptionLabel={(option) => option.name}
                  onBlur={handleBlur}
                  feedback={errors.hometown}
                  invalid={touched.hometown && errors.hometown}
                  options={provinces}
                  isRequired
                />

                <div className="p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
                  <header className="mb-5 text-center mx-auto">
                    <h2 className="flex items-center leading-[115%] md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                      Địa chỉ thường trú (xem trong hộ khẩu)
                    </h2>
                  </header>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField
                      type="select"
                      label="Tỉnh/thành phố"
                      placeholder="Chọn tỉnh/thành phố..."
                      value={values.provinceAddress}
                      onChange={(selectedOption) => {
                        setFieldValue('provinceAddress', selectedOption)
                        setFieldValue('districtAddress', '')
                        setFieldValue('wardAddress', '')
                        handleSaveOption('provinceAddress', selectedOption)
                        handleSaveOption('districtAddress', '')
                        handleSaveOption('wardAddress', '')
                        setWards([])
                        handleProvinceChange(selectedOption)
                      }}
                      clearValue={() => {
                        setFieldValue('provinceAddress', '')
                        setFieldValue('districtAddress', '')
                        setFieldValue('wardAddress', '')
                        handleSaveOption('provinceAddress', '')
                        handleSaveOption('districtAddress', '')
                        handleSaveOption('wardAddress', '')
                      }}
                      isLoading={loadingProvinces}
                      getOptionValue={(option) => option._id}
                      getOptionLabel={(option) => option.name}
                      onBlur={handleBlur}
                      feedback={errors.provinceAddress}
                      invalid={
                        touched.provinceAddress && errors.provinceAddress
                      }
                      options={provinces}
                      isRequired
                    />
                    <InputField
                      type="select"
                      label="Quận/huyện"
                      placeholder="Chọn quận/huyện..."
                      value={values.districtAddress}
                      onChange={(selectedOption) => {
                        setFieldValue('districtAddress', selectedOption)
                        setFieldValue('wardAddress', '')
                        handleSaveOption('districtAddress', selectedOption)
                        handleSaveOption('wardAddress', '')
                        handleDistrictChange(selectedOption)
                      }}
                      isLoading={loadingDistricts}
                      getOptionValue={(option) => option._id}
                      getOptionLabel={(option) => option.name}
                      loadingMessage={() => 'Vui lòng chọn tỉnh/thành phố'}
                      onBlur={handleBlur}
                      feedback={errors.districtAddress}
                      invalid={
                        touched.districtAddress && errors.districtAddress
                      }
                      options={districts}
                      isRequired
                    />
                    <InputField
                      type="select"
                      label="Xã/phường/thị trấn"
                      placeholder="Chọn xã/phường/thị trấn..."
                      value={values.wardAddress}
                      onChange={(selectedOption) => {
                        setFieldValue('wardAddress', selectedOption)
                        handleSaveOption('wardAddress', selectedOption)
                      }}
                      loadingMessage={() => 'Vui lòng chọn quận/huyện'}
                      isLoading={loadingWards}
                      getOptionValue={(option) => option._id}
                      getOptionLabel={(option) => option.name}
                      onBlur={handleBlur}
                      feedback={errors.wardAddress}
                      invalid={touched.wardAddress && errors.wardAddress}
                      options={wards}
                      isRequired
                    />
                    <InputField
                      type="text"
                      name="detailAddress"
                      placeholder="Nhập số nhà, tên đường, khu phố..."
                      label="Số nhà, tên đường, khu phố"
                      value={values.detailAddress}
                      feedback={errors.detailAddress}
                      onChange={(e) => {
                        handleChange(e)
                        handleSaveInput(e)
                      }}
                      onBlur={handleBlur}
                      invalid={touched.detailAddress && errors.detailAddress}
                      isRequired
                    />
                  </div>
                </div>
                <InputField
                  type="text"
                  name="idNumber"
                  placeholder="Nhập số CMND/CCCD..."
                  label="Số CMND/CCCD"
                  value={values.idNumber}
                  feedback={errors.idNumber}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.idNumber && errors.idNumber}
                  isRequired
                />
                <InputField
                  type="date"
                  name="idIssueDate"
                  placeholder="Nhập ngày cấo CMND/CCCD..."
                  label="Ngày cấp CMND/CCCD"
                  value={values.idIssueDate}
                  feedback={errors.idIssueDate}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.idIssueDate && errors.idIssueDate}
                  isRequired
                />
                <InputField
                  type="text"
                  name="idIssuePlace"
                  placeholder="Nhập ngày cấp CMND/CCCD..."
                  label="Nơi cấp CMND/CCCD"
                  value={values.idIssuePlace}
                  feedback={errors.idIssuePlace}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.idIssuePlace && errors.idIssuePlace}
                  isRequired
                />
              </div>
              <button
                className="relative w-full h-auto mt-5 inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                type="submit"
              >
                Lưu
                {isSubmitting && '...'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
