import PropTypes from 'prop-types'
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap'
import { bindClassNames } from '~/utils'
import styles from './InputField.module.scss'

const cx = bindClassNames(styles)

export default function InputField(props) {
  const {
    label,
    formGroupClassName,
    labelClassName,
    inputClassName,
    type,
    formFeedbackClassName,
    placeholder,
  } = props
  return (
    <FormGroup className={cx('form-group', formGroupClassName)}>
      <Label className={cx('label', labelClassName)}>{label || 'Label'}</Label>
      <Input
        className={cx('input', inputClassName)}
        type={type || 'text'}
        placeholder={placeholder}
      />
      <FormFeedback className={cx(formFeedbackClassName)}>Error</FormFeedback>
    </FormGroup>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  formFeedbackClassName: PropTypes.string,
  formGroupClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
}
