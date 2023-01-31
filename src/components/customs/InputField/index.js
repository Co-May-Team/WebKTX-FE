import PropTypes from 'prop-types'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { bindClassNames } from '~/utils'
import styles from './index.module.scss'

const cx = bindClassNames(styles)

export default function InputField({
    label,
    formGroupClassName,
    labelClassName,
    inputClassName,
    type,
    feedback,
    formFeedbackClassName,
    placeholder,
    customInputElement,
    isRequired,
    invalid,
    ...props
}) {
    return (
        <div className={cx('form-group', formGroupClassName)}>
            <Label className={cx('label', labelClassName)}>
                {label || 'Label mặc định'}
                {isRequired && <span style={{ color: 'red' }}>*</span>}:
            </Label>
            {customInputElement ? (
                customInputElement
            ) : (
                <Input
                    className={cx('input', inputClassName)}
                    type={type || 'text'}
                    placeholder={placeholder}
                    {...props}
                />
            )}
            {invalid && <div className="invalid-feedback">{feedback}</div>}
        </div>
    )
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    feedback: PropTypes.string,
    formFeedbackClassName: PropTypes.string,
    formGroupClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    invalid: PropTypes.bool,
}
