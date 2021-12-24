import React, { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import styled from 'styled-components';

import WrongInfoLink from './WrongInfoLink';
import SubmitTestLink from './SubmitTestLink';

function BottomButtons() {
  const [enabled, setEnabled] = useState(false);
  const isMobile =
    !!navigator.userAgent.match(/iphone|android|blackberry/gi) || false;

  return (
    <BottomButton
      onMouseEnter={!isMobile ? () => setEnabled(true) : () => {}}
      onMouseLeave={() => setEnabled(false)}
      onClick={isMobile ? () => setEnabled(true) : () => {}}
      onBlur={isMobile ? () => setEnabled(false) : () => {}}
    >
      <IoIosArrowUp />
      {enabled ? (
        <>
          <SubmitTestLink />
          <WrongInfoLink />
        </>
      ) : (
        ''
      )}
    </BottomButton>
  );
}

export default BottomButtons;

const BottomButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: white;
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 1;
  cursor: pointer;
  transition: all 0.5s;

  svg {
    transition: all 0.5s;
    width: 70%;
    height: 70%;
    color: black;
  }

  :hover {
    background-color: #9d6cce;
    border-radius: 0px 0px 20px 20px;

    svg {
      transform: rotateX(180deg);
    }
  }
`;
