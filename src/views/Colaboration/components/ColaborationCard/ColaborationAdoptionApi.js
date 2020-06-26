import axios from 'axios';

const url = process.env.REACT_APP_API_HOST + '/api/colaboration/request_colab/';

function submitAdoptionRequest(colabId, userEmail) {
  const req = {colab_pk: colabId, email: userEmail}
  return axios.post(url, req);
}

export default submitAdoptionRequest;