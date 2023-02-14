import PropTypes from 'prop-types'
import { Input, Label } from 'reactstrap'
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
    note,
    formFeedbackClassName,
    placeholder,
    customInputElement,
    isRequired,
    invalid,
    ...props
}) {
    return (
        <div className={cx(formGroupClassName) + ' mb-3'}>
            <Label className={cx(labelClassName)}>
                {label}
                {isRequired && <span style={{ color: 'red' }}>*</span>}:
            </Label>
            {customInputElement ? (
                customInputElement
            ) : (
                <Input
                    className={cx(inputClassName)}
                    type={type || 'text'}
                    placeholder={placeholder}
                    {...props}
                />
            )}
            <small>{note}</small>
            {invalid && <div className="invalid-feedback">{feedback}</div>}
        </div>
    )
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    feedback: PropTypes.string,
    note: PropTypes.string,
    formFeedbackClassName: PropTypes.string,
    formGroupClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    invalid: PropTypes.bool,
}
