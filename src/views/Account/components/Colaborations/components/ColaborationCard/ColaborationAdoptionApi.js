import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/colaboration/';

function removeColabRequest(colabId, userEmail) {
  const url = baseUrl + colabId + '/remove_colab_for_user/'
  const req = {email: userEmail}
  return axios.post(url, req);
}

export default removeColabRequest;