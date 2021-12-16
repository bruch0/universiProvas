import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { getUniversities } from '../../Services/api';
import { getUniversityInfo, storeUniversityInfo } from '../../Services/storage';

function SmallUniversityDropdown() {
  const [universities, setUniversities] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [filter, setFilter] = useState('');
  const universityInfo = getUniversityInfo();
  const navigate = useNavigate();

  useEffect(() => {
    getUniversities().then((response) => setUniversities(response.data));
  }, []);

  const handleChoice = (choice) => {
    storeUniversityInfo(JSON.stringify(choice));

    if (
      window.location.pathname === '/courses' &&
      choice.initials !== universityInfo.initials
    ) {
      window.location.reload();
    } else if (choice.initials !== universityInfo.initials) {
      navigate('/courses');
    } else {
      setFilter('');
    }
  };

  const filterCourses = (search) => {
    setFilter(search);
    setFilteredUniversities(
      universities.filter((states) =>
        states.initials.toLowerCase().startsWith(search.toLowerCase())
      )
    );
  };

  return (
    <DropdownHolder>
      <Dropdown enabled={enabled ? 1 : 0}>
        {enabled ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </Dropdown>
      <DropdownList enabled={enabled ? 1 : 0}>
        {filter
          ? filteredUniversities.map((stateChoice) => (
              <Item
                key={stateChoice.initials}
                onClick={() => handleChoice(stateChoice)}
              >
                {stateChoice.initials}
              </Item>
            ))
          : universities.map((stateChoice) => (
              <Item
                key={stateChoice.initials}
                onClick={() => handleChoice(stateChoice)}
              >
                {stateChoice.initials}
              </Item>
            ))}
      </DropdownList>
      <FilterSearch
        placeholder={universityInfo.initials}
        value={filter}
        onChange={(e) => filterCourses(e.target.value)}
        onClick={() => setEnabled(!enabled)}
        onBlur={() => setTimeout(() => setEnabled(false), 100)}
      />
    </DropdownHolder>
  );
}

const DropdownHolder = styled.div`
  width: 150px;
  position: absolute;
  top: 15px;
  right: 15px;

  @media (max-width: 600px) {
    width: 150px;
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
    height: 30px;
    width: 30px;
    z-index: 2;
    pointer-events: none;
  }

  @media (max-width: 600px) {
    font-size: 15px;

    svg {
      height: 15px;
      width: 15px;
    }
  }
`;

const DropdownList = styled.ul`
  width: 100%;
  max-height: 150px;
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
  font-size: 18px;
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

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const FilterSearch = styled.input`
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0px 50px 0px 10px;
  margin: 0px;
  font-size: 15px;
  font-family: 'Quicksand';
  border-radius: 15px;
  border: 0px;
  cursor: pointer;
  color: #000000;
  font-weight: 700;

  ::-webkit-input-placeholder {
    color: #000000;
    font-weight: 700;
  }

  :-ms-input-placeholder {
    color: #000000;
    font-weight: 700;
  }

  ::placeholder {
    color: #000000;
    font-weight: 700;
  }
`;

export default SmallUniversityDropdown;
