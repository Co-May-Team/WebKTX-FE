import PropTypes from 'prop-types'
import Select from 'react-select'
import './CustomSelect.scss'

export default function InputField({
  label,
  formGroupClassName,
  labelClassName,
  showLengthValue,
  feedback,
  note,
  formFeedbackClassName,
  customInputElement,
  isRequired,
  invalid,
  options,
  ...props
}) {
  return (
    <label className="block">
      {props.type === 'textarea' ? (
        <>
          <div className="flex">
            <span className="text-neutral-800 font-medium text-sm dark:text-neutral-300">
              {label ? (
                <>
                  {label}
                  {isRequired && <span style={{ color: 'red' }}>*</span>}:
                </>
              ) : (
                ''
              )}
            </span>
            {showLengthValue && (
              <small className="col-auto">{props?.value?.length}</small>
            )}
          </div>
          <textarea
            className={
              'block w-full text-sm rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 mt-1'
            }
            {...props}
          />
        </>
      ) : props.type === 'select' ? (
        <>
          <div className="flex">
            <span className="text-neutral-800 font-medium text-sm dark:text-neutral-300">
              {label}
              {isRequired && <span style={{ color: 'red' }}>*</span>}:
            </span>
          </div>
          <Select
            noOptionsMessage={() => 'Không có lựa chọn phù hợp...'}
            {...props}
            classNamePrefix="custom-select"
            value={props.value}
            onChange={props.onChange}
            options={options}
            isClearable
            isSearchable
            blurInputOnSelect
          />
        </>
      ) : (
        <>
          <div className="flex">
            <span className="text-neutral-800 font-medium text-sm dark:text-neutral-300">
              {label}
              {isRequired && <span style={{ color: 'red' }}>*</span>}:
            </span>
            {showLengthValue && (
              <small className="col-auto">{props?.value?.length}</small>
            )}
          </div>
          {customInputElement ? (
            customInputElement
          ) : (
            <input
              className={
                'form-control block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-full text-sm font-normal h-11 px-4 py-3 mt-1 '
              }
              {...props}
            />
          )}
        </>
      )}
      <small>{note}</small>
      {invalid && (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          {feedback}
        </div>
      )}
    </label>
  )
}

InputField.propTypes = {
  label: PropTypes.string,
  feedback: PropTypes.string,
  note: PropTypes.string,
  formFeedbackClassName: PropTypes.string,
  formGroupClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  showLengthValue: PropTypes.bool,
  isRequired: PropTypes.bool,
  invalid: PropTypes.bool,
  options: PropTypes.array,
}
