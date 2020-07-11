import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_HOST + '/api/complaint/';

function getApprovedComplaints() {
  const url = baseUrl + '?status_request=Aceptado';
  return axios.get(url);
}


export {getApprovedComplaints};