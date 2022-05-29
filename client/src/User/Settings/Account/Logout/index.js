import { Button } from 'react-bootstrap';
import functions from 'shared/utils/functions';
import { DoorClosed } from 'react-bootstrap-icons';
import SettingListItem from 'shared/components/SettingList/Item';

const UserSettingsAccountLogout = () => (
  <SettingListItem
    startIcon={<DoorClosed />}
    title='Logout'
    description='Logout of your account'
    endElement={
      <Button className='ms-auto' onClick={functions.logout}>
        Logout
      </Button>
    }
  />
);

export default UserSettingsAccountLogout;
