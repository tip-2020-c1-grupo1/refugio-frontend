import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_HOST + '/api/timelines/';

function getAnimalTimelineApi(animalId) {
  const url = baseUrl + animalId + '/by_animal/';
  return axios.get(url);
}

export default getAnimalTimelineApi;