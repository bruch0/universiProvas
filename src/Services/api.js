import axios from 'axios';

const multiFormConfig = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://universiprovas.herokuapp.com/'
      : 'http://localhost:4000/',
});

const getUniversities = () => api.get('/universities');

const getProfessors = (universityId, courseId) =>
  api.get(`/professors/${universityId}/${courseId}`);

const getProfessorsTests = (professorId) =>
  api.get(`/professors/${professorId}`);

const getCourses = (universityId) => api.get(`/courses/${universityId}`);

const getCourseSubjects = (universityId, courseId) =>
  api.get(`/subjects/${universityId}/${courseId}`);

const getSubjectTests = (universityId, subjectId) =>
  api.get(`/subjects/${universityId}/${subjectId}/tests`);

const getPostTestInfo = (courseId) => api.get(`/tests/${courseId}`);

const uploadTest = (data) => api.post('/tests', data, multiFormConfig);

export {
  getUniversities,
  getCourses,
  getProfessors,
  getProfessorsTests,
  getCourseSubjects,
  getSubjectTests,
  getPostTestInfo,
  uploadTest,
};
