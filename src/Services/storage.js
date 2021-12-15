const storeUniversityInfo = (univesityInfo) => {
  localStorage.setItem('univesityInfo', univesityInfo);
};

const getUnivesityInfo = () => localStorage.getItem('univesityInfo');

const removeUnivesityInfo = () => localStorage.removeItem('univesityInfo');

export { storeUniversityInfo, getUnivesityInfo, removeUnivesityInfo };
