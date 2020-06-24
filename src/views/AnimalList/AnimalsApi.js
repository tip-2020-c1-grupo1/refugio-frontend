import axios from 'axios';
import {map} from 'lodash';

const baseUrl = 'https://' + process.env.REACT_APP_API_HOST + '/api/animals?page=';

function getInitialsAnimals(searchString, selectedFilters, selectedStateFilter) {
  return getAnimalsByPage(1, searchString, selectedFilters, selectedStateFilter);
}

function getAnimalsByPage(page, searchString, selectedFilters, selectedStateFilter) {
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
  return axios.get(url);
}

export {getInitialsAnimals, getAnimalsByPage};