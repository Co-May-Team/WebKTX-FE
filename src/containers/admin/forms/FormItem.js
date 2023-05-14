import { useNavigate } from "react-router-dom"
import { path } from "~/utils"
import convertToUrl from "~/utils/commons/convertToUrl"
import { defaultAvatar } from "~/utils/constants/default"

export default function FormItem({ formInfo }) {
  const navigate = useNavigate()
  return (
    <tr>
      <td className='px-6 py-4'>
        <div className='flex items-center w-96 lg:w-auto max-w-md overflow-hidden'>
          <div className='flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14'>
            <img
              src={formInfo?.avatar || defaultAvatar}
              alt={formInfo?.fullname}
              sizes='80px'
              className='object-cover w-full h-full object-cover absolute inset-0 w-full h-full'
            />
          </div>
          <div className='ml-4 flex-grow'>
            <h2 className='inline-flex line-clamp-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
              {formInfo?.fullname}
            </h2>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400'>
        <span>{formInfo?.dob}</span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400'>
        <span>{formInfo?.phone}</span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400'>
        <span>{formInfo?.email}</span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <span className='px-4 py-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm'>
          {formInfo?.status}
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300'>
        <button
          onClick={() =>
            navigate(
              `${path.FORM_DETAIL_BASE}/${convertToUrl(formInfo?.fullname)}-${
                formInfo?.userId
              }`,
              { state: formInfo?.userId }
            )
          }
          className='text-primary-800 dark:text-primary-500 hover:text-primary-900'
        >
          Xem chi tiết
        </button>{" "}
      </td>
    </tr>
  )
}
