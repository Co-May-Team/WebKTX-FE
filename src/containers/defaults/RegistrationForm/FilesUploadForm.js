import FileSaver from "file-saver"
import { Formik } from "formik"
import { useState } from "react"
import { BsArrowLeft, BsCheckLg, BsDownload } from "react-icons/bs"
import { Form } from "reactstrap"
import Swal from "sweetalert2"
import * as Yup from "yup"
import { InputField } from "~/components/Customs"
import Motion from "~/components/Motion"
import admissionApi from "~/services/admissionApi"

export default function FilesUploadForm({ handleFormChange }) {
  const [files, setFiles] = useState([])

  const handleFileChange = (event, onChange) => {
    onChange()
    const { name, files } = event.target
    setFiles((values) => ({
      ...values,
      [name]: files[0],
    }))
  }

  const handleGenerateFiles = async () => {
    const info = {
      personalInfo: JSON.parse(localStorage.getItem("personalInfo")),
      familyInfo: JSON.parse(localStorage.getItem("familyInfo")),
      studentInfo: JSON.parse(localStorage.getItem("studentInfo")),
    }
    Swal.fire({
      title: "Đang tải xuống...",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    })
    admissionApi
      .genFile({
        ...info,
        familyInfo: {
          relatives: [
            {
              relationship: {
                id: 1,
                label: "Cha",
              },
              ...info.familyInfo.father,
            },
            {
              relationship: {
                id: 2,
                label: "Mẹ",
              },
              ...info.familyInfo.mother,
            },
            ...info.familyInfo.relatives?.map((relative) => ({
              status: {
                value: "Có thông tin",
                label: "Có thông tin",
              },
              ...relative,
            })),
          ],
          familyBackground: info.familyInfo.familyBackground,
        },
      })
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" })
        FileSaver.saveAs(
          pdfBlob,
          "Đơn xin vào ở KTX Cỏ May năm học 2023 - 2022"
        )
        Swal.fire({
          icon: "success",
          title:
            "Tải xuống file thành công, kiểm tra trong mục Download của trình duyệt",
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Có lỗi trong quá trình tải xuống",
          text: error?.message,
        })
      })
  }

  /* Xử lý Form */
  const initialValuesFilesUpload = {
    application: "",
    transcriptAndAchievements: "",
    personalProfile: "",
    photo: "",
    houseImage: "",
  }

  const validationSchemaFilesUpload = Yup.object({
    application: Yup.mixed().required(
      "Vui lòng tải lên đơn xin vào ở KTX Cỏ May."
    ),
    transcriptAndAchievements: Yup.mixed().required(
      "Vui lòng tải lên học bạ THPT và Thành tích học tập."
    ),
    personalProfile: Yup.mixed().required(
      "Vui lòng tải lên sơ yếu lý lịch (có dán ảnh và xác nhận của địa phương)."
    ),
    photo: Yup.mixed().required("Vui lòng tải lên ảnh thẻ (.JPG)."),
    houseImage: Yup.mixed().required(
      "Vui lòng tải lên file PDF chứa toàn bộ hình ảnh căn nhà đang ở."
    ),
  })

  const handleSubmitFilesUpload = async (values, actions) => {
    actions.setSubmitting(true)
    const {
      application,
      transcriptAndAchievements,
      personalProfile,
      photo,
      houseImage,
    } = values
    // Kiểm tra kích thước của các tệp được tải lên
    if (
      application.size > 5 * 1024 * 1024 ||
      transcriptAndAchievements.size > 5 * 1024 * 1024 ||
      personalProfile.size > 5 * 1024 * 1024 ||
      photo.size > 5 * 1024 * 1024 ||
      houseImage.size > 5 * 1024 * 1024
    ) {
      Swal.fire({
        icon: "warning",
        title: "Lỗi",
        text: "Kích thước các tập tin không được vượt quá 5MB",
      })
    }
    // Thực hiện cập nhật thông tin đăng ký sau khi đã gửi các tập tin lên server thành công
    const info = {
      personalInfo: JSON.parse(localStorage.getItem("personalInfo")),
      familyInfo: JSON.parse(localStorage.getItem("familyInfo")),
      studentInfo: JSON.parse(localStorage.getItem("studentInfo")),
    }
    const data = {
      ...info,
      familyInfo: {
        relatives: [
          {
            relationship: {
              id: 1,
              label: "Cha",
            },
            ...info.familyInfo.father,
          },
          {
            relationship: {
              id: 2,
              label: "Mẹ",
            },
            ...info.familyInfo.mother,
          },
          ...info.familyInfo.relatives?.map((relative) => ({
            status: {
              value: "Có thông tin",
              label: "Có thông tin",
            },
            ...relative,
          })),
        ],
        familyBackground: info.familyInfo.familyBackground,
      },
    }
    admissionApi.submit(data).then(async (response) => {
      if (response.data?.status === "OK") {
        // Thực hiện xử lý dữ liệu tương ứng với các tệp được tải lên
        const formData = new FormData()
        for (let key in files) {
          formData.append(key, files[key])
        }
        // Gửi formData lên server
        Swal.fire({
          title: "Đang gửi các tập tin lên hệ thống...",
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        })
        admissionApi.uploadFiles(formData).then(() => {
          Swal.fire({
            icon: "success",
            title: "Gửi hồ sơ thành công",
            text: "Nếu bạn muốn cập nhật lại hồ sơ, hãy cập nhật lại thông tin trong biểu mẫu này và ấn gửi lần nữa!",
          })
        })
      } else {
        Swal.fire({
          icon: "warning",
          title: "Gửi hồ sơ thất bại",
          text: response.data?.data,
        })
      }
    })
    // ...

    actions.setSubmitting(false)
  }
  /* */
  return (
    <Motion className='container relative pt-10 pb-16 lg:pt-20 lg:pb-28'>
      <div className='p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl sm:p-10 lg:p-16 dark:bg-neutral-900'>
        <div className='flex mt-5 justify-center items-center'>
          <button
            className='relative w-full h-auto mt-5 inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 disabled:bg-opacity-70 bg-sky-700 hover:bg-sky-600 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 dark:focus:ring-offset-0'
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
            <BsDownload className='me-3' />
            Đơn xin vào ở KTX Cỏ May năm học 2023 - 2022
            <BsDownload className='ms-3' />
          </button>
        </div>
        <header className=' my-5 text-center mx-auto'>
          <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
            IV. HỒ SƠ XÉT TUYỂN
          </h2>
          <span className='block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200'>
            Các bạn vui lòng tải lên đúng hồ sơ của mình ở bên dưới để tránh sai
            sót nhé!
          </span>
        </header>
        <Formik
          initialValues={initialValuesFilesUpload}
          validationSchema={validationSchemaFilesUpload}
          onSubmit={handleSubmitFilesUpload}
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
                <InputField
                  type='file'
                  accept='application/pdf'
                  name='application'
                  label='Đơn xin vào ở KTX Cỏ May (.PDF)'
                  value={values.application}
                  feedback={errors.application}
                  onChange={(event) =>
                    handleFileChange(event, () => handleChange(event))
                  }
                  invalid={touched.application && errors.application}
                  isRequired
                />
                <InputField
                  type='file'
                  accept='application/pdf'
                  name='transcriptAndAchievements'
                  label='Học bạ THPT và Thành tích học tập (.PDF)'
                  value={values.transcriptAndAchievements}
                  feedback={errors.transcriptAndAchievements}
                  onChange={(event) =>
                    handleFileChange(event, () => handleChange(event))
                  }
                  invalid={
                    touched.transcriptAndAchievements &&
                    errors.transcriptAndAchievements
                  }
                  isRequired
                />
                <InputField
                  type='file'
                  accept='application/pdf'
                  name='personalProfile'
                  label='Sơ yếu lý lịch (có dán ảnh và xác nhận của địa phương)(.PDF)'
                  value={values.personalProfile}
                  feedback={errors.personalProfile}
                  onChange={(event) =>
                    handleFileChange(event, () => handleChange(event))
                  }
                  invalid={touched.personalProfile && errors.personalProfile}
                  isRequired
                />
                <InputField
                  type='file'
                  accept='.jpg'
                  name='photo'
                  label='Ảnh thẻ (.JPG)'
                  value={values.photo}
                  feedback={errors.photo}
                  onChange={(event) =>
                    handleFileChange(event, () => handleChange(event))
                  }
                  invalid={touched.photo && errors.photo}
                  isRequired
                />
                <InputField
                  type='file'
                  accept='application/pdf'
                  name='houseImage'
                  label='Hình ảnh căn nhà đang ở (.PDF)'
                  value={values.houseImage}
                  feedback={errors.houseImage}
                  onChange={(event) =>
                    handleFileChange(event, () => handleChange(event))
                  }
                  invalid={touched.houseImage && errors.houseImage}
                  isRequired
                />
                <div className='mt-10 inline-flex items-center justify-center gap-5'>
                  <button
                    className='block rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-10 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                    onClick={() => handleFormChange(3)}
                  >
                    <BsArrowLeft className='inline' /> Quay lại
                  </button>
                  <button
                    className='block rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-10 disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
                    type='submit'
                  >
                    Gửi hồ sơ <BsCheckLg className='inline' />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Motion>
  )
}
