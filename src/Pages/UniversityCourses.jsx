import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BottomButtons from '../Components/Shared/BottomButtons';

import Loading from '../Components/Shared/Loading';
import SmallUniversityDropdown from '../Components/Shared/UniversitySmallDropdown';
import SelectorButton from '../Components/Shared/SelectorButton';

import { getCourses } from '../Services/api';
import { getUniversityInfo } from '../Services/storage';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = getUniversityInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || Boolean(Number(id < 1)) || Boolean(Number.isNaN(Number(id)))) {
      navigate(`/`);
    } else {
      getCourses(id).then((response) => {
        setCourses(response.data);
        setFilteredCourses(response.data);
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <Loading />;

  const filterCourses = (search) => {
    setFilter(search);
    setFilteredCourses(
      courses.filter((course) =>
        course.name.toLowerCase().startsWith(search.toLowerCase())
      )
    );
  };

  return (
    <CoursePage>
      <SmallUniversityDropdown />
      <Title>CURSOS</Title>
      <FilterSearch
        placeholder="Pesquise aqui..."
        value={filter}
        onChange={(e) => filterCourses(e.target.value)}
      />
      <UniversityCourses>
        {filter
          ? filteredCourses.map((course) => (
              <SelectorButton
                path={`${course.id}/professors`}
                mainInfo={course.name}
                additionalInfo={course.type}
                key={course.id}
              />
            ))
          : courses.map((course) => (
              <SelectorButton
                path={`${course.id}/professors`}
                mainInfo={course.name}
                additionalInfo={course.type}
                key={course.id}
              />
            ))}
      </UniversityCourses>
      <BottomButtons />
    </CoursePage>
  );
}

const CoursePage = styled.main`
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
  font-weight: 700;

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

const UniversityCourses = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0% 6%;
  margin-top: 5%;
  padding: 0px 5%;

  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 350px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0%;
  }
`;

export default Courses;
