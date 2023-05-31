import PropTypes from "prop-types"
import React, { useState } from "react"
import { InputField } from "~/components/Customs"
import districts from "~/utils/mockData/districts"
import provinces from "~/utils/mockData/provinces"
import wards from "~/utils/mockData/wards"

const options = [
  { value: "Có thông tin", label: "Có thông tin" },
  { value: "Không rõ", label: "Không rõ" },
  { value: "Đã qua đời", label: "Đã qua đời" },
]
const provincesData = Object.values(provinces)

function FamilyInfoFormItem(props) {
  const [wardsData, setWardsData] = useState([])
  const [districtsData, setDistrictsData] = useState([])
  const [loadingDistrictsData, setLoadingDistrictsData] = useState(true)
  const [loadingWardsData, setLoadingWardsData] = useState(true)
  const {
    title,
    infoType,
    values,
    errors,
    touched,
    handleChangeInfo,
    setFieldValue,
    index,
    relative,
    relationships,
    loadingRelationships,
  } = props
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

  return (
    <div className='p-5 w-full mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'>
      {infoType !== "relatives" && (
        <header className=' my-5 text-center mx-auto'>
          <h2 className='flex items-center text-2xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
            {title || "No Title"}
          </h2>
        </header>
      )}
      <div className='grid gap-6'>
        {console.log(errors)}
        {infoType === "relatives" ? (
          <InputField
            type='select'
            name={`relationship`}
            placeholder={`Chọn mối quan hệ với người thân...`}
            label={`Mối quan hệ`}
            value={relative.relationship}
            feedback={errors?.relationship}
            onChange={(selectedOption) => {
              handleChangeInfo(
                infoType,
                "relationship",
                selectedOption,
                setFieldValue,
                index
              )
            }}
            invalid={touched?.relationship && errors?.relationship}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.label}
            isLoading={loadingRelationships}
            options={relationships}
            isRequired
          />
        ) : (
          <InputField
            type='select'
            label='Trạng thái thông tin'
            placeholder='Chọn trạng thái thông tin ...'
            value={values?.status}
            onChange={(selectedOption) => {
              handleChangeInfo(
                infoType,
                "status",
                selectedOption,
                setFieldValue,
                index
              )
            }}
            feedback={errors?.status}
            invalid={touched?.status && errors?.status}
            options={options}
            isRequired
          />
        )}
        {values?.status?.value !== "Không rõ" ? (
          <React.Fragment>
            <InputField
              type='text'
              name={`${infoType}.currentJob`}
              placeholder='Nhập họ tên ...'
              label='Họ tên'
              value={values?.fullName}
              feedback={errors?.fullName}
              onChange={(e) => {
                handleChangeInfo(
                  infoType,
                  "fullName",
                  e.target.value,
                  setFieldValue,
                  index
                )
              }}
              invalid={touched?.fullName && errors?.fullName}
              isRequired={values?.status?.value === "Có thông tin"}
            />
            <InputField
              type='number'
              name={`${infoType}.yearOfBirth`}
              placeholder='Nhập năm sinh ...'
              label='Năm sinh'
              value={values?.yearOfBirth}
              feedback={errors?.yearOfBirth}
              onChange={(e) => {
                handleChangeInfo(
                  infoType,
                  "yearOfBirth",
                  e.target.value,
                  setFieldValue,
                  index
                )
              }}
              invalid={touched?.yearOfBirth && errors?.yearOfBirth}
              isRequired={values?.status?.value === "Có thông tin"}
            />
            <InputField
              type='text'
              name={`${infoType}.phoneNumber`}
              placeholder='Nhập số điện thoại ...'
              label='Số điện thoại'
              value={values?.phoneNumber}
              feedback={errors?.phoneNumber}
              onChange={(e) => {
                handleChangeInfo(
                  infoType,
                  "phoneNumber",
                  e.target.value,
                  setFieldValue,
                  index
                )
              }}
              invalid={touched?.phoneNumber && errors?.phoneNumber}
              isRequired={values?.status?.value === "Có thông tin"}
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
                  placeholder='Chọn tỉnh/thành phố'
                  value={values?.provinceAddress}
                  onChange={(selectedOption) => {
                    handleChangeInfo(
                      infoType,
                      "provinceAddress",
                      selectedOption,
                      setFieldValue,
                      index
                    )
                    handleChangeInfo(
                      infoType,
                      "districtAddress",
                      "",
                      setFieldValue,
                      index
                    )
                    handleChangeInfo(
                      infoType,
                      "wardAddress",
                      "",
                      setFieldValue,
                      index
                    )
                    setDistrictsData([])
                    setWardsData([])
                    handleProvinceChange(selectedOption)
                  }}
                  clearValue={() => {
                    handleChangeInfo(
                      infoType,
                      "provinceAddress",
                      "",
                      setFieldValue,
                      index
                    )
                    handleChangeInfo(
                      infoType,
                      "districtAddress",
                      "",
                      setFieldValue,
                      index
                    )
                    handleChangeInfo(
                      infoType,
                      "wardAddress",
                      "",
                      setFieldValue,
                      index
                    )
                  }}
                  getOptionValue={(option) => option.code}
                  getOptionLabel={(option) => option.name_with_type}
                  feedback={errors?.provinceAddress}
                  invalid={touched?.provinceAddress && errors?.provinceAddress}
                  options={provincesData}
                  isRequired={values?.status?.value === "Có thông tin"}
                />
                <InputField
                  type='select'
                  label='Quận/Huyện'
                  placeholder='Chọn quận/huyện'
                  value={values?.districtAddress}
                  onChange={(selectedOption) => {
                    handleChangeInfo(
                      infoType,
                      "districtAddress",
                      selectedOption,
                      setFieldValue,
                      index
                    )
                    handleChangeInfo(
                      infoType,
                      "wardAddress",
                      "",
                      setFieldValue,
                      index
                    )
                    handleDistrictChange(selectedOption)
                  }}
                  clearValue={() => {
                    handleChangeInfo(
                      infoType,
                      "districtAddress",
                      "",
                      setFieldValue,
                      index
                    )
                    handleChangeInfo(
                      infoType,
                      "wardAddress",
                      "",
                      setFieldValue,
                      index
                    )
                  }}
                  isLoading={loadingDistrictsData}
                  getOptionValue={(option) => option.code}
                  getOptionLabel={(option) => option.name_with_type}
                  loadingMessage={() => "Vui lòng chọn tỉnh/thành phố"}
                  feedback={errors?.districtAddress}
                  invalid={touched?.districtAddress && errors?.districtAddress}
                  options={districtsData}
                  isRequired={values?.status?.value === "Có thông tin"}
                />
                <InputField
                  type='select'
                  label='Xã/Phường'
                  placeholder='Chọn xã/phường'
                  value={values?.wardAddress}
                  onChange={(selectedOption) => {
                    handleChangeInfo(
                      infoType,
                      "wardAddress",
                      selectedOption,
                      setFieldValue,
                      index
                    )
                  }}
                  clearValue={() => {
                    handleChangeInfo(
                      infoType,
                      "wardAddress",
                      "",
                      setFieldValue,
                      index
                    )
                  }}
                  loadingMessage={() => "Vui lòng chọn quận/huyện"}
                  isLoading={loadingWardsData}
                  getOptionValue={(option) => option.code}
                  getOptionLabel={(option) => option.name_with_type}
                  feedback={errors?.wardAddress}
                  invalid={touched?.wardAddress && errors?.wardAddress}
                  options={wardsData}
                  isRequired={values?.status?.value === "Có thông tin"}
                />
                <InputField
                  type='text'
                  name={`${infoType}.currentJob`}
                  placeholder='Nhập số nhà, tên đường, khu phố'
                  label='Số nhà, tên đường, khu phố'
                  value={values?.detailAddress}
                  feedback={errors?.detailAddress}
                  onChange={(e) => {
                    handleChangeInfo(
                      infoType,
                      "detailAddress",
                      e.target.value,
                      setFieldValue,
                      index
                    )
                  }}
                  invalid={touched?.detailAddress && errors?.detailAddress}
                  isRequired={values?.status?.value === "Có thông tin"}
                />
              </div>
            </div>
            <div className='grid lg:grid-cols-2 gap-6'>
              <InputField
                type='text'
                name={`${infoType}.currentJob`}
                placeholder='Nhập nghề nghiệp hiện tại ...'
                label='Nghề nghiệp hiện tại'
                value={values?.currentJob}
                feedback={errors?.currentJob}
                onChange={(e) => {
                  handleChangeInfo(
                    infoType,
                    "currentJob",
                    e.target.value,
                    setFieldValue,
                    index
                  )
                }}
                invalid={touched?.currentJob && errors?.currentJob}
                isRequired={values?.status?.value === "Có thông tin"}
              />
              <InputField
                type='text'
                name={`${infoType}.phoneNumberOfCompany`}
                placeholder='Nhập nơi làm việc ...'
                label='Nơi làm việc'
                value={values?.placeOfWork}
                feedback={errors?.placeOfWork}
                onChange={(e) => {
                  handleChangeInfo(
                    infoType,
                    "placeOfWork",
                    e.target.value,
                    setFieldValue,
                    index
                  )
                }}
                invalid={touched?.placeOfWork && errors?.placeOfWork}
                isRequired={values?.status?.value === "Có thông tin"}
              />
              <InputField
                type='text'
                name={`${infoType}.phoneNumberOfCompany`}
                placeholder='Nhập SĐT nơi làm việc ...'
                label='SĐT nơi làm việc'
                value={values?.phoneNumberOfCompany}
                feedback={errors?.phoneNumberOfCompany}
                onChange={(e) => {
                  handleChangeInfo(
                    infoType,
                    "phoneNumberOfCompany",
                    e.target.value,
                    setFieldValue,
                    index
                  )
                }}
                invalid={
                  touched?.phoneNumberOfCompany && errors?.phoneNumberOfCompany
                }
                isRequired={values?.status?.value === "Có thông tin"}
              />
              <InputField
                type='number'
                name={`${infoType}.income`}
                placeholder='Nhập thu nhập ...'
                label='Thu nhập'
                value={values?.income}
                feedback={errors?.income}
                note='Nhập chính xác số tiền (đơn vị: VNĐ).'
                onChange={(e) => {
                  handleChangeInfo(
                    infoType,
                    "income",
                    e.target.value,
                    setFieldValue,
                    index
                  )
                }}
                invalid={touched?.income && errors?.income}
                isRequired={values?.status?.value === "Có thông tin"}
              />
            </div>
          </React.Fragment>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default FamilyInfoFormItem

FamilyInfoFormItem.propTypes = {
  title: PropTypes.string.isRequired,
  infoType: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.any,
  touched: PropTypes.any,
  handleChangeInfo: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  index: PropTypes.number,
  relative: PropTypes.object,
  loadingRelationships: PropTypes.bool,
  relationships: PropTypes.array,
}
