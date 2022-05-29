import { Button } from 'react-bootstrap';
import functions from 'shared/utils/functions';
import { Asterisk } from 'react-bootstrap-icons';
import SettingListItem from 'shared/components/SettingList/Item';

const UserSettingsAccountPassword = () => {
  const sendResetPasswordEmail = () => {
    functions.requestPasswordReset();
  };

  return (
    <SettingListItem
      startIcon={<Asterisk />}
      title='Password'
      description='Request password change email'
      endElement={
        <Button
          className='ms-auto'
          variant='primary'
          onClick={sendResetPasswordEmail}
        >
          Send reset password email
        </Button>
      }
    />
  );
};

export default UserSettingsAccountPassword;
