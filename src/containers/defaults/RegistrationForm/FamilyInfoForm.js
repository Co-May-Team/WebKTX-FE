import { Formik } from "formik"
import { useEffect, useMemo, useState } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { Form } from "reactstrap"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"
import Motion from "~/components/Motion"
import axiosClient from "~/services/axiosClient"
import FamilyInfoFormItem from "./FamilyInfoFormItem"

const info = {
  status: "",
  fullName: "",
  yearOfBirth: "",
  phoneNumber: "",
  provinceAddress: "",
  districtAddress: "",
  wardAddress: "",
  detailAddress: "",
  currentJob: "",
  placeOfWork: "",
  phoneNumberOfCompany: "",
  income: 0,
}

const relativeInfo = {
  ...info,
  status: {
    value: "Có thông tin",
    label: "Có thông tin",
  },
}

const validationSchema = {
  fullName: Yup.string().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.string().nullable().required("Họ tên là bắt buộc"),
    otherwise: Yup.string().nullable(),
  }),
  yearOfBirth: Yup.string().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.string()
      .nullable()
      .required("Năm sinh là bắt buộc"),
    otherwise: Yup.number().nullable(),
  }),
  phoneNumber: Yup.string().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.string()
      .nullable()
      .required("Số điện thoại là bắt buộc")
      .length(10, "Vui lòng nhập chính xác số điện thoại"),
    otherwise: Yup.string().nullable(),
  }),
  provinceAddress: Yup.object().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.object().nullable().required("Tỉnh/Thành phố là bắt buộc"),
    otherwise: Yup.object().nullable(),
  }),
  districtAddress: Yup.object().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.object().nullable().required("Quận/Huyện là bắt buộc"),
    otherwise: Yup.object().nullable(),
  }),
  wardAddress: Yup.object().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.object().nullable().required("Phường/Xã là bắt buộc"),
    otherwise: Yup.object().nullable(),
  }),
  detailAddress: Yup.string().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.string().nullable().required("Địa chỉ là bắt buộc"),
    otherwise: Yup.string().nullable(),
  }),
  currentJob: Yup.string().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.string().nullable().required("Nghề nghiệp hiện tại là bắt buộc"),
    otherwise: Yup.string().nullable(),
  }),
  placeOfWork: Yup.string().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.string().nullable().required("Nơi làm việc là bắt buộc"),
    otherwise: Yup.string().nullable(),
  }),
  phoneNumberOfCompany: Yup.string().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.string()
      .nullable()
      // .required("Số điện thoại nơi làm việc là bắt buộc")
      .length(10, "Vui lòng nhập chính xác số điện thoại"),
    otherwise: Yup.string().nullable(),
  }),
  income: Yup.number().when("status", {
    is: (val) => val?.value === "Có thông tin",
    then: Yup.number()
      .transform((value) => (isNaN(value) ? 0 : value))
      .nullable()
      .min(0, "Thu nhập phải là một số lớn hơn 0")
      .required("Thu nhập là bắt buộc"),
    otherwise: Yup.number().nullable(),
  }),
}
const validationSchemaFamilyInfo = Yup.object().shape({
  father: Yup.object().shape({
    status: Yup.object().required("Trạng thái thông tin là bắt buộc"),
    ...validationSchema,
  }),
  mother: Yup.object().shape({
    status: Yup.object().required("Trạng thái thông tin là bắt buộc"),
    ...validationSchema,
  }),
  relatives: Yup.array().of(
    Yup.object().shape({
      relationship: Yup.object().required(
        "Mối quan hệ với người thân không được để trống"
      ),
      ...validationSchema,
    })
  ),
  familyBackground: Yup.string().required(
    "Hoàn cảnh gia đình không được để trống"
  ),
})

export default function FamilyInfoForm({ handleFormChange }) {
  const [relationships, setRelationships] = useState([])
  const [loadingRelationships, setLoadingRelationships] = useState(true)
  /* Thông tin gia đình */
  const initialValuesFamilyInfo = useMemo(() => {
    return (
      JSON.parse(localStorage.getItem("familyInfo")) || {
        father: info,
        mother: info,
        relatives: [],
        familyBackground: "",
      }
    )
  }, [])

  function handleSaveInput(e) {
    const { name, value } = e.target
    const currentFamilyInfo = JSON.parse(localStorage.getItem("familyInfo"))
    currentFamilyInfo[name] = value
    localStorage.setItem("familyInfo", JSON.stringify(currentFamilyInfo))
  }

  function handleChangeInfo(infoType, name, value, setFieldValue, index) {
    let currentFamilyInfo = JSON.parse(localStorage.getItem("familyInfo"))
    if (name === "fullName") {
      value = value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    }

    if (infoType !== "relatives") {
      currentFamilyInfo = {
        ...currentFamilyInfo,
        [infoType]: { ...currentFamilyInfo?.[infoType], [name]: value },
      }
    } else {
      if (index !== "undefined") {
        currentFamilyInfo.relatives?.splice(index, 1, {
          ...currentFamilyInfo.relatives[index],
          [name]: value,
        })
      }
    }
    setFieldValue(infoType, currentFamilyInfo[infoType])
    localStorage.setItem("familyInfo", JSON.stringify(currentFamilyInfo))
  }

  async function validateForm(values) {
    // try {
    //   await localStorage.setItem(
    //     "familyInfo",
    //     JSON.stringify({ ...values, finished: true })
    //   )
    //   await validationSchemaFamilyInfo.validate(values, { abortEarly: false })
    // } catch (err) {
    //   localStorage.setItem(
    //     "familyInfo",
    //     JSON.stringify({ ...values, finished: false })
    //   )
    // }
  }

  async function handleSubmitFamilyInfo(values, actions) {
    let currentFamilyInfo = JSON.parse(localStorage.getItem("familyInfo"))
    currentFamilyInfo = {
      ...currentFamilyInfo,
      father:
        currentFamilyInfo?.father?.status?.value === "Không rõ"
          ? { ...info, status: currentFamilyInfo.father.status }
          : currentFamilyInfo.father,
      mother:
        currentFamilyInfo?.mother?.status?.value === "Không rõ"
          ? { ...info, status: currentFamilyInfo.mother.status }
          : currentFamilyInfo.mother,
    }
    localStorage.setItem("familyInfo", JSON.stringify(currentFamilyInfo))
    handleFormChange(3)
  }

  useEffect(() => {
    setLoadingRelationships(true)
    axiosClient
      .get("/relationships")
      .then((response) => {
        setRelationships(response.data.data)
      })
      .finally(() => {
        setLoadingRelationships(false)
      })
  }, [])

  useEffect(() => {
    if (!localStorage.getItem("familyInfo")) {
      localStorage.setItem(
        "familyInfo",
        JSON.stringify({
          father: info,
          mother: info,
          relatives: [],
          familyBackground: "",
        })
      )
    }
  }, [])

  return (
    <Motion className='container relative pb-16 pt-10 lg:pb-28 lg:pt-20'>
      <div className='p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl sm:p-10 lg:p-16 dark:bg-neutral-900'>
        <header className=' my-5 text-center mx-auto'>
          <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
            II. HOÀN CẢNH GIA ĐÌNH
          </h2>
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
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <Form
                onChange={() => validateForm(values)}
                onSubmit={handleSubmit}
              >
                <div className='grid gap-6'>
                  {/* Phần nhập thông tin cha mẹ*/}
                  {["father", "mother"].map((item, index) => {
                    return (
                      <FamilyInfoFormItem
                        key={item}
                        title={`${index + 1}. Thông tin ${
                          item === "father" ? "cha" : "mẹ"
                        }`}
                        values={values[item]}
                        infoType={item}
                        errors={errors[item]}
                        touched={touched[item]}
                        handleChangeInfo={handleChangeInfo}
                        setFieldValue={setFieldValue}
                      />
                    )
                  })}
                  {/* Phần nhập thông tin người thân */}
                  <div className='p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'>
                    <header className='text-center mx-auto'>
                      <h2 className='flex items-center text-2xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                        3. Thông tin người thân
                      </h2>
                    </header>
                    <div className='grid gap-6'>
                      {values?.relatives?.map((relative, index) => {
                        return (
                          <div
                            key={index}
                            className='relative p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'
                          >
                            <header className='text-center mx-auto'>
                              <h2 className='flex items-center text-2xl leading-[115%] md:text-3xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
                                Thông tin người thân thứ {" " + (index + 1)}
                              </h2>
                            </header>
                            <div className='grid gap-6'>
                              <FamilyInfoFormItem
                                title={`${index}`}
                                values={values?.["relatives"][index]}
                                infoType={"relatives"}
                                errors={errors["relatives"]?.[index]}
                                touched={touched["relatives"]?.[index]}
                                handleChangeInfo={handleChangeInfo}
                                setFieldValue={setFieldValue}
                                relative={relative}
                                index={index}
                                loadingRelationships={loadingRelationships}
                                relationships={relationships}
                              />
                            </div>
                            <button
                              className='relative w-full h-auto mt-5 inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-red-500 hover:bg-red-800 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-0'
                              onClick={() => {
                                const temp = values.relatives
                                temp.pop()
                                setFieldValue("relatives", temp)
                                localStorage.setItem(
                                  "familyInfo",
                                  JSON.stringify({
                                    ...values,
                                    relatives: temp,
                                  })
                                )
                              }}
                            >
                              Xóa người thân
                            </button>
                          </div>
                        )
                      })}
                    </div>
                    <button
                      className='relative w-full h-auto mt-5 inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-green-500 hover:bg-green-800 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                      type='button'
                      onClick={() => {
                        const temp = [...values.relatives, relativeInfo]
                        setFieldValue("relatives", temp)
                        localStorage.setItem(
                          "familyInfo",
                          JSON.stringify({
                            ...values,
                            relatives: temp,
                          })
                        )
                      }}
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
                    invalid={
                      touched.familyBackground && errors.familyBackground
                    }
                    note='Bạn hãy kể rõ, chi tiết về hoàn cảnh khó khăn của gia đình bạn để ban xét duyệt thấy được bạn là người xứng đáng được lựa chọn.'
                    isRequired
                  />
                  <div className='mt-10 inline-flex items-center justify-center gap-5'>
                    <button
                      className='block rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-10 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                      onClick={() => handleFormChange(1)}
                    >
                      <BsArrowLeft className='inline' /> Quay lại
                    </button>
                    <button
                      className='block rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-10 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                      type='submit'
                    >
                      Tiếp tục <BsArrowRight className='inline' />
                    </button>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Motion>
  )
}