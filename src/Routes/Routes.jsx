import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from '../Shared/GlobalStyles';
import Home from '../Pages/Home';
import Courses from '../Pages/Courses';
import Professors from '../Pages/CouseProfessors';
import ProfessorTests from '../Pages/ProfessorTests';
import CourseSubjects from '../Pages/CouseSubjects';

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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
