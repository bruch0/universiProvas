/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SelectorButton({ path, mainInfo, additionalInfo, hoverInfo }) {
  const [hovering, setHovering] = useState(false);

  return (
    <Button
      onMouseEnter={() => setHovering(hoverInfo !== undefined)}
      onMouseLeave={() => setHovering(hoverInfo === undefined)}
      to={`${path}`}
    >
      {hoverInfo ? (
        <>
          <FrontFace enabled={hovering ? 1 : 0}>
            <p>{mainInfo}</p>
            {additionalInfo ? <p>{additionalInfo}</p> : ''}
          </FrontFace>

          <BackFace enabled={hovering ? 1 : 0}>
            {hoverInfo ? (
              <p>
                {Number(hoverInfo)
                  ? `${hoverInfo} prova${Number(hoverInfo) > 1 ? 's' : ''}`
                  : 'Nenhuma prova'}
              </p>
            ) : (
              ''
            )}
          </BackFace>
        </>
      ) : (
        <>
          <p>{mainInfo}</p>
          {additionalInfo ? <p>{additionalInfo}</p> : ''}
        </>
      )}
    </Button>
  );
}

export default SelectorButton;

const Button = styled(Link)`
  width: 100%;
  height: 100px;
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
`;

const FrontFace = styled.div`
  display: ${(props) => (props.enabled ? 'none' : 'flex')};
`;

const BackFace = styled.div`
  display: ${(props) => (props.enabled ? 'flex' : 'none')};
`;
