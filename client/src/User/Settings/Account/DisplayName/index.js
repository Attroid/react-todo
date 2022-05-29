import { Button, Form } from 'react-bootstrap';
import { useStores } from 'shared/store';
import functions from 'shared/utils/functions';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { PersonLinesFill } from 'react-bootstrap-icons';
import SettingListItem from 'shared/components/SettingList/Item';

const UserSettingsAccountDisplayName = () => {
  const stores = useStores();
  const [displayName, setDisplayName] = useState(stores.user.displayName);

  const handleCancel = () => {
    setDisplayName(stores.user.displayName);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (stores.user.displayName !== displayName) {
      const { status } = await functions.updateDisplayName({ displayName });

      if (status === 'error') {
        setDisplayName(stores.user.displayName);
      }
    }
  };

  return (
    <SettingListItem
      startIcon={<PersonLinesFill />}
      title='Display name'
      description='Update your display name'
      endElement={
        <Form
          onSubmit={handleSubmit}
          className='ms-auto d-flex align-items-center'
        >
          <Form.Group className='d-flex'>
            {stores.user.displayName !== displayName && (
              <>
                <Button
                  className='me-1'
                  variant='secondary'
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button className='me-1' type='submit'>
                  Update
                </Button>
              </>
            )}
            <Form.Control
              type='text'
              value={displayName}
              onChange={({ target }) => setDisplayName(target.value)}
            />
          </Form.Group>
        </Form>
      }
    />
  );
};

export default observer(UserSettingsAccountDisplayName);
