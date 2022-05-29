import { Form } from 'react-bootstrap';
import { Translate } from 'react-bootstrap-icons';
import SettingListItem from 'shared/components/SettingList/Item';

const UserSettingsGeneralLanguage = () => (
  <SettingListItem
    startIcon={<Translate />}
    title='Language'
    description='Define app language (No functionality yet)'
    endElement={
      <Form.Group className='d-flex align-items-center ms-auto'>
        <Form.Select>
          <option>English</option>
          <option>Suomi</option>
        </Form.Select>
      </Form.Group>
    }
  />
);

export default UserSettingsGeneralLanguage;
