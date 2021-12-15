import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DropdownInput from '../../Components/Shared/UniversityDropdown';
import Loading from '../../Components/Shared/Loading';

import { getUniversities } from '../../Services/api';
import { storeUniversityInfo } from '../../Services/storage';

function Home() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUniversities().then((response) => {
      setUniversities(response.data);
      setLoading(false);
    });
  }, []);

  const handleChoice = (choice) => {
    storeUniversityInfo(JSON.stringify(choice));
    navigate('/courses');
  };

  if (loading) return <Loading />;

  return (
    <Homepage>
      <Title>UNIVERSIPROVAS</Title>
      <Disclaimer>
        O site que seu professor não quer que você descubra
      </Disclaimer>
      <Label>Qual sua faculdade?</Label>
      <DropdownInput
        name="Selecione aqui"
        handler={handleChoice}
        state=""
        possibleStates={universities}
      />
    </Homepage>
  );
}

const Homepage = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cecfe5;
  color: white;
`;

const Title = styled.p`
  font-size: 6vw;
  margin-top: 30px;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 10vw;
  }
`;

const Disclaimer = styled.p`
  font-size: 2vw;
  margin-top: 30px;
  font-weight: 500;

  @media (max-width: 600px) {
    font-size: 4vw;
    text-align: center;
  }
`;

const Label = styled.label`
  font-size: 2vw;
  margin: 10% 0px 2% 0px;
  font-weight: 500;

  @media (max-width: 600px) {
    font-size: 6vw;
    margin: 10% 0px 6% 0px;
  }
`;

export default Home;
