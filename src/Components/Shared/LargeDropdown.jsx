import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function DropdownInput({ handler, possibleStates, state, name, disabled }) {
  const [enabled, setEnabled] = useState(false);
  const [filteredPossibleStates, setFilteredPossibleStates] = useState([]);
  const [filter, setFilter] = useState('');

  const filterCourses = (search) => {
    setFilter(search);
    setFilteredPossibleStates(
      possibleStates.filter((states) =>
        states.name.toLowerCase().startsWith(search.toLowerCase())
      )
    );
  };

  return (
    <DropdownHolder disabled={disabled || 0}>
      <Dropdown enabled={enabled ? 1 : 0}>
        {enabled ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </Dropdown>
      <DropdownList enabled={enabled ? 1 : 0}>
        {filter
          ? filteredPossibleStates.map((stateChoice) => (
              <Item
                key={stateChoice.name}
                onClick={() => {
                  handler(stateChoice);
                  setFilter('');
                }}
              >
                {stateChoice.name}
              </Item>
            ))
          : possibleStates.map((stateChoice) => (
              <Item key={stateChoice.name} onClick={() => handler(stateChoice)}>
                {stateChoice.name}
              </Item>
            ))}
      </DropdownList>
      <FilterSearch
        placeholder={state || name}
        isSelected={state ? 1 : 0}
        value={filter}
        onChange={(e) => filterCourses(e.target.value)}
        onClick={() => setEnabled(!enabled)}
        onBlur={() => setTimeout(() => setEnabled(false), 100)}
      />
    </DropdownHolder>
  );
}

const DropdownHolder = styled.div`
  width: 40%;
  position: relative;
  margin-bottom: 50px;
  display: ${(props) => (props.disabled ? 'none' : '')};

  @media (max-width: 1000px) {
    width: 70%;
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`;

const Dropdown = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: end;
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
    z-index: 1;
    height: 30px;
    width: 30px;
    pointer-events: none;
  }
`;

const DropdownList = styled.ul`
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  position: absolute;
  top: 50px;
  z-index: 2;
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

const FilterSearch = styled.input`
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0px 50px 0px 10px;
  margin: 0px;
  font-size: 20px;
  font-family: 'Quicksand';
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 15px;
  border: 0px;
  cursor: pointer;

  ::-webkit-input-placeholder {
    color: ${(props) => (props.isSelected ? 'black' : '')};
    font-weight: ${(props) => (props.isSelected ? '500' : '')};
  }

  :-ms-input-placeholder {
    color: ${(props) => (props.isSelected ? 'black' : '')};
    font-weight: ${(props) => (props.isSelected ? '500' : '')};
  }

  ::placeholder {
    color: ${(props) => (props.isSelected ? 'black' : '')};
    font-weight: ${(props) => (props.isSelected ? '500' : '')};
  }
`;

export default DropdownInput;
