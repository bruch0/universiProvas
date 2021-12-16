import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function SmallTestFilter() {
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams();

  const filter = location.pathname.split('/').includes('professors')
    ? 'Professores'
    : 'Matérias';

  const choices = [
    { name: 'Professores', path: 'professors' },
    { name: 'Matérias', path: 'subjects' },
  ];

  const handleChoice = (choice) => {
    if (choice.name !== filter) {
      navigate(`/courses/${courseId}/${choice.path}`);
    }
  };

  return (
    <DropdownHolder>
      <Dropdown
        onClick={() => setEnabled(!enabled)}
        onBlur={() => setTimeout(() => setEnabled(false), 100)}
        enabled={enabled ? 1 : 0}
      >
        {filter}
        {enabled ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </Dropdown>
      <DropdownList enabled={enabled ? 1 : 0}>
        {choices.map((choice) => (
          <Item key={choice.path} onClick={() => handleChoice(choice)}>
            {choice.name}
          </Item>
        ))}
      </DropdownList>
    </DropdownHolder>
  );
}

const DropdownHolder = styled.div`
  width: 150px;
  position: absolute;
  top: 85px;
  right: 15px;

  @media (max-width: 600px) {
    width: 150px;
    top: 15px;
    left: 15px;
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
  font-size: 15px;
  font-weight: 700;
  color: #000000;
  cursor: pointer;
  box-shadow: 0px 3px 10px rgb(0 0 0 / 25%);
  font-family: 'Quicksand';

  svg {
    height: 30px;
    width: 30px;
    z-index: 1;
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
  z-index: 1;
  display: ${(props) => (props.enabled ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  border-radius: 0px 0px 10px 10px;
  background-color: #ffffff;
  font-size: 15px;
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

export default SmallTestFilter;
