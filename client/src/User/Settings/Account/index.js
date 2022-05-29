import DisplayName from './DisplayName';
import Password from './Password';
import AccountDelete from './AccountDelete';
import Logout from './Logout';
import SettingList from 'shared/components/SettingList';

const UserSettingsAccount = () => (
  <SettingList>
    <DisplayName />
    <Password />
    <AccountDelete />
    <Logout />
  </SettingList>
);

export default UserSettingsAccount;
