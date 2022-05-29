import { Link } from 'react-router-dom';
import settingsMenuItems from './settingsMenuItems';
import SettingList from 'shared/components/SettingList';
import { CaretRight } from 'react-bootstrap-icons';

const UserSettingsMenuList = ({ className }) => (
  <SettingList className={className}>
    {settingsMenuItems.map(({ id, icon, title, description, to }) => (
      <SettingList.Item
        key={id}
        startIcon={icon}
        title={title}
        description={description}
        action
        as={Link}
        to={to}
        endElement={
          <span className='ms-auto d-flex align-items-center'>
            <CaretRight />
          </span>
        }
      />
    ))}
  </SettingList>
);

export default UserSettingsMenuList;
