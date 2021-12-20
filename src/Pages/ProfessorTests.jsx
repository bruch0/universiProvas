import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../Components/Shared/Loading';
import SmallUniversityDropdown from '../Components/Shared/UniversitySmallDropdown';
import SmallTestFilter from '../Components/Shared/FilterSmallDropdown';
import PeriodSubjects from '../Components/SelectionGroup';
import BottomButtons from '../Components/Shared/BottomButtons';

import { getProfessorsTests } from '../Services/api';

function ProfessorTests() {
  const [professorTests, setProfessorTests] = useState([]);
  const [filteredProfessorTests, setFilteredProfessorTests] = useState([]);
  const [filter, setFilter] = useState('');
  const [professorName, setProfessorName] = useState('');
  const [loading, setLoading] = useState(true);
  const { professorId, courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !professorId ||
      Boolean(Number(professorId < 1)) ||
      Boolean(Number.isNaN(Number(professorId)))
    ) {
      navigate(`/courses/${courseId}/professors`);
    } else {
      getProfessorsTests(professorId).then((response) => {
        setProfessorTests(response.data.tests);
        setFilteredProfessorTests(response.data.tests);
        setProfessorName(response.data.professor.toUpperCase());
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <Loading />;

  const filterSubjects = (search) => {
    const filtered = [];
    setFilter(search);

    professorTests.forEach((period) => {
      const auxFilter = [];

      period.tests.forEach((test) => {
        if (test.period.toLowerCase().startsWith(search.toLowerCase())) {
          auxFilter.push(test);
        }
      });

      if (auxFilter.length) {
        filtered.push({ period: period.type, tests: auxFilter });
      }
    });

    setFilteredProfessorTests(filtered);
  };

  return (
    <ProfessorsPage>
      <SmallUniversityDropdown />
      <SmallTestFilter />
      <Title>{professorName}</Title>
      <FilterSearch
        placeholder="Pesquise aqui..."
        value={filter}
        onChange={(e) => filterSubjects(e.target.value)}
      />
      {filter
        ? filteredProfessorTests.map((type) => (
            <PeriodSubjects info={type} key={type.type} complement="" />
          ))
        : professorTests.map((type) => (
            <PeriodSubjects info={type} key={type.type} complement="" />
          ))}
      <BottomButtons />
    </ProfessorsPage>
  );
}

export default ProfessorTests;

const ProfessorsPage = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cecfe5;
  color: white;
`;

const Title = styled.p`
  font-size: 6vw;
  margin: 30px 0px 0px 0px;
  padding: 0px 10%;
  font-weight: 700;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 10vw;
    margin: 20% 0px 0px 0px;
  }

  @media (max-width: 400px) {
    margin-top: 25%;
  }
`;

const FilterSearch = styled.input`
  width: 90%;
  height: 50px;
  padding: 0px 2%;
  margin: 4% 0px 0px 0px;
  font-size: 20px;
  font-family: 'Quicksand';
  border-radius: 15px;
  border: 0px;
`;
