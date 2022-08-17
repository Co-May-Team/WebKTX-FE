import PropTypes from 'prop-types';
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap';
import { bindClassNames } from '~/utils';
import styles from './InputField.module.scss';

const cx = bindClassNames(styles);

export default function InputField(props) {
  return (
    <FormGroup>
      <Label className={cx('default-label')}>Label</Label>
      <Input className={cx('default-input')} />
      <FormFeedback>Error</FormFeedback>
    </FormGroup>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
};
