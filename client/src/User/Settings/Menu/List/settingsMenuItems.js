import { Person, Gear, Window } from 'react-bootstrap-icons';

const settingsMenuItems = [
  {
    id: 1,
    icon: <Person />,
    title: 'Account',
    description: 'Display name, password, email, delete account, logout',
    to: '/app/settings/account',
  },
  {
    id: 2,
    icon: <Gear />,
    title: 'General',
    description: 'Language',
    to: '/app/settings/general',
  },
  {
    id: 3,
    icon: <Window />,
    title: 'Personalization',
    description: 'Theme',
    to: '/app/settings/personalization',
  },
];

export default settingsMenuItems;
