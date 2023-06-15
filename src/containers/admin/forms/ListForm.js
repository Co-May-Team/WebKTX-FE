import _ from "lodash"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import Loading from "~/components/Loading"
import SeoHelmet from "~/components/SeoHelmet"
import { useDebounce, useFetch } from "~/hooks"
import admissionApi from "~/services/admissionApi"
import { httpStatus } from "~/utils/constants/httpStatus"
import FormItem from "./FormItem"

const columnNames = [
  {
    id: Math.random(),
    name: "NGƯỜI ỨNG TUYỂN",
  },
  {
    id: Math.random(),
    name: "NGÀY SINH",
  },
  {
    id: Math.random(),
    name: "SĐT",
  },
  {
    id: Math.random(),
    name: "EMAIL",
  },
  {
    id: Math.random(),
    name: "TRẠNG THÁI",
  },
  //   {
  //   id: Math.random(),
  //   name: 'KẾT QUẢ'
  // },
  {
    id: Math.random(),
    name: "Hành động",
    hidden: true,
  },
]

export default function ListForm() {
  // State
  const {
    loading: loadingListForm,
    error,
    response: listForm,
  } = useFetch(admissionApi.getAllByYear, 2023)
  const [searchValue, setSearchValue] = useState("")
  const [filteredList, setFilteredList] = useState([])
  const query = useDebounce(searchValue, 1000)

  // Tự động được gọi mỗi khi người dùng nhập tên và sau 1s thì sẽ handle lọc dữ liệu
  useEffect(() => {
    if (_.isEmpty(query)) {
      // Nếu không nhập dữ liệu và danh sách đã bị filter trước đó => Cập nhật lại danh sách đầy đủ ban đầu
      if (listForm?.length !== filteredList?.length) setFilteredList(listForm)
      return
    }
    // Filter theo tên người ứng tuyển
    const updatedList = listForm.filter((item) => item.fullname.includes(query))
    // Trigger render with updated values
    setFilteredList(updatedList)
  }, [query, listForm, filteredList?.length])

  // Thực hiện gán list form vào fillter list để thực hiện filter khi người dùng tìm kiếm
  useEffect(() => {
    listForm && setFilteredList(listForm)
  }, [listForm])

  // Render list đơn ứng tuyển đã được filter
  const renderListForm = () =>
    filteredList.map((formItem) => (
      <FormItem
        key={formItem.userId}
        formInfo={formItem}
        updateStatusForm={updateStatusForm}
      />
    ))

  // Render tên các column của bảng
  function renderColumnNames() {
    return columnNames.map((item) => {
      return item?.hidden ? (
        <th scope='col' className='relative px-6 py-3' key={item.id}>
          <span className='sr-only'>{item.name}</span>
        </th>
      ) : (
        <th scope='col' className='px-6 py-3 text-center' key={item.id}>
          {item.name}
        </th>
      )
    })
  }

  // Hàm xử lý update trạng thái đơn ứng tuyển
  function updateStatusForm(data) {
    admissionApi
      .updateStatus(data)
      // Call API thành công
      .then((response) => {
        if (response.data.status === httpStatus.OK) {
          Swal.fire(
            "Thông báo!",
            "Chỉnh sửa trạng thái đơn ứng tuyển thành công",
            "success"
          )
        }
      })
      // Call APIi thất bại
      .catch((err) => {
        Swal.fire("Opps!", "Đã có lỗi xảy ra, vui lòng thử lại sau", "error")
      })
  }

  // Render data
  return (
    <div className='container-admin mx-auto'>
      <SeoHelmet title='Quản lý đơn ứng tuyển' />
      <h2 className='text-3xl md:text-4xl font-semibold uppercase mb-4'>
        QUẢN LÝ ĐƠN ỨNG TUYỂN
      </h2>
      <div className='shadow dark:border dark:border-neutral-800 overflow-scroll sm:rounded-lg'>
        <div className='m-5 flex gap-1 align-middle'>
          <div className='relative w-[50%]'>
            <input
              type='search'
              className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-full text-sm font-normal h-[42px] pl-4 py-3 w-full'
              placeholder='Tìm kiếm đơn ứng tuyển...'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <span className='absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500 dark:text-neutral-400'>
              <svg
                className='h-5 w-5'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M22 22L20 20'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </span>
          </div>
        </div>
        {loadingListForm ? (
          <Loading />
        ) : (
          <table className='min-w-full divide-y divide-neutral-200 dark:divide-neutral-800'>
            <thead className='bg-neutral-50 dark:bg-neutral-800'>
              <tr className='text-left text-xs font-medium text-neutral-900 dark:text-neutral-300 uppercase tracking-wider'>
                {renderColumnNames()}
              </tr>
            </thead>
            <tbody className='bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800'>
              {renderListForm()}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
