import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { getUniversities } from '../../Services/api';
import { getUniversityInfo, storeUniversityInfo } from '../../Services/storage';

function SmallUniversityDropdown() {
  const [universities, setUniversities] = useState([]);
  const universityInfo = getUniversityInfo();
  const navigate = useNavigate();

  useEffect(() => {
    getUniversities().then((response) => setUniversities(response.data));
  }, []);

  const handleChoice = (choice) => {
    storeUniversityInfo(JSON.stringify(choice));

    if (window.location.pathname === '/courses') {
      window.location.reload();
    } else {
      navigate('/courses');
    }
  };
  const [enabled, setEnabled] = useState(false);

  return (
    <DropdownHolder>
      <Dropdown
        onClick={() => setEnabled(!enabled)}
        onBlur={() => setTimeout(() => setEnabled(false), 100)}
        enabled={enabled ? 1 : 0}
      >
        {universityInfo.initials}
        {enabled ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </Dropdown>
      <DropdownList enabled={enabled ? 1 : 0}>
        {universities.map((stateChoice) => (
          <Item
            key={stateChoice.initials}
            onClick={() => handleChoice(stateChoice)}
          >
            {stateChoice.initials}
          </Item>
        ))}
      </DropdownList>
    </DropdownHolder>
  );
}

const DropdownHolder = styled.div`
  width: 120px;
  position: absolute;
  top: 15px;
  right: 15px;

  @media (max-width: 600px) {
    width: '80%';
  }
`;

const Dropdown = styled.button`
  width: 100%;
  height: 50px;
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

export default SmallUniversityDropdown;
