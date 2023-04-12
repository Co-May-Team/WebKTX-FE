import axios from "axios"
import { Formik } from "formik"
import { useEffect, useState } from "react"
import { Form } from "reactstrap"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"

export default function FamilyInfoForm() {
  const [provinces, setProvinces] = useState([])
  const [loadingProvinces, setLoadingProvinces] = useState(true)
  const [districts, setDistricts] = useState([])
  const [loadingDistricts, setLoadingDistricts] = useState(true)
  const [wards, setWards] = useState([])
  const [loadingWards, setLoadingWards] = useState(true)

  const handleSaveInput = (e) => {
    const { name, value } = e.target
    const currentFamilyInfo = JSON.parse(localStorage.getItem("familyInfo"))
    currentFamilyInfo[name] = value
    localStorage.setItem("familyInfo", JSON.stringify(currentFamilyInfo))
  }
  const handleSaveChildrenInput = (e) => {
    const { name, value } = e.target
    const currentFamilyInfo = JSON.parse(localStorage.getItem("familyInfo"))
    const [parent, fieldName] = name.split(".")
    currentFamilyInfo[parent][fieldName] = value
    localStorage.setItem("familyInfo", JSON.stringify(currentFamilyInfo))
  }
  const handleSaveChildrenOption = (name, value) => {
    const [parent, fieldName] = name.split(".")
    const currentFamilyInfo = JSON.parse(localStorage.getItem("familyInfo"))
    currentFamilyInfo[parent][fieldName] = value
    localStorage.setItem("familyInfo", JSON.stringify(currentFamilyInfo))
  }
  const handleChangeFatherInfo = (name, value, setFieldValue) => {
    let currentFamilyInfo = JSON.parse(localStorage.getItem("familyInfo"))
    currentFamilyInfo = {
      ...currentFamilyInfo,
      father: {
        ...currentFamilyInfo?.father,
        [name]: value,
      },
    }
    setFieldValue("father", currentFamilyInfo.father)
    localStorage.setItem("familyInfo", JSON.stringify(currentFamilyInfo))
  }
  const handleChangeMotherInfo = (name, value, setFieldValue) => {
    let currentFamilyInfo = JSON.parse(localStorage.getItem("familyInfo"))
    currentFamilyInfo = {
      ...currentFamilyInfo,
      mother: {
        ...currentFamilyInfo?.mother,
        [name]: value,
      },
    }
    setFieldValue("mother", currentFamilyInfo.mother)
    localStorage.setItem("familyInfo", JSON.stringify(currentFamilyInfo))
  }
  const handleChangeRelativesInfo = (name, value, index, setFieldValue) => {
    let currentFamilyInfo = JSON.parse(localStorage.getItem("familyInfo"))
    currentFamilyInfo.relatives?.splice(index, 1, {
      ...currentFamilyInfo.relatives[index],
      [name]: value,
    })
    setFieldValue("relatives", currentFamilyInfo.relatives)
    localStorage.setItem("familyInfo", JSON.stringify(currentFamilyInfo))
  }

  useEffect(() => {
    if (!localStorage.getItem("familyInfo")) {
      localStorage.setItem(
        "familyInfo",
        JSON.stringify({
          father: {
            status: "",
            fullName: "",
            yearOfBirth: "",
            phoneNumber: "",
            provinceAddress: "",
            districtAddress: "",
            wardAddress: "",
            detailAddress: "",
            currentJob: "",
            income: "",
            healthStatus: "",
          },
          mother: {
            status: "",
            fullName: "",
            yearOfBirth: "",
            phoneNumber: "",
            provinceAddress: "",
            districtAddress: "",
            wardAddress: "",
            detailAddress: "",
            currentJob: "",
            income: "",
            healthStatus: "",
          },
          relatives: [
            {
              relationship: "",
              fullName: "",
              yearOfBirth: "",
              phoneNumber: "",
              provinceAddress: "",
              districtAddress: "",
              wardAddress: "",
              detailAddress: "",
              currentJob: "",
              income: "",
              healthStatus: "",
            },
          ],
          familyBackground: "",
        })
      )
    }
  }, [])

  useEffect(() => {
    setLoadingProvinces(true)
    if (JSON.parse(localStorage.getItem("provinces"))?.length > 0) {
      setProvinces(JSON.parse(localStorage.getItem("provinces")))
      setLoadingProvinces(false)
    } else {
      axios
        .get("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
        .then((response) => {
          localStorage.setItem(
            "provinces",
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

  /* Thông tin gia đình */
  const initialValuesFamilyInfo = JSON.parse(
    localStorage.getItem("familyInfo")
  ) || {
    father: {
      status: "",
      fullName: "",
      yearOfBirth: "",
      phoneNumber: "",
      provinceAddress: "",
      districtAddress: "",
      wardAddress: "",
      detailAddress: "",
      currentJob: "",
      income: "",
      healthStatus: "",
    },
    mother: {
      status: "",
      fullName: "",
      yearOfBirth: "",
      phoneNumber: "",
      provinceAddress: "",
      districtAddress: "",
      wardAddress: "",
      detailAddress: "",
      currentJob: "",
      income: "",
      healthStatus: "",
    },
    relatives: [
      {
        relationship: "",
        fullName: "",
        yearOfBirth: "",
        phoneNumber: "",
        provinceAddress: "",
        districtAddress: "",
        wardAddress: "",
        detailAddress: "",
        currentJob: "",
        income: "",
        healthStatus: "",
      },
    ],
    familyBackground: "",
  }

  const validationSchemaFamilyInfo = Yup.object().shape({
    father: Yup.object().shape({
      status: Yup.object().required("Trạng thái thông tin của cha là bắt buộc"),
      fullName: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Họ tên của cha là bắt buộc"),
        otherwise: Yup.string(),
      }),
      yearOfBirth: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Năm sinh của cha là bắt buộc"),
        otherwise: Yup.string(),
      }),
      phoneNumber: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string()
          .matches(
            /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
            "Số điện thoại không hợp lệ"
          )
          .required("Số điện thoại của cha là bắt buộc"),
        otherwise: Yup.string(),
      }),
      provinceAddress: Yup.object().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.object()
          .nullable()
          .required("Tỉnh/Thành phố của cha là bắt buộc"),
        otherwise: Yup.object(),
      }),
      districtAddress: Yup.object().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.object()
          .nullable()
          .required("Quận/Huyện của cha là bắt buộc"),
        otherwise: Yup.object(),
      }),
      wardAddress: Yup.object().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.object().nullable().required("Phường/Xã của cha là bắt buộc"),
        otherwise: Yup.object(),
      }),
      detailAddress: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Địa chỉ của cha là bắt buộc"),
        otherwise: Yup.string(),
      }),
      currentJob: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Nghề nghiệp hiện tại của cha là bắt buộc"),
        otherwise: Yup.string(),
      }),
      income: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Thu nhập của cha là bắt buộc"),
        otherwise: Yup.string(),
      }),
      healthStatus: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Tình trạng sức khỏe của cha là bắt buộc"),
        otherwise: Yup.string(),
      }),
    }),
    mother: Yup.object().shape({
      status: Yup.object().required("Trạng thái thông tin của mẹ là bắt buộc"),
      fullName: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Họ tên của mẹ là bắt buộc"),
        otherwise: Yup.string(),
      }),
      yearOfBirth: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Năm sinh của mẹ là bắt buộc"),
        otherwise: Yup.string(),
      }),
      phoneNumber: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string()
          .matches(
            /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
            "Số điện thoại không hợp lệ"
          )
          .required("Số điện thoại của mẹ là bắt buộc"),
        otherwise: Yup.string(),
      }),
      provinceAddress: Yup.object().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.object()
          .nullable()
          .required("Tỉnh/Thành phố của mẹ là bắt buộc"),
        otherwise: Yup.object(),
      }),
      districtAddress: Yup.object().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.object().nullable().required("Quận/Huyện của mẹ là bắt buộc"),
        otherwise: Yup.object(),
      }),
      wardAddress: Yup.object().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.object().nullable().required("Phường/Xã của mẹ là bắt buộc"),
        otherwise: Yup.object(),
      }),
      detailAddress: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Địa chỉ của mẹ là bắt buộc"),
        otherwise: Yup.string(),
      }),
      currentJob: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Nghề nghiệp hiện tại của mẹ là bắt buộc"),
        otherwise: Yup.string(),
      }),
      income: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Thu nhập của mẹ là bắt buộc"),
        otherwise: Yup.string(),
      }),
      healthStatus: Yup.string().when("status", {
        is: (val) => val?.value === "Có thông tin",
        then: Yup.string().required("Tình trạng sức khỏe của mẹ là bắt buộc"),
        otherwise: Yup.string(),
      }),
    }),
    relatives: Yup.array().of(
      Yup.object().shape({
        relationship: Yup.string().required(
          "Mối quan hệ với người thân không được để trống"
        ),
        fullName: Yup.string().required(
          "Họ tên người thân không được để trống"
        ),
        yearOfBirth: Yup.string().required("Nơi sinh không được để trống"),
        phoneNumber: Yup.string()
          .matches(
            /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
            "Số điện thoại không hợp lệ"
          )
          .required("Số điện thoại không được để trống"),
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
        currentJob: Yup.string().required(
          "Công việc hiện tại của người thân không được để trống"
        ),
        income: Yup.string().required(
          "Thu nhập của người thân không được để trống"
        ),
        healthStatus: Yup.string().required(
          "Tình trạng sức khỏe của người thân không được để trống"
        ),
      })
    ),
    familyBackground: Yup.string().required(
      "Hoàn cảnh gia đình không được để trống"
    ),
  })

  const handleSubmitFamilyInfo = async (values, actions) => {
    actions.setSubmitting(true)
    console.log(values)
    actions.setSubmitting(false)
  }
  /* */
  return (
    <div id='family-info' className='container relative pb-16 lg:pb-28'>
      <div className='p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl sm:p-10 lg:p-16 dark:bg-neutral-900'>
        <header className=' my-5 text-center mx-auto'>
          <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
            II. HOÀN CẢNH GIA ĐÌNH
          </h2>
          <span className='block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200'>
            Các bạn vui lòng điền đúng thông tin để tránh sai sót nhé. Những mục
            nào không có thì bạn tích vào không có!
          </span>
        </header>
        <Formik
          initialValues={initialValuesFamilyInfo}
          validationSchema={validationSchemaFamilyInfo}
          onSubmit={handleSubmitFamilyInfo}
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
                {/* Phần nhập thông tin cha */}
                <div className='p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'>
                  <header className=' my-5 text-center mx-auto'>
                    <h2 className='flex items-center text-2xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                      1. Thông tin cha
                    </h2>
                  </header>
                  <div className='grid gap-6'>
                    <InputField
                      type='select'
                      label='Trạng thái thông tin'
                      placeholder='Chọn trạng thái thông tin của cha...'
                      value={values.father?.status}
                      onChange={(selectedOption) => {
                        handleChangeFatherInfo(
                          "status",
                          selectedOption,
                          setFieldValue
                        )
                      }}
                      feedback={errors.father?.status}
                      invalid={touched.father?.status && errors.father?.status}
                      options={[
                        { value: "Có thông tin", label: "Có thông tin" },
                        { value: "Không rõ", label: "Không rõ" },
                        { value: "Đã qua đời", label: "Đã qua đời" },
                      ]}
                      isRequired
                    />
                    <InputField
                      type='text'
                      name='father.fullName'
                      placeholder='Nhập họ tên của cha...'
                      label='Họ tên'
                      value={values.father?.fullName}
                      feedback={errors.father?.fullName}
                      onChange={(e) => {
                        handleChangeFatherInfo(
                          "fullName",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={
                        touched.father?.fullName && errors.father?.fullName
                      }
                      isRequired={
                        values.father?.status.value === "Có thông tin"
                      }
                    />
                    <InputField
                      type='text'
                      name='father.yearOfBirth'
                      placeholder='Nhập năm sinh của cha...'
                      label='Năm sinh'
                      value={values.father?.yearOfBirth}
                      feedback={errors.father?.yearOfBirth}
                      onChange={(e) => {
                        handleChangeFatherInfo(
                          "yearOfBirth",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={
                        touched.father?.yearOfBirth &&
                        errors.father?.yearOfBirth
                      }
                      isRequired={
                        values.father?.status.value === "Có thông tin"
                      }
                    />
                    <InputField
                      type='text'
                      name='father.phoneNumber'
                      placeholder='Nhập số điện thoại của cha...'
                      label='Số điện thoại'
                      value={values.father?.phoneNumber}
                      feedback={errors.father?.phoneNumber}
                      onChange={(e) => {
                        handleChangeFatherInfo(
                          "phoneNumber",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={
                        touched.father?.phoneNumber &&
                        errors.father?.phoneNumber
                      }
                      isRequired={
                        values.father?.status.value === "Có thông tin"
                      }
                    />
                    <div className='p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg dark:bg-neutral-900'>
                      <header className='mb-5 text-center mx-auto'>
                        <h2 className='flex items-center leading-[115%] md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                          Chỗ ở hiện tại
                        </h2>
                      </header>
                      <div className='grid md:grid-cols-2 gap-6'>
                        <InputField
                          type='select'
                          label='Tỉnh/Thành phố'
                          placeholder='Chọn tỉnh/thành phố của cha...'
                          value={values.father?.provinceAddress}
                          onChange={(selectedOption) => {
                            handleChangeFatherInfo(
                              "provinceAddress",
                              selectedOption,
                              setFieldValue
                            )
                            handleChangeFatherInfo(
                              "districtAddress",
                              "",
                              setFieldValue
                            )
                            handleChangeFatherInfo(
                              "wardAddress",
                              "",
                              setFieldValue
                            )
                            setDistricts([])
                            setWards([])
                            handleProvinceChange(selectedOption)
                          }}
                          clearValue={() => {
                            handleChangeFatherInfo(
                              "provinceAddress",
                              "",
                              setFieldValue
                            )
                            handleChangeFatherInfo(
                              "districtAddress",
                              "",
                              setFieldValue
                            )
                            handleChangeFatherInfo(
                              "wardAddress",
                              "",
                              setFieldValue
                            )
                          }}
                          isLoading={loadingProvinces}
                          getOptionValue={(option) => option._id}
                          getOptionLabel={(option) => option.name}
                          feedback={errors.father?.provinceAddress}
                          invalid={
                            touched.father?.provinceAddress &&
                            errors.father?.provinceAddress
                          }
                          options={provinces}
                          isRequired={
                            values.father?.status.value === "Có thông tin"
                          }
                        />
                        <InputField
                          type='select'
                          label='Quận/Huyện'
                          placeholder='Chọn quận/huyện của cha...'
                          value={values.father?.districtAddress}
                          onChange={(selectedOption) => {
                            handleChangeFatherInfo(
                              "districtAddress",
                              selectedOption,
                              setFieldValue
                            )
                            handleChangeFatherInfo(
                              "wardAddress",
                              "",
                              setFieldValue
                            )
                            handleDistrictChange(selectedOption)
                          }}
                          clearValue={() => {
                            handleChangeFatherInfo(
                              "districtAddress",
                              "",
                              setFieldValue
                            )
                            handleChangeFatherInfo(
                              "wardAddress",
                              "",
                              setFieldValue
                            )
                          }}
                          isLoading={loadingDistricts}
                          getOptionValue={(option) => option._id}
                          getOptionLabel={(option) => option.name}
                          loadingMessage={() => "Vui lòng chọn tỉnh/thành phố"}
                          feedback={errors.father?.districtAddress}
                          invalid={
                            touched.father?.districtAddress &&
                            errors.father?.districtAddress
                          }
                          options={districts}
                          isRequired={
                            values.father?.status.value === "Có thông tin"
                          }
                        />
                        <InputField
                          type='select'
                          label='Xã/Phường'
                          placeholder='Chọn xã/phường của cha...'
                          value={values.father?.wardAddress}
                          onChange={(selectedOption) => {
                            handleChangeFatherInfo(
                              "wardAddress",
                              selectedOption,
                              setFieldValue
                            )
                          }}
                          clearValue={() => {
                            handleChangeFatherInfo(
                              "wardAddress",
                              "",
                              setFieldValue
                            )
                          }}
                          loadingMessage={() => "Vui lòng chọn quận/huyện"}
                          isLoading={loadingWards}
                          getOptionValue={(option) => option._id}
                          getOptionLabel={(option) => option.name}
                          feedback={errors.father?.wardAddress}
                          invalid={
                            touched.father?.wardAddress &&
                            errors.father?.wardAddress
                          }
                          options={wards}
                          isRequired={
                            values.father?.status.value === "Có thông tin"
                          }
                        />
                        <InputField
                          type='text'
                          name='father.detailAddress'
                          placeholder='Nhập số nhà, tên đường, khu phố của cha...'
                          label='Số nhà, tên đường, khu phố'
                          value={values.father?.detailAddress}
                          feedback={errors.father?.detailAddress}
                          onChange={(e) => {
                            handleChangeFatherInfo(
                              "detailAddress",
                              e.target.value,
                              setFieldValue
                            )
                          }}
                          invalid={
                            touched.father?.detailAddress &&
                            errors.father?.detailAddress
                          }
                          isRequired={
                            values.father?.status.value === "Có thông tin"
                          }
                        />
                      </div>
                    </div>
                    <InputField
                      type='text'
                      name='father.currentJob'
                      placeholder='Nhập nghề nghiệp hiện tại của cha...'
                      label='Nghề nghiệp hiện tại'
                      value={values.father?.currentJob}
                      feedback={errors.father?.currentJob}
                      onChange={(e) => {
                        handleChangeFatherInfo(
                          "currentJob",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={
                        touched.father?.currentJob && errors.father?.currentJob
                      }
                      isRequired={
                        values.father?.status.value === "Có thông tin"
                      }
                    />
                    <InputField
                      type='text'
                      name='father.income'
                      placeholder='Nhập thu nhập của cha...'
                      label='Thu nhập'
                      value={values.father?.income}
                      feedback={errors.father?.income}
                      note='Ví dụ: 3000000'
                      onChange={(e) => {
                        handleChangeFatherInfo(
                          "income",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={touched.father?.income && errors.father?.income}
                      isRequired={
                        values.father?.status.value === "Có thông tin"
                      }
                    />
                    <InputField
                      type='text'
                      name='father.healthStatus'
                      placeholder='Nhập tình trạng sức khỏe của cha...'
                      label='Tình trạng sức khỏe'
                      value={values.father?.healthStatus}
                      feedback={errors.father?.healthStatus}
                      onChange={(e) => {
                        handleChangeFatherInfo(
                          "healthStatus",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={
                        touched.father?.healthStatus &&
                        errors.father?.healthStatus
                      }
                      isRequired={
                        values.father?.status.value === "Có thông tin"
                      }
                    />
                  </div>
                </div>
                {/* Phần nhập thông tin mẹ */}
                <div className='p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'>
                  <header className=' my-5 text-center mx-auto'>
                    <h2 className='flex items-center text-2xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                      2. Thông tin mẹ
                    </h2>
                  </header>
                  <div className='grid gap-6'>
                    <InputField
                      type='select'
                      label='Trạng thái thông tin'
                      placeholder='Chọn trạng thái thông tin của mẹ...'
                      value={values.mother?.status}
                      onChange={(selectedOption) => {
                        handleChangeMotherInfo(
                          "status",
                          selectedOption,
                          setFieldValue
                        )
                      }}
                      feedback={errors.mother?.status}
                      invalid={touched.mother?.status && errors.mother?.status}
                      options={[
                        { value: "Có thông tin", label: "Có thông tin" },
                        { value: "Không rõ", label: "Không rõ" },
                        { value: "Đã qua đời", label: "Đã qua đời" },
                      ]}
                      isRequired
                    />
                    <InputField
                      type='text'
                      name='mother.fullName'
                      placeholder='Nhập họ tên của mẹ...'
                      label='Họ tên'
                      value={values.mother?.fullName}
                      feedback={errors.mother?.fullName}
                      onChange={(e) => {
                        handleChangeMotherInfo(
                          "fullName",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={
                        touched.mother?.fullName && errors.mother?.fullName
                      }
                      isRequired={
                        values.mother?.status.value === "Có thông tin"
                      }
                    />
                    <InputField
                      type='text'
                      name='mother.yearOfBirth'
                      placeholder='Nhập năm sinh của mẹ...'
                      label='Năm sinh'
                      value={values.mother?.yearOfBirth}
                      feedback={errors.mother?.yearOfBirth}
                      onChange={(e) => {
                        handleChangeMotherInfo(
                          "yearOfBirth",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={
                        touched.mother?.yearOfBirth &&
                        errors.mother?.yearOfBirth
                      }
                      isRequired={
                        values.mother?.status.value === "Có thông tin"
                      }
                    />
                    <InputField
                      type='text'
                      name='mother.phoneNumber'
                      placeholder='Nhập số điện thoại của mẹ...'
                      label='Số điện thoại'
                      value={values.mother?.phoneNumber}
                      feedback={errors.mother?.phoneNumber}
                      onChange={(e) => {
                        handleChangeMotherInfo(
                          "phoneNumber",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={
                        touched.mother?.phoneNumber &&
                        errors.mother?.phoneNumber
                      }
                      isRequired={
                        values.mother?.status.value === "Có thông tin"
                      }
                    />
                    <div className='p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg dark:bg-neutral-900'>
                      <header className='mb-5 text-center mx-auto'>
                        <h2 className='flex items-center leading-[115%] md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                          Chỗ ở hiện tại
                        </h2>
                      </header>
                      <div className='grid md:grid-cols-2 gap-6'>
                        <InputField
                          type='select'
                          label='Tỉnh/Thành phố'
                          placeholder='Chọn tỉnh/thành phố của mẹ...'
                          value={values.mother?.provinceAddress}
                          onChange={(selectedOption) => {
                            handleChangeMotherInfo(
                              "provinceAddress",
                              selectedOption,
                              setFieldValue
                            )
                            handleChangeMotherInfo(
                              "districtAddress",
                              "",
                              setFieldValue
                            )
                            handleChangeMotherInfo(
                              "wardAddress",
                              "",
                              setFieldValue
                            )
                            setDistricts([])
                            setWards([])
                            handleProvinceChange(selectedOption)
                          }}
                          clearValue={() => {
                            handleChangeMotherInfo(
                              "provinceAddress",
                              "",
                              setFieldValue
                            )
                            handleChangeMotherInfo(
                              "districtAddress",
                              "",
                              setFieldValue
                            )
                            handleChangeMotherInfo(
                              "wardAddress",
                              "",
                              setFieldValue
                            )
                          }}
                          isLoading={loadingProvinces}
                          getOptionValue={(option) => option._id}
                          getOptionLabel={(option) => option.name}
                          feedback={errors.mother?.provinceAddress}
                          invalid={
                            touched.mother?.provinceAddress &&
                            errors.mother?.provinceAddress
                          }
                          options={provinces}
                          isRequired={
                            values.mother?.status.value === "Có thông tin"
                          }
                        />
                        <InputField
                          type='select'
                          label='Quận/Huyện'
                          placeholder='Chọn quận/huyện của mẹ...'
                          value={values.mother?.districtAddress}
                          onChange={(selectedOption) => {
                            handleChangeMotherInfo(
                              "districtAddress",
                              selectedOption,
                              setFieldValue
                            )
                            handleChangeMotherInfo(
                              "wardAddress",
                              "",
                              setFieldValue
                            )
                            handleDistrictChange(selectedOption)
                          }}
                          clearValue={() => {
                            handleChangeMotherInfo(
                              "districtAddress",
                              "",
                              setFieldValue
                            )
                            handleChangeMotherInfo(
                              "wardAddress",
                              "",
                              setFieldValue
                            )
                          }}
                          isLoading={loadingDistricts}
                          getOptionValue={(option) => option._id}
                          getOptionLabel={(option) => option.name}
                          loadingMessage={() => "Vui lòng chọn tỉnh/thành phố"}
                          feedback={errors.mother?.districtAddress}
                          invalid={
                            touched.mother?.districtAddress &&
                            errors.mother?.districtAddress
                          }
                          options={districts}
                          isRequired={
                            values.mother?.status.value === "Có thông tin"
                          }
                        />
                        <InputField
                          type='select'
                          label='Xã/Phường'
                          placeholder='Chọn xã/phường của mẹ...'
                          value={values.mother?.wardAddress}
                          onChange={(selectedOption) => {
                            handleChangeMotherInfo(
                              "wardAddress",
                              selectedOption,
                              setFieldValue
                            )
                          }}
                          clearValue={() => {
                            handleChangeMotherInfo(
                              "wardAddress",
                              "",
                              setFieldValue
                            )
                          }}
                          loadingMessage={() => "Vui lòng chọn quận/huyện"}
                          isLoading={loadingWards}
                          getOptionValue={(option) => option._id}
                          getOptionLabel={(option) => option.name}
                          feedback={errors.mother?.wardAddress}
                          invalid={
                            touched.mother?.wardAddress &&
                            errors.mother?.wardAddress
                          }
                          options={wards}
                          isRequired={
                            values.mother?.status.value === "Có thông tin"
                          }
                        />
                        <InputField
                          type='text'
                          name='mother.detailAddress'
                          placeholder='Nhập số nhà, tên đường, khu phố của mẹ...'
                          label='Số nhà, tên đường, khu phố'
                          value={values.mother?.detailAddress}
                          feedback={errors.mother?.detailAddress}
                          onChange={(e) => {
                            handleChangeMotherInfo(
                              "detailAddress",
                              e.target.value,
                              setFieldValue
                            )
                          }}
                          invalid={
                            touched.mother?.detailAddress &&
                            errors.mother?.detailAddress
                          }
                          isRequired={
                            values.mother?.status.value === "Có thông tin"
                          }
                        />
                      </div>
                    </div>
                    <InputField
                      type='text'
                      name='mother.currentJob'
                      placeholder='Nhập nghề nghiệp hiện tại của mẹ...'
                      label='Nghề nghiệp hiện tại'
                      value={values.mother?.currentJob}
                      feedback={errors.mother?.currentJob}
                      onChange={(e) => {
                        handleChangeMotherInfo(
                          "currentJob",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={
                        touched.mother?.currentJob && errors.mother?.currentJob
                      }
                      isRequired={
                        values.mother?.status.value === "Có thông tin"
                      }
                    />
                    <InputField
                      type='text'
                      name='mother.income'
                      placeholder='Nhập thu nhập của mẹ...'
                      label='Thu nhập'
                      value={values.mother?.income}
                      feedback={errors.mother?.income}
                      note='Ví dụ: 3000000'
                      onChange={(e) => {
                        handleChangeMotherInfo(
                          "income",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={touched.mother?.income && errors.mother?.income}
                      isRequired={
                        values.mother?.status.value === "Có thông tin"
                      }
                    />
                    <InputField
                      type='text'
                      name='mother.healthStatus'
                      placeholder='Nhập tình trạng sức khỏe của mẹ...'
                      label='Tình trạng sức khỏe'
                      value={values.mother?.healthStatus}
                      feedback={errors.mother?.healthStatus}
                      onChange={(e) => {
                        handleChangeMotherInfo(
                          "healthStatus",
                          e.target.value,
                          setFieldValue
                        )
                      }}
                      invalid={
                        touched.mother?.healthStatus &&
                        errors.mother?.healthStatus
                      }
                      isRequired={
                        values.mother?.status.value === "Có thông tin"
                      }
                    />
                  </div>
                </div>
                {/* Phần nhập thông tin người thân */}
                <div className='p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'>
                  <header className='text-center mx-auto'>
                    <h2 className='flex items-center text-2xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                      3. Thông tin người thân
                    </h2>
                    <span className='block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200'>
                      Các bạn vui lòng điền đúng thông tin để tránh sai sót nhé!
                    </span>
                  </header>
                  <div className='grid gap-6'>
                    {values.relatives?.map((relative, index) => (
                      <div
                        key={index}
                        className='relative p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'
                      >
                        <span
                          className='absolute right-2 top-2 p-1'
                          onClick={() => {
                            let temp = values.relatives
                            temp.splice(index, 1)
                            setFieldValue("relatives", temp)
                          }}
                        >
                          <button
                            className='w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none'
                            title='Xóa người thân'
                          >
                            <span className='sr-only'>Xóa người thân</span>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                              className='w-5 h-5'
                            >
                              <path
                                fillRule='evenodd'
                                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                        </span>
                        <header className='text-center mx-auto'>
                          <h2 className='flex items-center text-2xl leading-[115%] md:text-3xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                            Thông tin người thân thứ {" " + (index + 1)}
                          </h2>
                        </header>
                        <div className='grid gap-6'>
                          <InputField
                            type='text'
                            name={`relationship`}
                            placeholder={`Nhập mối quan hệ với người thân thứ ${
                              index + 1
                            }...`}
                            label={`Mối quan hệ`}
                            value={relative.relationship}
                            feedback={errors.relatives?.[index]?.relationship}
                            note='Nhập mối quan hệ của bạn với người này. Ví dụ: bà ngoại.'
                            onChange={(e) => {
                              handleChangeRelativesInfo(
                                "relationship",
                                e.target.value,
                                index,
                                setFieldValue
                              )
                            }}
                            invalid={
                              touched.relatives?.[index]?.relationship &&
                              errors.relatives?.[index]?.relationship
                            }
                            isRequired
                          />
                          <InputField
                            type='text'
                            name={`fullName`}
                            placeholder={`Nhập họ tên của người thân thứ ${
                              index + 1
                            }...`}
                            label={`Họ tên`}
                            value={relative.fullName}
                            feedback={errors.relatives?.[index]?.fullName}
                            onChange={(e) => {
                              handleChangeRelativesInfo(
                                "fullName",
                                e.target.value,
                                index,
                                setFieldValue
                              )
                            }}
                            invalid={
                              touched.relatives?.[index]?.fullName &&
                              errors.relatives?.[index]?.fullName
                            }
                            isRequired
                          />
                          <InputField
                            type='text'
                            name={`yearOfBirth`}
                            placeholder={`Nhập năm sinh của người thân thứ ${
                              index + 1
                            }...`}
                            label={`Năm sinh`}
                            value={relative.yearOfBirth}
                            feedback={errors.relatives?.[index]?.yearOfBirth}
                            onChange={(e) => {
                              handleChangeRelativesInfo(
                                "yearOfBirth",
                                e.target.value,
                                index,
                                setFieldValue
                              )
                            }}
                            invalid={
                              touched.relatives?.[index]?.yearOfBirth &&
                              errors.relatives?.[index]?.yearOfBirth
                            }
                            isRequired
                          />
                          <InputField
                            type='text'
                            name={`phoneNumber`}
                            placeholder={`Nhập số điện thoại của người thân thứ ${
                              index + 1
                            }...`}
                            label={`Số điện thoại`}
                            value={relative.phoneNumber}
                            feedback={errors.relatives?.[index]?.phoneNumber}
                            onChange={(e) => {
                              handleChangeRelativesInfo(
                                "phoneNumber",
                                e.target.value,
                                index,
                                setFieldValue
                              )
                            }}
                            invalid={
                              touched.relatives?.[index]?.phoneNumber &&
                              errors.relatives?.[index]?.phoneNumber
                            }
                            isRequired
                          />
                          <div className='p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg dark:bg-neutral-900'>
                            <header className='mb-5 text-center mx-auto'>
                              <h2 className='flex items-center leading-[115%] md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                                Chỗ ở hiện tại
                              </h2>
                            </header>
                            <div className='grid md:grid-cols-2 gap-6'>
                              <InputField
                                type='select'
                                label='Tỉnh/thành phố'
                                placeholder='Chọn tỉnh/thành phố...'
                                name='provinceAddress'
                                value={relative.provinceAddress}
                                onChange={(selectedOption) => {
                                  handleChangeRelativesInfo(
                                    "provinceAddress",
                                    selectedOption,
                                    index,
                                    setFieldValue
                                  )
                                  handleChangeRelativesInfo(
                                    "districtAddress",
                                    "",
                                    index,
                                    setFieldValue
                                  )
                                  handleChangeRelativesInfo(
                                    "wardAddress",
                                    "",
                                    index,
                                    setFieldValue
                                  )
                                  setDistricts([])
                                  setWards([])
                                  handleProvinceChange(selectedOption)
                                }}
                                clearValue={() => {
                                  handleChangeRelativesInfo(
                                    "provinceAddress",
                                    "",
                                    index,
                                    setFieldValue
                                  )
                                  handleChangeRelativesInfo(
                                    "districtAddress",
                                    "",
                                    index,
                                    setFieldValue
                                  )
                                  handleChangeRelativesInfo(
                                    "wardAddress",
                                    "",
                                    index,
                                    setFieldValue
                                  )
                                }}
                                isLoading={loadingProvinces}
                                getOptionValue={(option) => option._id}
                                getOptionLabel={(option) => option.name}
                                feedback={
                                  errors?.relatives?.[index]?.provinceAddress
                                }
                                invalid={
                                  touched.relatives?.[index]?.provinceAddress &&
                                  errors.relatives?.[index]?.provinceAddress
                                }
                                options={provinces}
                                isRequired
                              />
                              <InputField
                                type='select'
                                label='Quận/huyện'
                                placeholder='Chọn quận/huyện...'
                                value={relative.districtAddress}
                                onChange={(selectedOption) => {
                                  handleChangeRelativesInfo(
                                    "districtAddress",
                                    selectedOption,
                                    index,
                                    setFieldValue
                                  )
                                  handleChangeRelativesInfo(
                                    "wardAddress",
                                    "",
                                    index,
                                    setFieldValue
                                  )
                                  handleDistrictChange(selectedOption)
                                }}
                                clearValue={() => {
                                  handleChangeRelativesInfo(
                                    "districtAddress",
                                    "",
                                    index,
                                    setFieldValue
                                  )
                                  handleChangeRelativesInfo(
                                    "wardAddress",
                                    "",
                                    index,
                                    setFieldValue
                                  )
                                }}
                                isLoading={loadingDistricts}
                                getOptionValue={(option) => option._id}
                                getOptionLabel={(option) => option.name}
                                loadingMessage={() =>
                                  "Vui lòng chọn tỉnh/thành phố"
                                }
                                feedback={
                                  errors.relatives?.[index]?.districtAddress
                                }
                                invalid={
                                  touched.relatives?.[index]?.districtAddress &&
                                  errors.relatives?.[index]?.districtAddress
                                }
                                options={districts}
                                isRequired
                              />
                              <InputField
                                type='select'
                                label='Xã/phường/thị trấn'
                                placeholder='Chọn xã/phường/thị trấn...'
                                value={relative.wardAddress}
                                onChange={(selectedOption) => {
                                  handleChangeRelativesInfo(
                                    "wardAddress",
                                    selectedOption,
                                    index,
                                    setFieldValue
                                  )
                                }}
                                clearValue={() => {
                                  handleChangeRelativesInfo(
                                    "wardAddress",
                                    "",
                                    index,
                                    setFieldValue
                                  )
                                }}
                                loadingMessage={() =>
                                  "Vui lòng chọn quận/huyện"
                                }
                                isLoading={loadingWards}
                                getOptionValue={(option) => option._id}
                                getOptionLabel={(option) => option.name}
                                feedback={
                                  errors.relatives?.[index]?.wardAddress
                                }
                                invalid={
                                  touched.relatives?.[index]?.wardAddress &&
                                  errors.relatives?.[index]?.wardAddress
                                }
                                options={wards}
                                isRequired
                              />
                              <InputField
                                type='text'
                                name='detailAddress'
                                placeholder='Nhập số nhà, tên đường, khu phố...'
                                label='Số nhà, tên đường, khu phố'
                                value={relative.detailAddress}
                                feedback={
                                  errors.relatives?.[index]?.detailAddress
                                }
                                onChange={(e) => {
                                  handleChangeRelativesInfo(
                                    "detailAddress",
                                    e.target.value,
                                    index,
                                    setFieldValue
                                  )
                                }}
                                invalid={
                                  touched.relatives?.[index]?.detailAddress &&
                                  errors.relatives?.[index]?.detailAddress
                                }
                                isRequired
                              />
                            </div>
                          </div>
                          <InputField
                            type='text'
                            name={`currentJob`}
                            placeholder={`Nhập công việc hiện tại của người thân thứ ${
                              index + 1
                            }...`}
                            label={`Công việc hiện tại`}
                            value={values.relatives?.[index]?.currentJob}
                            feedback={errors.relatives?.[index]?.currentJob}
                            onChange={(e) => {
                              handleChangeRelativesInfo(
                                "currentJob",
                                e.target.value,
                                index,
                                setFieldValue
                              )
                            }}
                            invalid={
                              touched.relatives?.[index]?.currentJob &&
                              errors.relatives?.[index]?.currentJob
                            }
                            isRequired
                          />
                          <InputField
                            type='text'
                            name={`income`}
                            placeholder={`Nhập thu nhập của người thân thứ ${
                              index + 1
                            }...`}
                            label={`Thu nhập (VNĐ)`}
                            value={relative.income}
                            feedback={errors.relatives?.[index]?.income}
                            note='Ví dụ: 3000000'
                            onChange={(e) => {
                              handleChangeRelativesInfo(
                                "income",
                                e.target.value,
                                index,
                                setFieldValue
                              )
                            }}
                            invalid={
                              touched.relatives?.[index]?.income &&
                              errors.relatives?.[index]?.income
                            }
                            isRequired
                          />
                          <InputField
                            type='text'
                            name={`healthStatus`}
                            placeholder={`Nhập tình trạng sức khỏe của người thân thứ ${
                              index + 1
                            }...`}
                            label={`Tình trạng sức khỏe của người thân thứ ${
                              index + 1
                            }`}
                            value={relative.healthStatus}
                            feedback={errors.relatives?.[index]?.healthStatus}
                            onChange={(e) => {
                              handleChangeRelativesInfo(
                                "healthStatus",
                                e.target.value,
                                index,
                                setFieldValue
                              )
                            }}
                            invalid={
                              touched.relatives?.[index]?.healthStatus &&
                              errors.relative?.s[index]?.healthStatus
                            }
                            isRequired
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className='relative w-full h-auto mt-5 inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                    type='button'
                    onClick={() =>
                      setFieldValue("relatives", [
                        ...values.relatives,
                        {
                          relationship: "",
                          fullName: "",
                          yearOfBirth: "",
                          phoneNumber: "",
                          provinceAddress: "",
                          districtAddress: "",
                          wardAddress: "",
                          detailAddress: "",
                          currentJob: "",
                          income: "",
                          healthStatus: "",
                        },
                      ])
                    }
                  >
                    Thêm người thân
                  </button>
                </div>
                <InputField
                  type='textarea'
                  name='familyBackground'
                  rows={10}
                  placeholder='Nhập hoàn cảnh gia đình...'
                  label='Hoàn cảnh gia đình'
                  value={values.familyBackground}
                  feedback={errors.familyBackground}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  invalid={touched.familyBackground && errors.familyBackground}
                  note='Bạn hãy kể rõ, chi tiết về hoàn cảnh khó khăn của gia đình bạn để ban xét duyệt thấy được bạn là người xứng đáng được lựa chọn.'
                  isRequired
                />
                <button
                  className='relative w-full h-auto mt-5 inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                  type='submit'
                >
                  Lưu
                  {isSubmitting && "..."}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
