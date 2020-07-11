import axios from 'axios';

const url = process.env.REACT_APP_API_HOST + '/api/colaboration/request_colab/';

function submitColaborationRequest(colabId, userEmail) {
  const req = {colab_pk: colabId, email: userEmail}
  console.log(req)
  return axios.post(url, req);
}

export default submitColaborationRequest;