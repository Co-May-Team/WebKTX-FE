import { useSelector } from "react-redux"
import SeoHelmet from "~/components/SeoHelmet"
import { authSelector } from "~/store/selectors"
import FamilyInfoForm from "./FamilyInfoForm"
import FilesUploadForm from "./FilesUploadForm"
import PersonalInfoForm from "./PersonalInfoForm"
import StudentInfoForm from "./StudentInfoForm"

export default function RegistrationForm() {
  const userInfo = useSelector(authSelector).userInfo
  const object = {
    personalInfo: {
      fullName: "",
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      email: "",
      ethnic: "",
      religion: "",
      provinceHometown: "",
      districtHometown: "",
      wardHometown: "",
      detailHometown: "",
      provinceAddress: "",
      districtAddress: "",
      wardAddress: "",
      detailAddress: "",
      idNumber: "",
      idIssueDate: "",
      idIssuePlace: "",
    },
    familyInfo: {
      father: {
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
    },
    studentInfo: {
      studentType: "",
      universityName: "",
      major: "",
      classCode: "",
      studentCode: "",
      grade10Semester1: "",
      grade10Semester2: "",
      grade11Semester1: "",
      grade11Semester2: "",
      grade12Semester1: "",
      grade12Semester2: "",
      highSchoolGraduationExamScore: "",
      dgnlScore: "",
      admissionViaDirectMethod: "",
      achievements: "",
      dream: "",
    },
  }
  document.title =
    "Biểu mẫu đăng ký vào Ký Túc Xá Cỏ May năm học 2023 - 2024 | KTX Cỏ May"
  return (
    <>
      <SeoHelmet title='Biểu mẫu đăng ký xét tuyển vào KTX Cỏ May năm học 2023 - 2024' />
      {userInfo?.id ? (
        <>
          {/* <div className="absolute h-[400px] top-0 left-0 right-0 w-full bg-primary-500 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40" /> */}
          <header className='mt-20 text-center mx-auto'>
            <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
              <span className='text-3xl md:text-4xl leading-none'>🎉</span>TUYỂN
              SINH VÀO KÝ TÚC XÁ CỎ MAY NĂM HỌC 2023 - 2024
              <span className='text-3xl md:text-4xl leading-none'>🎉</span>
            </h2>
            <div className='inline-flex justify-center items-center mt-20'>
              <a
                className='inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 w-10 h-10'
                href='#personal-info'
              >
                1
              </a>
              <div
                className='inline-flex bg-primary-6000'
                style={{ width: "100px", height: "2px" }}
              />
              <a
                className='inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 w-10 h-10'
                href='#family-info'
              >
                2
              </a>
              <div
                className='inline-flex bg-primary-6000'
                style={{ width: "100px", height: "2px" }}
              />
              <a
                className='inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 w-10 h-10'
                href='#student-info'
              >
                3
              </a>
              <div
                className='inline-flex bg-primary-6000'
                style={{ width: "100px", height: "2px" }}
              />
              <a
                className='inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 w-10 h-10'
                href='#files-upload'
              >
                4
              </a>
            </div>
          </header>
          <PersonalInfoForm />
          <FamilyInfoForm />
          <StudentInfoForm />
          <FilesUploadForm />
        </>
      ) : (
        <div className='flex mt-5 justify-center items-center'>
          <div className='text-center'>Vui lòng đăng nhập...</div>
        </div>
      )}
    </>
  )
}
