import { ListGroupItem } from 'react-bootstrap';
import clsx from 'clsx';

const Item = ({
  startIcon,
  title,
  description,
  endElement,
  className,
  style,
  ...rest
}) => (
  <ListGroupItem
    className={clsx('d-flex align-items-center', className)}
    style={style}
    {...rest}
  >
    {startIcon}
    <span className='ms-3'>
      <b>{title}</b>
      <p className='m-0 text-muted'>{description}</p>
    </span>
    {endElement}
  </ListGroupItem>
);

export default Item;
