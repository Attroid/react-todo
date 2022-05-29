import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import js from 'shared/utils/javascript';

const UserSettingsLayoutBreadcrumb = () => {
  const location = useLocation();
  const currentSettingsMenu = location.pathname.split('/')[3];

  return (
    <Breadcrumb className='pt-4 fs-3'>
      <Breadcrumb.Item
        active={location.pathname === '/app/settings'}
        linkAs={Link}
        linkProps={{ to: '/app/settings' }}
      >
        Settings
      </Breadcrumb.Item>
      {currentSettingsMenu !== undefined && (
        <Breadcrumb.Item active>
          {js.toCamelCase(currentSettingsMenu)}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default UserSettingsLayoutBreadcrumb;
