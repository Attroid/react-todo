import { Journals } from 'react-bootstrap-icons';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: undefined,
};

const LogoWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const AppLayoutNavbarLogo = ({ className }) => {
  const navigate = useNavigate();

  return (
    <LogoWrapper
      className={clsx('align-items-center d-flex', className)}
      onClick={() => navigate('/project/all')}
    >
      <Journals className='me-2' />
      <span>
        React<b>Todo</b>
      </span>
    </LogoWrapper>
  );
};

AppLayoutNavbarLogo.propTypes = propTypes;
AppLayoutNavbarLogo.defaultProps = defaultProps;

export default AppLayoutNavbarLogo;
