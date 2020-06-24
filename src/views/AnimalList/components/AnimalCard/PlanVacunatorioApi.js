import axios from 'axios';

const baseUrl = 'http://' + process.env.REACT_APP_API_HOST + '/api/timelines/';

function getPlanVacunatorio(animalId) {
  const url = baseUrl + animalId + '/by_animal/';
  return axios.get(url);
}

export default getPlanVacunatorio;