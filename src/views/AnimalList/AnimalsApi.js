import axios from 'axios';
import {map} from 'lodash';

const baseUrl = 'http://localhost:8000/api/animals?page=';

function getInitialsAnimals(searchString, selectedFilters) {
  return getAnimalsByPage(1, searchString, selectedFilters);
}

function getAnimalsByPage(page, searchString, selectedFilters) {
  let url = baseUrl + page;
  if (searchString !== '') {
    url += '&search=' + searchString;
  }
  if (selectedFilters.length > 0) {
    const filtersApplied = map(selectedFilters, 'value');
    url += '&filter=' + filtersApplied.join('_');
  }
  return axios.get(url);
}

export {getInitialsAnimals, getAnimalsByPage};