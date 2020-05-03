import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/profiles';

function submitAccountDetails(data) {
  const url = baseUrl + '/update_profile/';
  return axios.post(url,data);
}

export {submitAccountDetails};