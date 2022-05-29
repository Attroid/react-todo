import { Card } from 'react-bootstrap';
import clsx from 'clsx';

const BootswatchThemeCard = ({
  theme = null,
  onClick = () => {},
  active = false,
  viewOnly = false,
  className = null,
  style,
}) => {
  const handleClick = (event) => {
    if (active || (event.key && event.key !== 'Enter')) {
      return;
    }

    onClick();
  };

  const btnProps = {
    role: active ? null : 'button',
    'aria-disabled': active,
    tabIndex: 0,
    onKeyDown: handleClick,
    onClick: handleClick,
  };

  return (
    <Card
      className={clsx({ 'bg-dark': active }, className)}
      style={style}
      {...(viewOnly ? {} : btnProps)}
    >
      <Card.Img
        src={`https://bootswatch.com/${theme}/thumbnail.png`}
        alt='Bootswatch theme thumbnail'
      />
    </Card>
  );
};

export default BootswatchThemeCard;
