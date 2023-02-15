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
    showLengthValue,
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
            <div className="d-flex">
                <Label className="col">
                    {label}
                    {isRequired && <span style={{ color: 'red' }}>*</span>}:
                </Label>
                {showLengthValue && (
                    <small className="col-auto">{props?.value?.length}</small>
                )}
            </div>
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
    showLengthValue: PropTypes.bool,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    invalid: PropTypes.bool,
}
