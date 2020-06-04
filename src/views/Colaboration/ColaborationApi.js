import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/colaboration/';

function getInitialsColaborations() {
  const url = baseUrl + '?status_request=Disponible';
  return axios.get(url);
}

export {getInitialsColaborations};