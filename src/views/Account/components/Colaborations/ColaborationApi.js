import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/colaboration/';

function getInitialsColaborations(status_request, user) {
  let url = baseUrl + '?status_request=' + status_request;
  url += '&user_email=' + user;
  return axios.get(url);
}

export {getInitialsColaborations};