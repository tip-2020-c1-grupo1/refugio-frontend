import axios from 'axios';

const url = 'http://localhost:8000/api/adoption/request_adoption/';

function submitAdoptionRequest(animalId, userEmail) {
  const req = {animal_pk: animalId, email: userEmail}
  return axios.post(url, req);
}

export default submitAdoptionRequest;