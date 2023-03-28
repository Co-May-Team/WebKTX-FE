import { Formik } from 'formik'
import { useEffect } from 'react'
import { Form } from 'reactstrap'
import * as Yup from 'yup'
import { InputField } from '~/components/Customs'

export default function FamilyInfoForm() {
  const handleSaveInput = (e) => {
    const { name, value } = e.target
    const currentFamilyInfo = JSON.parse(localStorage.getItem('familyInfo'))
    currentFamilyInfo[name] = value
    localStorage.setItem('familyInfo', JSON.stringify(currentFamilyInfo))
  }
  const handleSaveChildrenInput = (e) => {
    const { name, value } = e.target
    const currentFamilyInfo = JSON.parse(localStorage.getItem('familyInfo'))
    const [parent, fieldName] = name.split('.') // split name thành một mảng gồm 2 phần tử
    currentFamilyInfo[parent][fieldName] = value // truy cập thuộc tính lồng nhau
    localStorage.setItem('familyInfo', JSON.stringify(currentFamilyInfo))
  }
  const handleSaveArrayInput = (e, index) => {
    const { name, value } = e.target
    const currentFamilyInfo = JSON.parse(localStorage.getItem('familyInfo'))
    const [parent, fieldIndex, fieldName] = name.split('.') // split name thành một mảng gồm 3 phần tử
    currentFamilyInfo[parent][fieldIndex][fieldName] = value // truy cập thuộc tính lồng nhau
    localStorage.setItem('familyInfo', JSON.stringify(currentFamilyInfo))
  }
  useEffect(() => {
    if (!localStorage.getItem('familyInfo')) {
      localStorage.setItem(
        'familyInfo',
        JSON.stringify({
          father: {
            fullName: '',
            dateOfBirth: '',
            phoneNumber: '',
            currentAddress: '',
            currentJob: '',
            income: '',
            healthStatus: '',
          },
          mother: {
            fullName: '',
            dateOfBirth: '',
            phoneNumber: '',
            currentAddress: '',
            currentJob: '',
            income: '',
            healthStatus: '',
          },
          siblings: [
            {
              fullName: '',
              dateOfBirth: '',
              phoneNumber: '',
              currentAddress: '',
              currentJob: '',
              income: '',
              healthStatus: '',
            },
          ],
          familyBackground: '',
        })
      )
    }
  }, [])

  /* Thông tin gia đình */
  const initialValuesFamilyInfo = JSON.parse(
    localStorage.getItem('familyInfo')
  ) || {
    father: {
      fullName: '',
      dateOfBirth: '',
      phoneNumber: '',
      currentAddress: '',
      currentJob: '',
      income: '',
      healthStatus: '',
    },
    mother: {
      fullName: '',
      dateOfBirth: '',
      phoneNumber: '',
      currentAddress: '',
      currentJob: '',
      income: '',
      healthStatus: '',
    },
    siblings: [
      {
        fullName: '',
        dateOfBirth: '',
        phoneNumber: '',
        currentAddress: '',
        currentJob: '',
        income: '',
        healthStatus: '',
      },
    ],
    familyBackground: '',
  }

  const validationSchemaFamilyInfo = Yup.object().shape({
    father: Yup.object().shape({
      fullName: Yup.string().required('Họ tên cha không được để trống'),
      dateOfBirth: Yup.string().required('Ngày sinh không được để trống'),
      phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
      currentAddress: Yup.string().required(
        'Địa chỉ hiện tại của cha không được để trống'
      ),
      currentJob: Yup.string().required(
        'Công việc hiện tại của cha không được để trống'
      ),
      income: Yup.string().required('Thu nhập của cha không được để trống'),
      healthStatus: Yup.string().required(
        'Tình trạng sức khỏe của cha không được để trống'
      ),
    }),
    mother: Yup.object().shape({
      fullName: Yup.string().required('Họ tên mẹ không được để trống'),
      dateOfBirth: Yup.string().required('Ngày sinh không được để trống'),
      phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
      currentAddress: Yup.string().required(
        'Địa chỉ hiện tại của mẹ không được để trống'
      ),
      currentJob: Yup.string().required(
        'Công việc hiện tại của mẹ không được để trống'
      ),
      income: Yup.string().required('Thu nhập của mẹ không được để trống'),
      healthStatus: Yup.string().required(
        'Tình trạng sức khỏe của mẹ không được để trống'
      ),
    }),
    siblings: Yup.array().of(
      Yup.object().shape({
        fullName: Yup.string().required(
          'Họ tên anh/chị/em không được để trống'
        ),
        dateOfBirth: Yup.string().required('Ngày sinh không được để trống'),
        phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
        currentAddress: Yup.string().required(
          'Địa chỉ hiện tại của anh/chị/em không được để trống'
        ),
        currentJob: Yup.string().required(
          'Công việc hiện tại của anh/chị/em không được để trống'
        ),
        income: Yup.string().required(
          'Thu nhập của anh/chị/em không được để trống'
        ),
        healthStatus: Yup.string().required(
          'Tình trạng sức khỏe của anh/chị/em không được để trống'
        ),
      })
    ),
    familyBackground: Yup.string().required(
      'Hoàn cảnh gia đình không được để trống'
    ),
  })

  const handleSubmitFamilyInfo = async (values, actions) => {
    actions.setSubmitting(true)
    console.log(values)
    actions.setSubmitting(false)
  }
  /* */
  return (
    <div id="family-info" className="container relative pb-16 lg:pb-28">
      <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl sm:p-10 lg:p-16 dark:bg-neutral-900">
        <header className=" my-5 text-center mx-auto">
          <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            II. THÔNG TIN GIA ĐÌNH
          </h2>
          <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
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
              <div className="mb-5">
                <InputField
                  type="textarea"
                  name="familyBackground"
                  rows={10}
                  placeholder="Nhập hoàn cảnh gia đình..."
                  label="Hoàn cảnh gia đình"
                  value={values.familyBackground}
                  feedback={errors.familyBackground}
                  onChange={(e) => {
                    handleChange(e)
                    handleSaveInput(e)
                  }}
                  onBlur={handleBlur}
                  invalid={touched.familyBackground && errors.familyBackground}
                  isRequired
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
                  <header className=" my-5 text-center mx-auto">
                    <h2 className="flex items-center text-2xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                      1. Thông tin cha
                    </h2>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        checked={Object.values(values.father).every(
                          (value) => value === 'Không có'
                        )}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={() => {
                          if (
                            Object.values(values.father).every(
                              (value) => value === 'Không có'
                            )
                          ) {
                            setFieldValue(
                              'father',
                              Object.fromEntries(
                                Object.keys(values.father).map((key) => [
                                  key,
                                  '',
                                ])
                              )
                            )
                          } else {
                            setFieldValue(
                              'father',
                              Object.fromEntries(
                                Object.keys(values.father).map((key) => [
                                  key,
                                  'Không có',
                                ])
                              )
                            )
                          }
                        }}
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Không có
                      </label>
                    </div>
                  </header>
                  <div className="grid gap-6">
                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="father.fullName"
                        placeholder="Nhập họ tên cha..."
                        label="Họ tên cha"
                        value={values.father?.fullName}
                        feedback={errors.father?.fullName}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.father?.fullName && errors.father?.fullName
                        }
                        isRequired
                      />
                    </div>
                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="father.dateOfBirth"
                        placeholder="Nhập ngày sinh của cha..."
                        label="Ngày sinh của cha"
                        value={values.father?.dateOfBirth}
                        feedback={errors.father?.dateOfBirth}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.father?.dateOfBirth &&
                          errors.father?.dateOfBirth
                        }
                        isRequired
                      />
                    </div>
                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="father.phoneNumber"
                        placeholder="Nhập số điện thoại của cha..."
                        label="Số điện thoại của cha"
                        value={values.father?.phoneNumber}
                        feedback={errors.father?.phoneNumber}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.father?.phoneNumber &&
                          errors.father?.phoneNumber
                        }
                        isRequired
                      />
                    </div>
                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="father.currentAddress"
                        placeholder="Nhập địa chỉ hiện tại của cha..."
                        label="Địa chỉ hiện tại của cha"
                        value={values.father?.currentAddress}
                        feedback={errors.father?.currentAddress}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.father?.currentAddress &&
                          errors.father?.currentAddress
                        }
                        isRequired
                      />
                    </div>
                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="father.currentJob"
                        placeholder="Nhập nghề nghiệp hiện tại của cha..."
                        label="Nghề nghiệp hiện tại của cha"
                        value={values.father?.currentJob}
                        feedback={errors.father?.currentJob}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.father?.currentJob &&
                          errors.father?.currentJob
                        }
                        isRequired
                      />
                    </div>

                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="father.income"
                        placeholder="Nhập thu nhập của cha..."
                        label="Thu nhập của cha"
                        value={values.father?.income}
                        feedback={errors.father?.income}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.father?.income && errors.father?.income
                        }
                        isRequired
                      />
                    </div>

                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="father.healthStatus"
                        placeholder="Nhập tình trạng sức khỏe của cha..."
                        label="Tình trạng sức khỏe của cha"
                        value={values.father?.healthStatus}
                        feedback={errors.father?.healthStatus}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.father?.healthStatus &&
                          errors.father?.healthStatus
                        }
                        isRequired
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
                  <header className=" my-5 text-center mx-auto">
                    <h2 className="flex items-center text-2xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                      2. Thông tin mẹ
                    </h2>
                  </header>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={Object.values(values.mother).every(
                        (value) => value === 'Không có'
                      )}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={() => {
                        if (
                          Object.values(values.mother).every(
                            (value) => value === 'Không có'
                          )
                        ) {
                          setFieldValue(
                            'mother',
                            Object.fromEntries(
                              Object.keys(values.mother).map((key) => [key, ''])
                            )
                          )
                        } else {
                          setFieldValue(
                            'mother',
                            Object.fromEntries(
                              Object.keys(values.mother).map((key) => [
                                key,
                                'Không có',
                              ])
                            )
                          )
                        }
                      }}
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Không có
                    </label>
                  </div>
                  <div className="grid gap-6">
                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="mother.fullName"
                        placeholder="Nhập họ tên mẹ..."
                        label="Họ tên mẹ"
                        value={values.mother?.fullName}
                        feedback={errors.mother?.fullName}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.mother?.fullName && errors.mother?.fullName
                        }
                        isRequired
                      />
                    </div>

                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="mother.dateOfBirth"
                        placeholder="Nhập ngày sinh của mẹ..."
                        label="Ngày sinh của mẹ"
                        value={values.mother?.dateOfBirth}
                        feedback={errors.mother?.dateOfBirth}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.mother?.dateOfBirth &&
                          errors.mother?.dateOfBirth
                        }
                        isRequired
                      />
                    </div>

                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="mother.phoneNumber"
                        placeholder="Nhập số điện thoại của mẹ..."
                        label="Số điện thoại của mẹ"
                        value={values.mother?.phoneNumber}
                        feedback={errors.mother?.phoneNumber}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.mother?.phoneNumber &&
                          errors.mother?.phoneNumber
                        }
                        isRequired
                      />
                    </div>

                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="mother.currentAddress"
                        placeholder="Nhập địa chỉ hiện tại của mẹ..."
                        label="Địa chỉ hiện tại của mẹ"
                        value={values.mother?.currentAddress}
                        feedback={errors.mother?.currentAddress}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.mother?.currentAddress &&
                          errors.mother?.currentAddress
                        }
                        isRequired
                      />
                    </div>

                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="mother.currentJob"
                        placeholder="Nhập công việc hiện tại của mẹ..."
                        label="Công việc hiện tại của mẹ"
                        value={values.mother?.currentJob}
                        feedback={errors.mother?.currentJob}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.mother?.currentJob &&
                          errors.mother?.currentJob
                        }
                        isRequired
                      />
                    </div>

                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="mother.income"
                        placeholder="Nhập thu nhập của mẹ..."
                        label="Thu nhập của mẹ"
                        value={values.mother?.income}
                        feedback={errors.mother?.income}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.mother?.income && errors.mother?.income
                        }
                        isRequired
                      />
                    </div>

                    <div className="mb-5">
                      <InputField
                        type="text"
                        name="mother.healthStatus"
                        placeholder="Nhập tình trạng sức khỏe của mẹ..."
                        label="Tình trạng sức khỏe của mẹ"
                        value={values.mother?.healthStatus}
                        feedback={errors.mother?.healthStatus}
                        onChange={(e) => {
                          handleChange(e)
                          handleSaveChildrenInput(e)
                        }}
                        onBlur={handleBlur}
                        invalid={
                          touched.mother?.healthStatus &&
                          errors.mother?.healthStatus
                        }
                        isRequired
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="container relative pt-10 lg:pt-20">
                <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
                  <header className=" my-5 text-center mx-auto">
                    <h2 className="flex items-center text-2xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                      3. Thông tin anh/chị/em
                    </h2>
                    <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                      Các bạn vui lòng điền đúng thông tin để tránh sai sót nhé!
                    </span>
                  </header>
                  {values.siblings?.map((_, index) => (
                    <div key={index} className="grid gap-6">
                      <div className="mb-5">
                        <InputField
                          type="text"
                          name={`siblings[${index}].fullName`}
                          placeholder={`Nhập họ tên của anh/chị/em thứ ${
                            index + 1
                          }...`}
                          label={`Họ tên anh/chị/em thứ ${index + 1}`}
                          value={values.siblings?.[index]?.fullName}
                          feedback={errors.siblings?.[index]?.fullName}
                          onChange={(e) => {
                            handleChange(e)
                            handleSaveInput(e, index)
                          }}
                          onBlur={handleBlur}
                          invalid={
                            touched.siblings?.[index]?.fullName &&
                            errors.siblings?.[index]?.fullName
                          }
                          isRequired
                        />
                      </div>

                      <div className="mb-5">
                        <InputField
                          type="text"
                          name={`siblings[${index}].dateOfBirth`}
                          placeholder={`Nhập ngày sinh của anh/chị/em thứ ${
                            index + 1
                          }...`}
                          label={`Ngày sinh của anh/chị/em thứ ${index + 1}`}
                          value={values.siblings?.[index]?.dateOfBirth}
                          feedback={errors.siblings?.[index]?.dateOfBirth}
                          onChange={(e) => {
                            handleChange(e)
                            handleSaveInput(e, index)
                          }}
                          onBlur={handleBlur}
                          invalid={
                            touched.siblings?.[index]?.dateOfBirth &&
                            errors.siblings?.[index]?.dateOfBirth
                          }
                          isRequired
                        />
                      </div>

                      <div className="mb-5">
                        <InputField
                          type="text"
                          name={`siblings[${index}].phoneNumber`}
                          placeholder={`Nhập số điện thoại của anh/chị/em thứ ${
                            index + 1
                          }...`}
                          label={`Số điện thoại của anh/chị/em thứ ${
                            index + 1
                          }`}
                          value={values.siblings?.[index]?.phoneNumber}
                          feedback={errors.siblings?.[index]?.phoneNumber}
                          onChange={(e) => {
                            handleChange(e)
                            handleSaveInput(e, index)
                          }}
                          onBlur={handleBlur}
                          invalid={
                            touched.siblings?.[index]?.phoneNumber &&
                            errors.siblings?.[index]?.phoneNumber
                          }
                          isRequired
                        />
                      </div>

                      <div className="mb-5">
                        <InputField
                          type="text"
                          name={`siblings[${index}].currentAddress`}
                          placeholder={`Nhập địa chỉ hiện tại của anh/chị/em thứ ${
                            index + 1
                          }...`}
                          label={`Địa chỉ hiện tại của anh/chị/em thứ ${
                            index + 1
                          }`}
                          value={values.siblings?.[index]?.currentAddress}
                          feedback={errors.siblings?.[index]?.currentAddress}
                          onChange={(e) => {
                            handleChange(e)
                            handleSaveInput(e, index)
                          }}
                          onBlur={handleBlur}
                          invalid={
                            touched.siblings?.[index]?.currentAddress &&
                            errors.siblings?.[index]?.currentAddress
                          }
                          isRequired
                        />
                      </div>

                      <div className="mb-5">
                        <InputField
                          type="text"
                          name={`siblings[${index}].currentJob`}
                          placeholder={`Nhập công việc hiện tại của anh/chị/em thứ ${
                            index + 1
                          }...`}
                          label={`Công việc hiện tại của anh/chị/em thứ ${
                            index + 1
                          }`}
                          value={values.siblings?.[index]?.currentJob}
                          feedback={errors.siblings?.[index]?.currentJob}
                          onChange={(e) => {
                            handleChange(e)
                            handleSaveInput(e, index)
                          }}
                          onBlur={handleBlur}
                          invalid={
                            touched.siblings?.[index]?.currentJob &&
                            errors.siblings?.[index]?.currentJob
                          }
                          isRequired
                        />
                      </div>

                      <div className="mb-5">
                        <InputField
                          type="text"
                          name={`siblings[${index}].income`}
                          placeholder={`Nhập thu nhập của anh/chị/em thứ ${
                            index + 1
                          }...`}
                          label={`Thu nhập của anh/chị/em thứ ${index + 1}`}
                          value={values.siblings?.[index]?.income}
                          feedback={errors.siblings?.[index]?.income}
                          onChange={(e) => {
                            handleChange(e)
                            handleSaveInput(e, index)
                          }}
                          onBlur={handleBlur}
                          invalid={
                            touched.siblings?.[index]?.income &&
                            errors.siblings?.[index]?.income
                          }
                          isRequired
                        />
                      </div>

                      <div className="mb-5">
                        <InputField
                          type="text"
                          name={`siblings[${index}].healthStatus`}
                          placeholder={`Nhập tình trạng sức khỏe của anh/chị/em thứ ${
                            index + 1
                          }...`}
                          label={`Tình trạng sức khỏe của anh/chị/em thứ ${
                            index + 1
                          }`}
                          value={values.siblings?.[index]?.healthStatus}
                          feedback={errors.siblings?.[index]?.healthStatus}
                          onChange={(e) => {
                            handleChange(e)
                            handleSaveInput(e, index)
                          }}
                          onBlur={handleBlur}
                          invalid={
                            touched.siblings?.[index]?.healthStatus &&
                            errors.siblings?.[index]?.healthStatus
                          }
                          isRequired
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
