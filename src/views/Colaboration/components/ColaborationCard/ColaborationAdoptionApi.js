import axios from 'axios';

const url = 'http://localhost:8000/api/colaboration/request_colab/';

function submitAdoptionRequest(colabId, userEmail) {
  const req = {colab_pk: colabId, email: userEmail}
  return axios.post(url, req);
}

export default submitAdoptionRequest;