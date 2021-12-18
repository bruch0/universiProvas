import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SelectorButton({ path, mainInfo, additionalInfo, hoverInfo, action }) {
  const [hovering, setHovering] = useState(false);

  let hover;

  if (Number(hoverInfo)) {
    hover =
      Number(hoverInfo) > 1
        ? `${hoverInfo} prova${Number(hoverInfo) > 1 ? 's' : ''}`
        : 'Nenhuma prova';
  } else {
    hover = hoverInfo;
  }

  return (
    <Button
      onMouseEnter={() => setHovering(hoverInfo !== undefined)}
      onMouseLeave={() => setHovering(hoverInfo === undefined)}
      to={`${path}`}
      onClick={action}
    >
      {hoverInfo ? (
        <>
          <FrontFace enabled={hovering ? 1 : 0}>
            <p>{mainInfo}</p>
            {additionalInfo ? <p>{additionalInfo}</p> : ''}
          </FrontFace>

          <BackFace enabled={hovering ? 1 : 0}>{hover}</BackFace>
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
  margin-bottom: 30px;
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
  width: 100%;
  height: 100%;
  display: ${(props) => (props.enabled ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: space-around;
`;

const BackFace = styled.div`
  display: ${(props) => (props.enabled ? 'flex' : 'none')};
`;
