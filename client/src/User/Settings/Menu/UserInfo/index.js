import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import BootswatchThemeCard from 'shared/components/BootswatchThemeCard';

const UserSettingsMenuUserInfo = () => {
  const stores = useStores();

  return (
    <div className='d-flex'>
      <BootswatchThemeCard
        className='w-25'
        theme={stores.user.currentTheme}
        viewOnly
      />
      <div className='ps-4 d-flex flex-column justify-content-center'>
        <h3 className='m-0 text-dark'>{stores.user.displayName}</h3>
        <p className='m-0 fs-5'>{stores.user.email}</p>
      </div>
    </div>
  );
};

export default observer(UserSettingsMenuUserInfo);
