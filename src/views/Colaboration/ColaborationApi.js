import axios from 'axios';

const baseUrl = 'http://' + process.env.REACT_APP_API_HOST + '/api/colaboration/';

function getInitialsColaborations() {
  const url = baseUrl + '?status_request=Disponible';
  return axios.get(url);
}

export {getInitialsColaborations};