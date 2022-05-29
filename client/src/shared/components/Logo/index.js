import { JournalCheck } from 'react-bootstrap-icons';
import clsx from 'clsx';

const Logo = ({ variant, className, style }) => (
  <div
    className={clsx(
      `d-flex flex-column align-items-center text-${variant}`,
      className
    )}
    style={style}
  >
    <JournalCheck size={32} />
    <p className='m-0'>React&nbsp;Todo</p>
  </div>
);

Logo.defaultProps = {
  variant: 'light',
};

export default Logo;
