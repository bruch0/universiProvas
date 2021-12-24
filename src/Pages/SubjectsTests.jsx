import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../Components/Shared/Loading';
import SmallUniversityDropdown from '../Components/Shared/UniversitySmallDropdown';
import SmallTestFilter from '../Components/Shared/FilterSmallDropdown';
import PeriodSubjects from '../Components/SelectionGroup';
import BottomButtons from '../Components/Shared/BottomButtons';

import { getSubjectTests } from '../Services/api';
import { getUniversityInfo } from '../Services/storage';

function SubjectTests() {
  const [subjectTests, setSubjectTests] = useState([]);
  const [filteredSubjectTests, setFilteredSubjectTests] = useState([]);
  const [filter, setFilter] = useState('');
  const [SubjectName, setSubjectName] = useState('');
  const [loading, setLoading] = useState(true);
  const { subjectId, courseId } = useParams();
  const { id } = getUniversityInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !id ||
      !subjectId ||
      Boolean(Number(subjectId < 1)) ||
      Boolean(Number.isNaN(Number(subjectId)))
    ) {
      navigate(`/courses/${courseId}/subjects`);
    } else {
      getSubjectTests(id, subjectId).then((response) => {
        setSubjectTests(response.data.tests);
        setFilteredSubjectTests(response.data.tests);
        setSubjectName(response.data.subject.toUpperCase());
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <Loading />;

  const filterSubjects = (search) => {
    const filtered = [];
    setFilter(search);

    subjectTests.forEach((period) => {
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

    setFilteredSubjectTests(filtered);
  };

  return (
    <ProfessorsPage>
      <SmallUniversityDropdown />
      <SmallTestFilter />
      <Title>{SubjectName}</Title>
      <FilterSearch
        placeholder="Pesquise aqui..."
        value={filter}
        onChange={(e) => filterSubjects(e.target.value)}
      />
      {filter
        ? filteredSubjectTests.map((type) => (
            <PeriodSubjects info={type} key={type.type} complement="" />
          ))
        : subjectTests.map((type) => (
            <PeriodSubjects info={type} key={type.type} complement="" />
          ))}
      <BottomButtons />
    </ProfessorsPage>
  );
}

export default SubjectTests;

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
  padding: 0px 15%;
  font-weight: 700;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 10vw;
    margin: 20% 0px 0px 0px;
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
