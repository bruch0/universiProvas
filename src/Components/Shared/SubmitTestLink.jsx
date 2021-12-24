import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SubmitTestLink() {
  const [horizontalAnimation, setHorizontalAnimation] = useState(false);
  const [display, setDisplay] = useState(false);
  const [color, setColor] = useState(false);

  setTimeout(() => setDisplay(true), 499);
  setTimeout(() => setHorizontalAnimation(true), 500);
  setTimeout(() => setColor(true), 1000);
  return (
    <Button
      disp={display ? 1 : 0}
      horizontalAnimation={horizontalAnimation ? 1 : 0}
      color={color ? 1 : 0}
      to="/tests"
    >
      Quer contribuir? Adicione suas provas!
    </Button>
  );
}

export default SubmitTestLink;

const Button = styled(Link)`
  width: ${(props) => (props.horizontalAnimation ? '240px' : '40px')};
  height: 40px;
  padding: 0px;
  display: flex;
  visibility: ${(props) => (props.horizontalAnimation ? '' : 'hidden')};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #9d6cce;
  border-radius: 7px 7px 0px 0px;
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => (props.color ? 'white' : 'transparent')};
  text-align: center;
  transition: height 0.2s, width 0.3s, left 0.3s, color 0.2s;
  position: absolute;
  bottom: 80px;
  left: ${(props) => (props.horizontalAnimation ? '-200px' : '0px')};
  border-bottom: 1px solid #c3c3c3;
  z-index: 4;
`;
