import FileSaver from "file-saver"
import { Formik } from "formik"
import _ from "lodash"
import { useEffect, useState } from "react"
import { BsArrowLeft, BsCheckLg } from "react-icons/bs"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Form } from "reactstrap"
import Swal from "sweetalert2"
import * as Yup from "yup"
import personalProfileFile from "~/assets/documents/So_yeu_ly_lich_mau.doc"
import { InputField } from "~/components/Customs"
import Motion from "~/components/Motion"
import admissionApi from "~/services/admissionApi"
import { authSelector } from "~/store/selectors"
import { path } from "~/utils"
import convertToUrl from "~/utils/commons/convertToUrl"

export default function FilesUploadForm({ handleFormChange }) {
  const userInfo = useSelector(authSelector).userInfo

  const navigate = useNavigate()

  const [files, setFiles] = useState([])

  useEffect(() => {
    Swal.fire({
      icon: "warning",
      title: "LƯU Ý",
      color: "red",
      html: `<b>Đơn ứng tuyển và Sơ yếu lý lịch phải nộp đúng mẫu và bắt buộc phải có xác nhận của địa phương như trong hướng dẫn. Nếu không hồ sơ của bạn sẽ bị loại!</b>`,
    })
  }, [])

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
            "Tải xuống đơn thành công, kiểm tra trong mục Download của trình duyệt",
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

  const handleApplicationDownload = () => {
    // Xử lý việc tải xuống tệp tin đơn xin vào ở KTX Cỏ May
    handleGenerateFiles()
  }

  /* Xử lý Form */
  const initialValuesFilesUpload = {
    application: "",
    personalProfile: "",
    photo: "",
  }

  const validationSchemaFilesUpload = Yup.object({
    application: Yup.mixed(),
    personalProfile: Yup.mixed(),
    photo: Yup.mixed(),
  })

  const handleSubmitFilesUpload = async (values, actions) => {
    actions.setSubmitting(true)
    // Thực hiện xử lý gửi biểu mẫu tại đây
    const { application, personalProfile, photo } = values
    // Kiểm tra kích thước của các tệp được tải lên
    if (
      application.size > 5 * 1024 * 1024 ||
      personalProfile.size > 5 * 1024 * 1024 ||
      photo.size > 5 * 1024 * 1024
    ) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Kích thước các tập tin không được vượt quá 5MB",
      })
    }
    const formData = new FormData()
    // let formData = {}
    for (let key in files) {
      // formData = { ...formData, [key]: files[key] }
      formData.append(key, files[key])
    }
    // Gửi formData lên server
    Swal.fire({
      title: "Đang gửi các tập tin lên hệ thống...",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    })
    admissionApi.uploadFiles(formData).then((response) => {
      if (
        _.isUndefined(response) ||
        _.isNull(response) ||
        _.isEmpty(response)
      ) {
        Swal.fire({
          icon: "error",
          title: "Gửi tập tin thất bại",
          text: "Đã có lỗi xảy ra vui lòng kiểm tra lại",
        })
      } else {
        if (response.data?.status === "OK") {
          Swal.fire({
            icon: "success",
            title: "Gửi hồ sơ thành công",
            text: "Nếu bạn muốn cập nhật lại hồ sơ, hãy cập nhật lại thông tin trong biểu mẫu này và ấn gửi lần nữa!",
          })
          .then(() => {
            
            navigate(
              `${path.FORM_DETAIL_BASE}/${convertToUrl(
                userInfo?.fullName
              )}-${userInfo?.id}`,
              { state: userInfo?.id }
            )
          })
        } else {
          Swal.fire({
            icon: "error",
            title: "Gửi tập tin thất bại",
            text: response.data?.message,
          })
        }
      }
    })

    actions.setSubmitting(false)
  }
  /* */
  return (
    <Motion className='container relative pt-10 pb-16 lg:pt-20 lg:pb-28'>
      <div className='p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl sm:p-10 lg:p-16 dark:bg-neutral-900'>
        <div className='flex mt-5 justify-center items-center'></div>
        <header className=' my-5 text-center mx-auto'>
          <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
            IV. HỒ SƠ XÉT TUYỂN
          </h2>
          <span className='block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200'>
            Các bạn vui lòng tải xuống 2 file mẫu và chỉnh sửa theo hướng dẫn,
            sau đó upload đầy đủ 3 file (kích thước mỗi file tối đa 5MB) rồi mới
            nhấn Gửi hồ sơ nhé!
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
                  label={
                    <span>
                      Đơn xin vào ở KTX Cỏ May (
                      <button
                        className='text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000 font-medium'
                        type='button'
                        onClick={handleApplicationDownload}
                      >
                        Tải xuống file có sẵn
                      </button>
                      )
                    </span>
                  }
                  value={values.application}
                  feedback={errors.application}
                  onChange={(event) =>
                    handleFileChange(event, () => handleChange(event))
                  }
                  invalid={touched.application && errors.application}
                />
                <InputField
                  type='file'
                  accept='application/pdf'
                  name='personalProfile'
                  label={
                    <span>
                      Sơ yếu lý lịch (có dán ảnh và xác nhận của địa phương)
                      (.PDF) (
                      <a
                        className='text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000 font-medium'
                        href={personalProfileFile}
                        target='_blank'
                      >
                        Tải xuống mẫu
                      </a>
                      )
                    </span>
                  }
                  value={values.personalProfile}
                  feedback={errors.personalProfile}
                  onChange={(event) =>
                    handleFileChange(event, () => handleChange(event))
                  }
                  invalid={touched.personalProfile && errors.personalProfile}
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
