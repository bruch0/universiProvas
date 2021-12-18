const storeUniversityInfo = (univesityInfo) => {
  localStorage.setItem('univesityInfo', univesityInfo);
};

const getUniversityInfo = () =>
  JSON.parse(localStorage.getItem('univesityInfo'));

const removeUniversityInfo = () => localStorage.removeItem('univesityInfo');

export { storeUniversityInfo, getUniversityInfo, removeUniversityInfo };
