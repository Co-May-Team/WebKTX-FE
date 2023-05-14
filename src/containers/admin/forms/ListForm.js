import { useEffect, useState } from "react"
import Loading from "~/components/Loading"
import admissionApi from "~/services/admissionApi"
import FormItem from "./FormItem"

export default function ListForm() {
  const [loadingListForm, setLoadingListForm] = useState(true)
  const [listForm, setListForm] = useState([])
  useEffect(() => {
    setLoadingListForm(true)
    admissionApi
      .getAllByYear(2023)
      .then((response) => {
        if (response.data.status === "OK") {
          setListForm(response.data.data)
        }
      })
      .finally(() => {
        setLoadingListForm(false)
      })
  }, [])
  const renderListForm = () =>
    listForm.map((formItem) => (
      <FormItem key={formItem.userId} formInfo={formItem} />
    ))
  return (
    <div className='shadow dark:border dark:border-neutral-800 overflow-scroll sm:rounded-lg'>
      <table className='min-w-full divide-y divide-neutral-200 dark:divide-neutral-800'>
        <thead className='bg-neutral-50 dark:bg-neutral-800'>
          <tr className='text-left text-xs font-medium text-neutral-900 dark:text-neutral-300 uppercase tracking-wider'>
            <th scope='col' className='px-6 py-3'>
              Người ứng tuyển
            </th>
            <th scope='col' className='px-6 py-3'>
              Ngày sinh
            </th>
            <th scope='col' className='px-6 py-3'>
              SĐT
            </th>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3'>
              Trạng thái
            </th>
            <th scope='col' className='relative px-6 py-3'>
              <span className='sr-only'>Hành động</span>
            </th>
          </tr>
        </thead>
        <tbody className='bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800'>
          {loadingListForm ? <Loading /> : renderListForm()}
        </tbody>
      </table>
    </div>
  )
}
