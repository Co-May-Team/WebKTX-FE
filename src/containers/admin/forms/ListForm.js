import { useEffect, useState } from "react"
import _ from 'lodash';
import Swal from "sweetalert2";
import Loading from "~/components/Loading"
import admissionApi from "~/services/admissionApi"
import FormItem from "./FormItem"
import { httpStatus } from "~/utils/constants/httpStatus";
import { useDebounce } from "~/hooks";

const columnNames = [
  {
    id: Math.random(),
    name: 'NGƯỜI ỨNG TUYỂN'
  },
  {
    id: Math.random(),
    name: 'NGÀY SINH'
  },
    {
    id: Math.random(),
    name: 'SĐT'
  },
    {
    id: Math.random(),
    name: 'EMAIL'
  },
    {
    id: Math.random(),
    name: 'TRẠNG THÁI'
  },
  //   {
  //   id: Math.random(),
  //   name: 'KẾT QUẢ'
  // },
    {
    id: Math.random(),
    name: 'Hành động',
    hidden: true
  },
]

export default function ListForm() {
  // State
  const [searchValue, setSearchValue] = useState('');
  const [loadingListForm, setLoadingListForm] = useState(true)
  const [listForm, setListForm] = useState([])
  const [filteredList, setFilteredList] = useState([]);
  const query = useDebounce(searchValue, 1000);

  // Tự động được gọi mỗi khi người dùng nhập tên và sau 1s thì sẽ handle lọc dữ liệu
  useEffect(() => {
    if(_.isEmpty(query)) {
      // Nếu không nhập dữ liệu và danh sách đã bị filter trước đó => Cập nhật lại danh sách đầy đủ ban đầu
      if(listForm.length !== filteredList.length) 
        setFilteredList(listForm);
      return;
    }
    // Filter theo tên người ứng tuyển
    const updatedList = listForm.filter(
      item => item.fullname.includes(query)
    );
    // Trigger render with updated values
    setFilteredList(updatedList);
  }, [query, listForm, filteredList.length])

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
    return (
      columnNames.map(item => {
        return item?.hidden ?  
        <th scope='col' className='relative px-6 py-3' key={item.id}>
          <span className='sr-only'>{item.name}</span>
        </th> 
        :  
        <th scope='col' className='px-6 py-3 text-center' key={item.id}>
          {item.name}
        </th>
      }))
  }

  // Hàm xử lý update trạng thái đơn ứng tuyển
  function updateStatusForm(data) {
    admissionApi
      .updateStatus(data)
      .then(response => {
        console.log(response)
          if(response.data.status === httpStatus.OK) {
            Swal.fire(
              'Thông báo!',
              'Chỉnh sửa trạng thái đơn ứng tuyển thành công',
              'success'
            );
          }
      })
      .catch(err => {
        Swal.fire(
          'Opps!',
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
          'error'
        );
      })
  }

  // Call API
  useEffect(() => {
    setLoadingListForm(true)
    admissionApi
      .getAllByYear(2023)
      .then((response) => {
        if (response.data.status === httpStatus.OK) {
          setListForm(response.data.data);
          setFilteredList(response.data.data);
        }
      })
      .finally(() => {
        setLoadingListForm(false)
      })
  }, [])
 
  // Render data
  return (
   <div className='container-admin mx-auto'>
      <h2 className="text-3xl md:text-4xl font-semibold uppercase mb-4">QUẢN LÝ ĐƠN ỨNG TUYỂN</h2>
      <div className='shadow dark:border dark:border-neutral-800 overflow-scroll sm:rounded-lg'>
        <div className="m-5 flex gap-1 align-middle">
          <input 
            className="text-sm text-black px-4 block outline-none rounded-lg border w-1/3 transition-all focus:border-primary-6000" 
            placeholder="Tìm kiếm đơn ứng tuyển..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button 
            className="px-4 py-2 border text-black rounded-lg text-sm transition-all hover:bg-primary-6000 hover:text-white"
          >
              Tìm kiếm
          </button>
        </div>
        <table className='min-w-full divide-y divide-neutral-200 dark:divide-neutral-800'>
          <thead className='bg-neutral-50 dark:bg-neutral-800'>
            <tr className='text-left text-xs font-medium text-neutral-900 dark:text-neutral-300 uppercase tracking-wider'>
              {renderColumnNames()}
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800'>
            {loadingListForm ? <Loading /> : renderListForm()}
          </tbody>
        </table>
      </div>
   </div>
  )
}
