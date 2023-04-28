import { useState } from "react"
import { useSelector } from "react-redux"
import Motion from "~/components/Motion"
import SeoHelmet from "~/components/SeoHelmet"
import { authSelector } from "~/store/selectors"
import FamilyInfoForm from "./FamilyInfoForm"
import FilesUploadForm from "./FilesUploadForm"
import PersonalInfoForm from "./PersonalInfoForm"
import StudentInfoForm from "./StudentInfoForm"

export default function RegistrationForm() {
  const userInfo = useSelector(authSelector).userInfo

  const [currentForm, setCurrentForm] = useState(1)

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
        <div className='flex mt-5 justify-center items-center'>
          <div className='text-center'>Vui lòng đăng nhập...</div>
        </div>
      )}
    </Motion>
  )
}
