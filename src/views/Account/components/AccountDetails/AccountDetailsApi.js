import axios from 'axios';

const baseUrl = 'http://' + process.env.REACT_APP_API_HOST + '/api/profiles';

function submitAccountDetails(data) {
  const url = baseUrl + '/update_profile/';
  return axios.post(url,data);
}

export {submitAccountDetails};