import axios from 'axios';

const url = 'http://' + process.env.REACT_APP_API_HOST + '/api/adoption/request_adoption/';

function submitAdoptionRequest(animalId, userEmail) {
  const req = {animal_pk: animalId, email: userEmail}
  return axios.post(url, req);
}

export default submitAdoptionRequest;