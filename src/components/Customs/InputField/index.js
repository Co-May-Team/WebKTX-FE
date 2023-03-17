import PropTypes from 'prop-types'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

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
  ...props
}) {
  return (
    <label className="block">
      <div className="flex">
        <span className="text-neutral-800 dark:text-neutral-200">
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
            'block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-full text-sm font-normal h-11 px-4 py-3 mt-1 ' +
            (invalid && 'is-invalid')
          }
          {...props}
        />
      )}
      <small>{note}</small>
      <div className="invalid-feedback">{feedback}</div>
    </label>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  feedback: PropTypes.string,
  note: PropTypes.string,
  formFeedbackClassName: PropTypes.string,
  formGroupClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  showLengthValue: PropTypes.bool,
  isRequired: PropTypes.bool,
  invalid: PropTypes.bool,
}
