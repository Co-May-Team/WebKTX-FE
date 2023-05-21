import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import Loading from "~/components/Loading"
import Motion from "~/components/Motion"
import SeoHelmet from "~/components/SeoHelmet"
import admissionApi from "~/services/admissionApi"
import formatCurrency from "~/utils/commons/formatCurrency"

export default function FormDetail() {
  const id = useLocation().state
  const { name } = useParams()

  const [loadingFormInfo, setLoadingFormInfo] = useState(true)
  const [nullForm, setNullForm] = useState(false)
  const [formInfo, setFormInfo] = useState(null)

  useEffect(() => {
    setLoadingFormInfo(true)
    admissionApi
      .getById(id)
      .then((response) => {
        console.log({detail: response.data.data})
        setFormInfo(response.data.data)
      })
      .catch((error) => setNullForm(true))
      .finally(() => {
        setLoadingFormInfo(false)
      })
  }, [id])

  return (
    <Motion>
      {loadingFormInfo ? (
        <Loading />
      ) : (
        <div className='container relative pt-6 sm:pt-10 pb-16 lg:pt-20 lg:pb-28'>
          <SeoHelmet
            title={
              formInfo?.personalInfo.fullName
                ? `Chi tiết đơn ứng tuyển của ${formInfo?.personalInfo.fullName}`
                : "Trống"
            }
          />
          <div className='relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 text-neutral-900 dark:text-neutral-50'>
            <div className='text-center w-full mx-auto '>
              <h2 className='text-3xl md:text-4xl font-semibold'>
                {formInfo?.personalInfo.fullName
                  ? `Đơn ứng tuyển của ${formInfo?.personalInfo.fullName}`
                  : "Trống"}
              </h2>
            </div>
          </div>
          {nullForm ? (
            <div className='flex mt-5 justify-center items-center mb-4'>
              <h4 className='text-center'>Trống</h4>
            </div>
          ) : (
            <>
              <div className='bg-white dark:bg-neutral-900 shadow-2xl dark:shadow-primary-100 overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-xl uppercase leading-6 font-bold text-neutral-900 dark:text-neutral-200'>
                    Thông tin cá nhân
                  </h3>
                </div>
                <div className='border-t border-neutral-200 dark:border-neutral-900'>
                  <dl>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Họ và tên
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.fullName || "Chưa có thông tin"}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Ngày sinh
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.dateOfBirth ||
                          "Chưa có thông tin"}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Giới tính
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.gender?.label ||
                          "Chưa có thông tin"}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Số điện thoại
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.phoneNumber ||
                          "Chưa có thông tin"}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Email
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.email || "Chưa có thông tin"}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Dân tộc
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.ethnic?.name ||
                          "Chưa có thông tin"}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Tôn giáo
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.religion?.name ||
                          "Chưa có thông tin"}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Quê quán
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.hometown?.name_with_type ||
                          "Chưa có thông tin"}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Địa chỉ thường trú
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.detailAddress},{" "}
                        {formInfo?.personalInfo.wardAddress?.name_with_type},{" "}
                        {formInfo?.personalInfo.districtAddress?.name_with_type}
                        ,{" "}
                        {formInfo?.personalInfo.provinceAddress?.name_with_type}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Số CMND
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.idNumber || "Chưa có thông tin"}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Ngày cấp CMND
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.idIssueDate ||
                          "Chưa có thông tin"}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Nơi cấp CMND
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.personalInfo.idIssuePlace ||
                          "Chưa có thông tin"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className='mt-10 bg-white dark:bg-neutral-900 shadow-2xl dark:shadow-primary-100 overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-xl uppercase leading-6 font-bold text-neutral-900 dark:text-neutral-200'>
                    Thông tin gia đình
                  </h3>
                </div>
                {formInfo?.familyInfo.relatives.map((relative, index) => (
                  <div
                    key={index}
                    className='mt-2 shadow-lg border-neutral-200 dark:border-neutral-900'
                  >
                    <dl>
                      {relative.status.label === "Không rõ" ? (
                        <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-bold text-neutral-500 dark:text-neutral-300'>
                            {index + 1 + ". " + relative.relationship.label}
                          </dt>
                          <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                            {relative.fullName || "Không có thông tin"}
                          </dd>
                        </div>
                      ) : (
                        <>
                          <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-bold text-neutral-500 dark:text-neutral-300'>
                              {index + 1 + ". " + relative.relationship.label}
                            </dt>
                            <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                              {relative.fullName || "Không rõ"}
                            </dd>
                          </div>
                          <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                              Năm sinh
                            </dt>
                            <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                              {relative.yearOfBirth || "Chưa có thông tin"}
                            </dd>
                          </div>
                          <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                              Số điện thoại
                            </dt>
                            <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                              {relative.phoneNumber || "Chưa có thông tin"}
                            </dd>
                          </div>
                          <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                              Địa chỉ thường trú
                            </dt>
                            <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                              {relative.detailAddress},{" "}
                              {relative.wardAddress?.name_with_type},{" "}
                              {relative.districtAddress?.name_with_type},{" "}
                              {relative.provinceAddress?.name_with_type}
                            </dd>
                          </div>
                          <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                              Công việc hiện tại
                            </dt>
                            <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                              {relative.currentJob || "Chưa có thông tin"}
                            </dd>
                          </div>
                          <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                              Nơi làm việc
                            </dt>
                            <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                              {relative.placeOfWork || "Chưa có thông tin"}
                            </dd>
                          </div>
                          <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                              SĐT nơi làm việc
                            </dt>
                            <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                              {relative.phoneNumberOfCompany ||
                                "Chưa có thông tin"}
                            </dd>
                          </div>
                          <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                              Thu nhập
                            </dt>
                            <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                              {formatCurrency(
                                Number.parseFloat(relative.income)
                              )}
                            </dd>
                          </div>
                          <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                              Tình trạng sức khỏe
                            </dt>
                            <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                              {relative.healthStatus}
                            </dd>
                          </div>
                        </>
                      )}
                    </dl>
                  </div>
                ))}
                <div className='mt-2 shadow-lg border-neutral-200 dark:border-neutral-900'>
                  <dl>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Hoàn cảnh gia đình
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.familyInfo.familyBackground}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className='mt-10 bg-white dark:bg-neutral-900 shadow-2xl dark:shadow-primary-100 overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-xl uppercase leading-6 font-bold text-neutral-900 dark:text-neutral-200'>
                    Thông tin sinh viên
                  </h3>
                </div>
                <div className='border-t border-neutral-200 dark:border-neutral-900'>
                  <dl>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Đối tượng
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.studentType
                          .map((type) => type.label)
                          .join(", ")}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Tên trường đại học
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.universityName.label}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Chuyên ngành
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.major}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Mã lớp học
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.classCode}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Mã số sinh viên
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.studentCode}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Điểm trung bình lớp 10
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.averageGrade10}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Điểm trung bình lớp 11
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.averageGrade11}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Điểm trung bình lớp 12
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.averageGrade12}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Điểm thi tốt nghiệp THPT
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.highSchoolGraduationExamScore}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Điểm thi đánh giá năng lực (DGNL)
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.dgnlScore}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Hình thức tuyển thẳng
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.admissionViaDirectMethod}
                      </dd>
                    </div>
                    <div className='bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Thành tích học tập
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.achievements}
                      </dd>
                    </div>
                    <div className='bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-neutral-500 dark:text-neutral-300'>
                        Định hướng và ước mơ trong tương lai
                      </dt>
                      <dd className='mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2'>
                        {formInfo?.studentInfo.dream}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className='mt-10 bg-white dark:bg-neutral-900 shadow-2xl dark:shadow-primary-100 overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-xl uppercase leading-6 font-bold text-neutral-900 dark:text-neutral-200'>
                    Tập tin đính kèm
                  </h3>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Motion>
  )
}
