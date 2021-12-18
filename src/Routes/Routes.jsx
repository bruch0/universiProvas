import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from '../Shared/GlobalStyles';
import Home from '../Pages/Home';
import Courses from '../Pages/UniversityCourses';
import Professors from '../Pages/CourseProfessors';
import ProfessorTests from '../Pages/ProfessorTests';
import CourseSubjects from '../Pages/CourseSubjects';
import SubjectTests from '../Pages/SubjectsTests';

function AppRoutes() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId/professors" element={<Professors />} />
        <Route
          path="/courses/:courseId/professors/:professorId"
          element={<ProfessorTests />}
        />
        <Route
          path="/courses/:courseId/subjects"
          element={<CourseSubjects />}
        />
        <Route
          path="/courses/:courseId/subjects/:subjectId"
          element={<SubjectTests />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
