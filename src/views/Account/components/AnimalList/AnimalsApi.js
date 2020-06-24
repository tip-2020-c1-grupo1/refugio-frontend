import axios from 'axios';
import {map} from 'lodash';

const baseUrl = 'http://' + process.env.REACT_APP_API_HOST + '/api/animals?page=';

function getInitialsAnimals(searchString, user, role) {
  return getAnimalsByPage(1, searchString, user, role);
}

function getAnimalsByPage(page, searchString, user, role) {
  let url = baseUrl + page;
  if (searchString !== '') {
    url += '&search=' + searchString;
  }
  if (role === 'requester'){
    url += '&requester=' + user;
  }else {
    url += '&user=' + user;
  }
  
  return axios.get(url);
}

export {getInitialsAnimals, getAnimalsByPage};