import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../Components/Shared/Loading';
import SmallUniversityDropdown from '../Components/Shared/UniversitySmallDropdown';
import SmallTestFilter from '../Components/Shared/FilterSmallDropdown';
import PeriodSubjects from '../Components/SelectionGroup';
import BottomButtons from '../Components/Shared/BottomButtons';

import { getCourseSubjects } from '../Services/api';
import { getUniversityInfo } from '../Services/storage';

function CourseSubjects() {
  const [periodSubjects, setPeriodSubjects] = useState([]);
  const [filteredPeriodSubjects, setFilteredPeriodSubjects] = useState([]);
  const [filter, setFilter] = useState('');
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = getUniversityInfo();
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !id ||
      !courseId ||
      Boolean(Number(courseId < 1)) ||
      Boolean(Number.isNaN(Number(courseId)))
    ) {
      navigate('/courses');
    } else {
      getCourseSubjects(id, courseId).then((response) => {
        setPeriodSubjects(response.data.subjects);
        setFilteredPeriodSubjects(response.data.subjects);
        setCourseName(response.data.course.toUpperCase());
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <Loading />;

  const filterSubjects = (search) => {
    const filtered = [];
    setFilter(search);

    periodSubjects.forEach((period) => {
      const auxFilter = [];

      period.subjects.forEach((subject) => {
        if (
          subject.name.toLowerCase().startsWith(search.toLowerCase()) ||
          subject.code.toLowerCase().startsWith(search.toLowerCase())
        ) {
          auxFilter.push(subject);
        }
      });

      if (auxFilter.length) {
        filtered.push({ period: period.period, subjects: auxFilter });
      }
    });
    setFilteredPeriodSubjects(filtered);
  };

  return (
    <ProfessorsPage>
      <SmallUniversityDropdown />
      <SmallTestFilter />
      <Title>{courseName}</Title>
      <FilterSearch
        placeholder="Pesquise aqui..."
        value={filter}
        onChange={(e) => filterSubjects(e.target.value)}
      />
      {filter
        ? filteredPeriodSubjects.map((period) => (
            <PeriodSubjects
              info={period}
              key={period.period}
              complement="º semestre"
            />
          ))
        : periodSubjects.map((period) => (
            <PeriodSubjects
              info={period}
              key={period.period}
              complement="º semestre"
            />
          ))}
      <BottomButtons />
    </ProfessorsPage>
  );
}

export default CourseSubjects;

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
