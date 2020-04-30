import axios from 'axios';
import {map} from 'lodash';

const baseUrl = 'http://localhost:8000/api/profiles';

function getOrCreateProfile(data) {
  const url = baseUrl + '/get_or_create_profile/';
  return axios.post(url,data);
}

export {getOrCreateProfile};