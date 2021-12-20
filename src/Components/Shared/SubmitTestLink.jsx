import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SubmitTestLink() {
  return <Button to="/tests">Quer contribuir? Adicione suas provas!</Button>;
}

export default SubmitTestLink;

const Button = styled(Link)`
  width: 250px;
  height: 80px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #b28adb;
  border-radius: 7px;
  box-shadow: 0px 5px 5px rgba(171, 63, 188, 0.25);
  font-weight: 500;
  font-size: 18px;
  color: white;
  text-align: center;
  position: absolute;
  top: 105px;
  left: 15px;
  z-index: 3;

  @media (max-width: 600px) {
    width: 45%;
    height: 50px;
    font-size: 14px;
    left: unset;
    top: unset;
    bottom: 15px;
    right: 15px;
  }

  @media (max-width: 400px) {
    right: 10px;
  }
`;
