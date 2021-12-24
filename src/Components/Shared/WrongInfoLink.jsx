import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function WrongInfoLink() {
  const [horizontalAnimation, setHorizontalAnimation] = useState(false);
  const [verticalAnimation, setVerticalAnimation] = useState(false);
  const [color, setColor] = useState(false);

  setTimeout(() => setVerticalAnimation(true), 100);
  setTimeout(() => setHorizontalAnimation(true), 500);
  setTimeout(() => setColor(true), 1000);
  return (
    <Button
      horizontalAnimation={horizontalAnimation ? 1 : 0}
      verticalAnimation={verticalAnimation ? 1 : 0}
      color={color ? 1 : 0}
      to=""
      onClick={() => window.open('https://www.linkedin.com/in/lucas-bruch/')}
    >
      Alguma informação incorreta? Entre em contato!
    </Button>
  );
}

export default WrongInfoLink;

const Button = styled(Link)`
  width: ${(props) => (props.horizontalAnimation ? '240px' : '40px')};
  height: ${(props) => (props.verticalAnimation ? '80px' : '0px')};
  padding-top: ${(props) => (props.horizontalAnimation ? '40px' : '0px')};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #9d6cce;
  border-radius: ${(props) =>
    props.horizontalAnimation ? '7px 7px 0px 7px' : '7px 7px 0px 0px'};
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => (props.color ? 'white' : 'transparent')};
  text-align: center;
  transition: height 0.3s, width 0.3s, left 0.3s, color 0.2s;
  position: absolute;
  bottom: 40px;
  left: ${(props) => (props.horizontalAnimation ? '-200px' : '0px')};
  z-index: 3;
`;
