import axios from 'axios';

const baseUrl = 'http://' + process.env.REACT_APP_API_HOST + '/api/colaboration/';

function removeColabRequest(colabId, userEmail) {
  const url = baseUrl + colabId + '/remove_colab_for_user/'
  const req = {email: userEmail}
  return axios.post(url, req);
}

export default removeColabRequest;