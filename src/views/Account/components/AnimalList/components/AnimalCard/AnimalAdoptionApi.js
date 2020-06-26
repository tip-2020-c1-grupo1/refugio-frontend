import axios from 'axios';

const url = process.env.REACT_APP_API_HOST + '/api/adoption/remove_adoption_for_user/';

function cancelAdoptionRequest(animalId, userEmail) {
  const req = {animal_pk: animalId, email: userEmail}
  return axios.post(url, req);
}

export default cancelAdoptionRequest;