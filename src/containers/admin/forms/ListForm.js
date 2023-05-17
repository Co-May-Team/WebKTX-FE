import { useEffect, useState } from "react"
import _ from 'lodash';
import Loading from "~/components/Loading"
import admissionApi from "~/services/admissionApi"
import FormItem from "./FormItem"

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
    {
    id: Math.random(),
    name: 'KẾT QUẢ'
  },
    {
    id: Math.random(),
    name: 'Hành động',
    hidden: true
  },
]

export default function ListForm() {
  const [searchValue, setSearchValue] = useState('');
  const [loadingListForm, setLoadingListForm] = useState(true)
  const [listForm, setListForm] = useState([])
  const [filteredList, setFilteredList] = useState([]);


  function filterBySeacrh() {
    const query = searchValue.trim();
    if(_.isEmpty(query)) {
      if(listForm.length !== filteredList.length) setFilteredList(listForm);
      return;
    }

    const updatedList = listForm.filter(
      item => item.fullname.includes(query)
    );
    // Trigger render with updated values
    setFilteredList(updatedList);
  }

  function onKeyUp(e) {
    if(e.key !== 'Enter') return;
    filterBySeacrh();
  }

  useEffect(() => {
    setLoadingListForm(true)
    admissionApi
      .getAllByYear(2023)
      .then((response) => {
        if (response.data.status === "OK") {
          setListForm(response.data.data);
          setFilteredList(response.data.data);
        }
      })
      .finally(() => {
        setLoadingListForm(false)
      })
  }, [])
  
  const renderListForm = () =>
    filteredList.map((formItem) => (
      <FormItem key={formItem.userId} formInfo={formItem} />
    ))

  
  return (
   <div className='container-admin mx-auto'>
      <div className='shadow dark:border dark:border-neutral-800 overflow-scroll sm:rounded-lg'>
        <div className="m-5 flex gap-1 align-middle">
          <input 
            onKeyUp={onKeyUp}
            className="text-sm text-black px-4 block outline-none rounded-lg border w-1/3 transition-all focus:border-primary-6000" 
            placeholder="Tìm kiếm người ứng tuyển..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button 
            className="px-4 py-2 border text-black rounded-lg text-sm transition-all hover:bg-primary-6000 hover:text-white"
            onClick={filterBySeacrh}
          >
              Tìm kiếm
          </button>
        </div>
        <table className='min-w-full divide-y divide-neutral-200 dark:divide-neutral-800'>
          <thead className='bg-neutral-50 dark:bg-neutral-800'>
            <tr className='text-left text-xs font-medium text-neutral-900 dark:text-neutral-300 uppercase tracking-wider'>
              {columnNames.map(item => {
                return item?.hidden ?  
                <th scope='col' className='relative px-6 py-3' key={item.id}>
                  <span className='sr-only'>{item.name}</span>
                </th> 
                :  
                <th scope='col' className='px-6 py-3 text-center' key={item.id}>
                  {item.name}
                </th>
              })}
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
