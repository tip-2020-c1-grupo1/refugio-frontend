import React from 'react';
import {getInitialsAnimals} from './AnimalsApi';
import './AnimalListContainer.css';
import AnimalList from './AnimalList';

const AnimalListContainer = props => {
  const {user, setUser} = props

  const initialSearch = (searchString, selectedFilters, selectedStateFilter) =>{
    return getInitialsAnimals(searchString, selectedFilters, selectedStateFilter)
  }
  return (
    
    <AnimalList initialSearch={initialSearch} user={user} />
  );
};

export default AnimalListContainer;

