import axios from 'axios';
import {map} from 'lodash';

const baseUrl = process.env.REACT_APP_API_HOST + '/api/animals?page=';
/*
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
*/
function getInitialsAnimals(searchString, selectedFilters, selectedStateFilter, user, role) {
  return getAnimalsByPage(1, searchString, selectedFilters, selectedStateFilter, user, role);
}

function getAnimalsByPage(page, searchString, selectedFilters, selectedStateFilter, user, role) {
  let url = baseUrl + page;
  if (searchString !== '') {
    url += '&search=' + searchString;
  }
  if (selectedFilters.length > 0) {
    const filtersApplied = map(selectedFilters, 'value');
    url += '&filter=' + filtersApplied.join('_');
  }
  if (selectedStateFilter.length > 0) {
    const filtersApplied = map(selectedStateFilter, 'value');
    url += '&state=' + filtersApplied.join('_');
  }
  if (role === 'requester'){
    url += '&requester=' + user;
  }else {
    url += '&user=' + user;
  }
  return axios.get(url);
}

export {getInitialsAnimals, getAnimalsByPage};