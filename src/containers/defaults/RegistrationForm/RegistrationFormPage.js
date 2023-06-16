import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Motion from "~/components/Motion"
import SeoHelmet from "~/components/SeoHelmet"
import admissionApi from "~/services/admissionApi"
import { authSelector } from "~/store/selectors"
import { path } from "~/utils"
import convertToUrl from "~/utils/commons/convertToUrl"
import FamilyInfoForm from "./FamilyInfoForm"
import FilesUploadForm from "./FilesUploadForm"
import PersonalInfoForm from "./PersonalInfoForm"
import StudentInfoForm from "./StudentInfoForm"

export default function RegistrationFormPage() {
  const userInfo = useSelector(authSelector).userInfo

  const navigate = useNavigate()

  const [currentForm, setCurrentForm] = useState(1)

  useEffect(() => {
    if (
      !JSON.parse(localStorage.getItem("personalInfo")) ||
      !JSON.parse(localStorage.getItem("familyInfo")) ||
      !JSON.parse(localStorage.getItem("studentInfo"))
    )
      admissionApi.getById(userInfo?.id).then((response) => {
        if (response.data.status !== "ERROR") {
          const personalInfo = response.data.data.personalInfo
          const familyInfo = response.data.data.familyInfo
          const studentInfo = response.data.data.studentInfo
          localStorage.setItem("personalInfo", JSON.stringify(personalInfo))
          localStorage.setItem(
            "familyInfo",
            JSON.stringify({
              ...familyInfo,
              father: familyInfo?.relatives[0],
              mother: familyInfo?.relatives[1],
              relatives: [...familyInfo.relatives.slice(2)],
            })
          )
          localStorage.setItem("studentInfo", JSON.stringify(studentInfo))
          setCurrentForm(4)
        }
      })
  }, [userInfo?.id])

  const handleFormChange = (formNumber) => {
    setCurrentForm(formNumber)
  }

  return (
    <Motion>
      <SeoHelmet title='Biểu mẫu đăng ký vào ở KTX Cỏ May năm học 2023 - 2024' />
      {userInfo?.id ? (
        <>
          {/* <div className="absolute h-[400px] top-0 left-0 right-0 w-full bg-primary-500 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40" /> */}
          <header className='mt-20 text-center mx-auto'>
            <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
              <span className='text-3xl md:text-4xl leading-none'>🎉</span>TUYỂN
              SINH VÀO KÝ TÚC XÁ CỎ MAY NĂM HỌC 2023 - 2024
              <span className='text-3xl md:text-4xl leading-none'>🎉</span>
            </h2>
            <div className='flex mt-5 justify-center items-center'>
              <button
                onClick={() =>
                  navigate(
                    `${path.FORM_DETAIL_BASE}/${convertToUrl(
                      userInfo?.fullName
                    )}-${userInfo?.id}`,
                    { state: userInfo?.id }
                  )
                }
                className='rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-10 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
              >
                Xem hồ sơ đã nộp
              </button>
            </div>
          </header>
          {currentForm === 1 && (
            <PersonalInfoForm handleFormChange={handleFormChange} />
          )}
          {currentForm === 2 && (
            <FamilyInfoForm handleFormChange={handleFormChange} />
          )}
          {currentForm === 3 && (
            <StudentInfoForm handleFormChange={handleFormChange} />
          )}
          {currentForm === 4 && (
            <FilesUploadForm handleFormChange={handleFormChange} />
          )}
        </>
      ) : (
        <div className='flex my-5 justify-center items-center'>
          <div className='text-center'>Vui lòng đăng nhập...</div>
        </div>
      )}
    </Motion>
  )
}
