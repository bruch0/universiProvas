import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../Components/Shared/Loading';
import SmallUniversityDropdown from '../Components/Shared/UniversitySmallDropdown';
import SmallTestFilter from '../Components/Shared/FilterSmallDropdown';
import SelectorButton from '../Components/Shared/SelectorButton';

import { getProfessors } from '../Services/api';
import { getUniversityInfo } from '../Services/storage';

function Professors() {
  const [professors, setProfessors] = useState([]);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [filter, setFilter] = useState('');
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = getUniversityInfo();
  const { courseId } = useParams();

  useEffect(() => {
    getProfessors(id, courseId).then((response) => {
      setProfessors(response.data.professors);
      setFilteredProfessors(response.data.professors);
      setCourseName(response.data.course.toUpperCase());
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  const filterCourses = (search) => {
    setFilter(search);
    setFilteredProfessors(
      professors.filter((professor) =>
        professor.name.toLowerCase().startsWith(search.toLowerCase())
      )
    );
  };

  return (
    <ProfessorsPage>
      <SmallUniversityDropdown />
      <SmallTestFilter />
      <Title>{courseName}</Title>
      <FilterSearch
        placeholder="Pesquise aqui..."
        value={filter}
        onChange={(e) => filterCourses(e.target.value)}
      />
      <UniversityCourses>
        {filter
          ? filteredProfessors.map((course) => (
              <SelectorButton
                path={`${course.id}/professors`}
                mainInfo={course.name}
                additionalInfo={course.type}
                key={course.id}
                hoverInfo={course.totalTests}
              />
            ))
          : professors.map((course) => (
              <SelectorButton
                path={`${course.id}/professors`}
                mainInfo={course.name}
                additionalInfo={course.type}
                key={course.id}
                hoverInfo={course.totalTests}
              />
            ))}
      </UniversityCourses>
    </ProfessorsPage>
  );
}

export default Professors;

const ProfessorsPage = styled.main`
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
  margin: 30px 0px 0px 0px;
  padding: 0px 10%;
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

const UniversityCourses = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6%;
  margin-top: 5%;
  padding: 0px 5%;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
