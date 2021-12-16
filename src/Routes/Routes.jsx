import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from '../Shared/GlobalStyles';
import Home from '../Pages/Home';
import Courses from '../Pages/Courses';
import Professors from '../Pages/UniversityProfessors';

function AppRoutes() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId/professors" element={<Professors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
