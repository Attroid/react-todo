import Item from './Item';
import { ListGroup } from 'react-bootstrap';

const SettingList = ({ children, className, style, ...rest }) => (
  <ListGroup className={className} style={style} {...rest}>
    {children}
  </ListGroup>
);

export default Object.assign(SettingList, { Item });
