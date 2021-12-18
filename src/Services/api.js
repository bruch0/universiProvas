import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000/',
});

const getUniversities = () => api.get('/universities');

const getProfessors = (universityId, courseId) =>
  api.get(`/professors/${universityId}/${courseId}`);

const getProfessorsTests = (professorId) =>
  api.get(`/professors/${professorId}`);

const getCourses = (universityId) => api.get(`/courses/${universityId}`);

const getCouseSubject = (universityId, courseId) =>
  api.get(`/subjects/${universityId}/${courseId}`);

export {
  getUniversities,
  getProfessors,
  getProfessorsTests,
  getCourses,
  getCouseSubject,
};
