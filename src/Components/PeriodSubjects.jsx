import React from 'react';
import styled from 'styled-components';

import SelectorButton from './Shared/SelectorButton';

function PeriodSubjects({ period }) {
  return (
    <Period>
      {`${period.period}º semestre`}
      <UniversityCourses>
        {period.subjects.map((subject) => (
          <SelectorButton
            path="/"
            mainInfo={subject.name}
            additionalInfo={subject.code}
            hoverInfo={subject.totalTests}
            key={subject.code}
          />
        ))}
      </UniversityCourses>
    </Period>
  );
}

export default PeriodSubjects;

const Period = styled.section`
  width: 100%;
  padding: 0px 5%;
  margin-top: 30px;
  font-size: 30px;
  font-weight: 500;
`;

const UniversityCourses = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6%;
  margin-top: 2%;
  padding: 0px 5%;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
