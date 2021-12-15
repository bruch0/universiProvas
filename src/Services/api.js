import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000/',
});

const getUniversities = () => api.get('/universities');

const getProfessors = (universityId) => api.get(`/professors/${universityId}`);

export { getUniversities, getProfessors };
