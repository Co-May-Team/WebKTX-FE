import { useState } from "react"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import Motion from "~/components/Motion"
import SeoHelmet from "~/components/SeoHelmet"
import axiosClient from "~/services/axiosClient"
import { authSelector } from "~/store/selectors"
import FamilyInfoForm from "./FamilyInfoForm"
import FilesUploadForm from "./FilesUploadForm"
import PersonalInfoForm from "./PersonalInfoForm"
import StudentInfoForm from "./StudentInfoForm"
import fileSaver from 'file-saver';
import axios from 'axios';
export default function RegistrationForm() {
  const userInfo = useSelector(authSelector).userInfo

  const [formStatus, setFormStatus] = useState({
    personalInfo: false,
    familyInfo: false,
    studentInfo: false,
    filesUpload: false,
  })
  const handleFormStatus = (formName, status) => {
    setFormStatus({
      ...formStatus,
      [formName]: status,
    })
  }

  const handleGenerateFiles = async () => {
    const info = {
      personalInfo: JSON.parse(localStorage.getItem("personalInfo")),
      familyInfo: JSON.parse(localStorage.getItem("familyInfo")),
      studentInfo: JSON.parse(localStorage.getItem("studentInfo")),
    }
    const response = await axiosClient.post("/admission/gen-file", info)
    // console.log(response.data);
    // const blob = new Blob([response.data], {
    //   type: "application/pdf",
    // })
    // fileSaver.saveAs(blob, 'filename.pdf');
    // const url = URL.createObjectURL(blob)
    // window.open(url)
    axios({
      method: 'post',
      url: 'https://devcomaydorm.tech/api/admission/gen-file',
      data: info,
      responseType: 'blob',
    })
    .then(response => {
      const pdfBlob = new Blob([response.data], {type: 'application/pdf'});
      fileSaver.saveAs(pdfBlob, 'example.pdf');
    })
    .catch(error => {
      console.error(error);
    });

  }

  /* Xử lý Formik Form */
  const initialValues = {
    personalInfo: {
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
    },
    familyInfo: {
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
        placeOfWork: "",
        phoneNumberOfCompany: "",
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
        placeOfWork: "",
        phoneNumberOfCompany: "",
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
          placeOfWork: "",
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
      averageGrade10: 0,
      averageGrade11: 0,
      averageGrade12: 0,
      highSchoolGraduationExamScore: "",
      dgnlScore: "",
      admissionViaDirectMethod: "",
      achievements: "",
      dream: "",
    },
  }
  const validationSchema = Yup.object({
    personalInfo: Yup.object().shape({
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
      religion: Yup.object()
        .nullable()
        .required("Tôn giáo không được để trống"),
      hometown: Yup.object()
        .nullable()
        .required("Quê quán không được để trống"),
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
    }),
    familyInfo: Yup.object().shape({
      father: Yup.object().shape({
        status: Yup.object().required(
          "Trạng thái thông tin của cha là bắt buộc"
        ),
        fullName: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required("Họ tên của cha là bắt buộc"),
          otherwise: Yup.string(),
        }),
        yearOfBirth: Yup.number().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.number().required("Năm sinh của cha là bắt buộc"),
          otherwise: Yup.number(),
        }),
        phoneNumber: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required("Số điện thoại của cha là bắt buộc"),
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
          then: Yup.object()
            .nullable()
            .required("Phường/Xã của cha là bắt buộc"),
          otherwise: Yup.object(),
        }),
        detailAddress: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required("Địa chỉ của cha là bắt buộc"),
          otherwise: Yup.string(),
        }),
        currentJob: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required(
            "Nghề nghiệp hiện tại của cha là bắt buộc"
          ),
          otherwise: Yup.string(),
        }),
        placeOfWork: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required("Nơi làm việc của cha là bắt buộc"),
          otherwise: Yup.string(),
        }),
        phoneNumberOfCompany: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required(
            "Số điện thoại nơi làm việc của cha là bắt buộc"
          ),
          otherwise: Yup.string(),
        }),
        income: Yup.number().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.number()
            .min(0, "Thu nhập phải là một số lớn hơn 0")
            .required("Thu nhập của cha là bắt buộc"),
          otherwise: Yup.number(),
        }),
        healthStatus: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required(
            "Tình trạng sức khỏe của cha là bắt buộc"
          ),
          otherwise: Yup.string(),
        }),
      }),
      mother: Yup.object().shape({
        status: Yup.object().required(
          "Trạng thái thông tin của mẹ là bắt buộc"
        ),
        fullName: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required("Họ tên của mẹ là bắt buộc"),
          otherwise: Yup.string(),
        }),
        yearOfBirth: Yup.number().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.number().required("Năm sinh của mẹ là bắt buộc"),
          otherwise: Yup.number(),
        }),
        phoneNumber: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required("Số điện thoại của mẹ là bắt buộc"),
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
          then: Yup.object()
            .nullable()
            .required("Quận/Huyện của mẹ là bắt buộc"),
          otherwise: Yup.object(),
        }),
        wardAddress: Yup.object().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.object()
            .nullable()
            .required("Phường/Xã của mẹ là bắt buộc"),
          otherwise: Yup.object(),
        }),
        detailAddress: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required("Địa chỉ của mẹ là bắt buộc"),
          otherwise: Yup.string(),
        }),
        currentJob: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required(
            "Nghề nghiệp hiện tại của mẹ là bắt buộc"
          ),
          otherwise: Yup.string(),
        }),
        placeOfWork: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required("Nơi làm việc của mẹ là bắt buộc"),
          otherwise: Yup.string(),
        }),
        phoneNumberOfCompany: Yup.string().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.string().required(
            "Số điện thoại nơi làm việc của mẹ là bắt buộc"
          ),
          otherwise: Yup.string(),
        }),
        income: Yup.number().when("status", {
          is: (val) => val?.value === "Có thông tin",
          then: Yup.number()
            .min(0, "Thu nhập phải là một số lớn hơn 0")
            .required("Thu nhập của mẹ là bắt buộc"),
          otherwise: Yup.number(),
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
          phoneNumber: Yup.string().required(
            "Số điện thoại không được để trống"
          ),
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
          placeOfWorkORStudy: Yup.string().required(
            "Nơi làm việc/học tập của người thân không được để trống"
          ),
          income: Yup.number()
            .min(0, "Thu nhập phải là một số lớn hơn 0")
            .required("Thu nhập của người thân không được để trống"),
          healthStatus: Yup.string().required(
            "Tình trạng sức khỏe của người thân không được để trống"
          ),
        })
      ),
      familyBackground: Yup.string().required(
        "Hoàn cảnh gia đình không được để trống"
      ),
    }),
    studentInfo: Yup.object().shape({
      studentType: Yup.array()
        .of(Yup.object())
        .min(1, "Bạn phải chọn ít nhất 1 đối tượng"),
      universityName: Yup.object()
        .nullable()
        .required("Vui lòng chọn trường của bạn"),
      major: Yup.string().required("Vui lòng nhập ngành của bạn"),
      classCode: Yup.string().required("Vui lòng nhập mã lớp"),
      studentCode: Yup.string().required("Vui lòng nhập mã số sinh viên"),
      averageGrade10: Yup.number("Điểm phải là số")
        .min(0, "Điểm phải lớn hơn hoặc bằng 0")
        .max(10, "Điểm phải nhỏ hơn hoặc bằng 10")
        .required("Vui lòng nhập điểm trung bình lớp 10"),
      averageGrade11: Yup.number("Điểm phải là số")
        .min(0, "Điểm phải lớn hơn hoặc bằng 0")
        .max(10, "Điểm phải nhỏ hơn hoặc bằng 10")
        .required("Vui lòng nhập điểm trung bình lớp 11"),
      averageGrade12: Yup.number("Điểm phải là số")
        .min(0, "Điểm phải lớn hơn hoặc bằng 0")
        .max(10, "Điểm phải nhỏ hơn hoặc bằng 10")
        .required("Vui lòng nhập điểm trung bình lớp 12"),
      highSchoolGraduationExamScore: Yup.number().required(
        "Vui lòng nhập điểm thi tốt nghiệp"
      ),
      dgnlScore: Yup.number("Điểm đánh giá năng lực phải là một số hợp lệ"),
      admissionViaDirectMethod: Yup.string(),
      achievements: Yup.string().required(
        "Vui lòng nhập các thành tích hoặc giải thưởng đã đạt được"
      ),
      dream: Yup.string().required(
        "Vui lòng trình bày ước mơ và định hướng của bạn trong tương lai"
      ),
    }),
  })

  return (
    <Motion>
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
                style={{ width: "75px", height: "2px" }}
              />
              <a
                className='inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 w-10 h-10'
                href='#family-info'
              >
                2
              </a>
              <div
                className='inline-flex bg-primary-6000'
                style={{ width: "75px", height: "2px" }}
              />
              <a
                className='inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 w-10 h-10'
                href='#student-info'
              >
                3
              </a>
              <div
                className='inline-flex bg-primary-6000'
                style={{ width: "75px", height: "2px" }}
              />
              <a
                className='inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 w-10 h-10'
                href='#files-upload'
              >
                4
              </a>
            </div>
          </header>
          <PersonalInfoForm handleFormStatus />
          <FamilyInfoForm handleFormStatus />
          <StudentInfoForm handleFormStatus />
          <FilesUploadForm handleFormStatus>
            <div className='flex mt-5 justify-center items-center'>
              <button
                className='relative w-full h-auto mt-5 inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                // disabled={
                //   !Object.values({
                //     personalInfo: JSON.parse(
                //       localStorage.getItem("personalInfo")
                //     )?.finished,
                //     familyInfo: JSON.parse(localStorage.getItem("familyInfo"))
                //       ?.finished,
                //     studentInfo: JSON.parse(localStorage.getItem("studentInfo"))
                //       ?.finished,
                //   }).every((value) => value === true)
                // }
                onClick={handleGenerateFiles}
              >
                Tự động tạo file từ thông tin trên
              </button>
            </div>
          </FilesUploadForm>
        </>
      ) : (
        <div className='flex mt-5 justify-center items-center'>
          <div className='text-center'>Vui lòng đăng nhập...</div>
        </div>
      )}
    </Motion>
  )
}
