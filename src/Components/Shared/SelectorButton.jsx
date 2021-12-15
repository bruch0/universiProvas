/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SelectorButton({ path, courseName, type }) {
  return (
    <Button to={`${path}`}>
      <p>{courseName}</p>
      {type ? <p>{type}</p> : ''}
    </Button>
  );
}

export default SelectorButton;

const Button = styled(Link)`
  width: 100%;
  height: 100px;
  padding: 15px 0px;
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
`;
