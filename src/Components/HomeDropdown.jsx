/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function DropdownInput({
  name,
  handler,
  state,
  possibleStates,
  customWidth = false,
  customHeigth = false,
}) {
  const [enabled, setEnabled] = useState(false);

  return (
    <DropdownHolder customWidth={customWidth}>
      <Dropdown
        customHeigth={customHeigth}
        onClick={() => setEnabled(!enabled)}
        onBlur={() => setTimeout(() => setEnabled(false), 100)}
        enabled={enabled ? 1 : 0}
      >
        {enabled || !state ? name : state}
        {enabled ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </Dropdown>
      <DropdownList enabled={enabled ? 1 : 0}>
        {possibleStates.map((stateChoice) => (
          <Item key={stateChoice.initials} onClick={() => handler(stateChoice)}>
            {stateChoice.initials}
          </Item>
        ))}
      </DropdownList>
    </DropdownHolder>
  );
}

const DropdownHolder = styled.div`
  width: ${(props) => (props.customWidth ? props.customWidth : '20%')};
  position: relative;

  @media (max-width: 600px) {
    width: ${(props) => (props.customWidth ? props.customWidth : '80%')};
  }
`;

const Dropdown = styled.button`
  width: 100%;
  height: ${(props) => (props.customHeigth ? props.customHeigth : '50px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  border: 0px;
  border-radius: ${(props) => (props.enabled ? '10px 10px 0px 0px;' : '10px')};
  background-color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  cursor: pointer;
  box-shadow: 0px 3px 10px rgb(0 0 0 / 25%);

  svg {
    height: 30px;
    width: 30px;
  }
`;

const DropdownList = styled.ul`
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;
  position: absolute;
  top: 50px;
  z-index: 1;
  display: ${(props) => (props.enabled ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  border-radius: 0px 0px 10px 10px;
  background-color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0px 8px 10px rgb(0 0 0 / 25%);

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Item = styled.li`
  width: 100%;
  height: 50px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  cursor: pointer;
  border-top: 2px solid #eaeaea;
`;

export default DropdownInput;
