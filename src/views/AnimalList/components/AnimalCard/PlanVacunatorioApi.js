import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/timelines/';

function getPlanVacunatorio(animalId) {
  const url = baseUrl + animalId + '/by_animal/';
  return axios.get(url);
}

export default getPlanVacunatorio;