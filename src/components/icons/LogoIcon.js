import PropTypes from 'prop-types';
import { bindClassNames } from '~/utils';

const cx = bindClassNames();

function LogoIcon({ width = 45, height = 45, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      className={cx({ [className]: className })}
    >
      <rect
        width={width}
        height={height}
        fill="url(#pattern0)"
        style={{ width: '100%', height: '100%' }}
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#image0_66_151" transform="scale(0.00390625)" />
        </pattern>
        <image
          id="image0_66_151"
          width={256}
          height={256}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

export default LogoIcon;

LogoIcon.propTypes = {
  with: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};
