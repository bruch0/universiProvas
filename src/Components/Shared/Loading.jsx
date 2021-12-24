import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LoadingIcon } from '../../Assets/loading.svg';

function Loading({ halfOpacity }) {
  return (
    <Load halfOpacity={halfOpacity ? 1 : 0}>
      <LoadIcon />
    </Load>
  );
}

export default Loading;

const Load = styled.main`
  width: 100%;
  height: 100vh;
  opacity: ${(props) => (props.halfOpacity ? '0.5' : '1')}
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cecfe5;
`;

const LoadIcon = styled(LoadingIcon)`
  width: 25%;

  @media (max-width: 600px) {
    width: 50%;
  }
`;
