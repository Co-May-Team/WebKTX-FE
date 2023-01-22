import PropTypes from 'prop-types'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { bindClassNames } from '~/utils'
import styles from './InputField.module.scss'

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
    ...props
}) {
    return (
        <FormGroup className={cx('form-group', formGroupClassName)}>
            <Label className={cx('label', labelClassName)}>
                {label || 'Label mặc định'}
            </Label>
            <Input
                className={cx('input', inputClassName)}
                type={type || 'text'}
                placeholder={placeholder}
                {...props}
            />
            <FormFeedback className={cx(formFeedbackClassName)}>
                {feedback}
            </FormFeedback>
        </FormGroup>
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
}
