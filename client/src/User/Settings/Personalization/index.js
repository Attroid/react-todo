import { Row, Col, ListGroup } from 'react-bootstrap';
import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import functions from 'shared/utils/functions';
import Credits from './Credits';
import BootswatchThemeCard from 'shared/components/BootswatchThemeCard';

const UserSettingsPersonalization = () => {
  const stores = useStores();

  const currentTheme = stores.user.currentTheme;

  const selectTheme = (theme) => {
    functions.updateTheme({ theme });
  };

  return (
    <ListGroup>
      <ListGroup.Item className='bg-primary pt-3 ps-4 text-white'>
        <h5>Current theme</h5>
        <p>Choose theme to give your desktop more personality</p>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          {stores.user.supportedThemes.map((theme) => (
            <Col key={theme} lg={6} xl={4} xxl={3} className='p-3'>
              <BootswatchThemeCard
                theme={theme}
                active={theme === currentTheme}
                onClick={() => selectTheme(theme)}
              />
            </Col>
          ))}
        </Row>
      </ListGroup.Item>
      <Credits />
    </ListGroup>
  );
};

export default observer(UserSettingsPersonalization);
