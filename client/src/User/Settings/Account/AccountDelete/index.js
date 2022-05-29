import { Button } from 'react-bootstrap';
import functions from 'shared/utils/functions';
import { Trash } from 'react-bootstrap-icons';
import SettingListItem from 'shared/components/SettingList/Item';

const UserSettingsAccountAccountDelete = () => {
  const sendDeleteAccountEmail = () => {
    functions.requestDeleteAccount();
  };

  return (
    <SettingListItem
      startIcon={<Trash />}
      title='Delete account'
      description='Request delete account email'
      endElement={
        <Button
          className='ms-auto'
          variant='danger'
          onClick={sendDeleteAccountEmail}
        >
          Send delete account email
        </Button>
      }
    />
  );
};

export default UserSettingsAccountAccountDelete;
