import { useId } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CheckBoxWrapper = styled.div`
  position: relative;
  width: 20px;
  height: 20px;

  & label {
    background-color: #e5e6ed;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    left: 0;
    position: absolute;
    top: 0;
    width: 20px;
  }

  & label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: '';
    height: 4px;
    left: 5px;
    opacity: 0;
    position: absolute;
    top: 6px;
    transform: rotate(-45deg);
    width: 8px;
  }

  & input[type='checkbox'] {
    visibility: hidden;
  }

  & input[type='checkbox']:checked + label {
    background-image: linear-gradient(62deg, #a090f8 20%, #6ea4f9 79%);
    border-color: #a090f8;
  }

  & input[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`;

const propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  checked: undefined,
  onChange: () => {},
};

const Checkbox = ({ className, checked, onChange }) => {
  const id = useId();

  const preventDefault = (ev) => {
    ev.preventDefault();
  };

  const handleChange = () => {
    const event = {
      target: {
        value: !checked,
      },
    };

    onChange(event);
  };

  const handleKeyDown = (ev) => {
    if (ev.code !== 'Space') return;
    handleChange();
  };

  return (
    <CheckBoxWrapper className={className}>
      <input
        type='checkbox'
        id={`${id}-checkbox`}
        checked={checked}
        onChange={preventDefault}
      />
      <label
        htmlFor={`${id}-checkbox`}
        tabIndex={0}
        onClick={handleChange}
        onKeyDown={handleKeyDown}
      />
    </CheckBoxWrapper>
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
