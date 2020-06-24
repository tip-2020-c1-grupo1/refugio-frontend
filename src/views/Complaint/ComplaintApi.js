import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_HOST + '/api/complaint/';

function getApprovedComplaints() {
  const url = baseUrl + '?status_request=Disponible';
  return axios.get(url);
}

function makeComplaint(email, description) {
  const data ={
    'email' : email,
    'description': description
  };
  const url = baseUrl + 'make_complaint/';
  return axios.post(url, data);
}

export {getApprovedComplaints, makeComplaint};