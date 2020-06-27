import React, { useState } from 'react';
import { AnimalsGrid, AnimalsToolbar, AnimalsPagination } from './components';
import cogoToast from 'cogo-toast';
import MDSpinner from 'react-md-spinner';
import {getInitialsAnimals, getAnimalsByPage} from './AnimalsApi';
import './AnimalList.css';

const isLanding = false;
const pageSize = 5; 

const AnimalList = props => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [load, setLoad] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedStateFilter, setSelectedStateFilter] = useState([{ label: 'Disponible', value: 'Disponible' }]);

  const [selectedFilters, setSelectedFilters] = useState([{ label: "Nombre", value: "name" }]);
  const [searchString, setSearchString] = useState('');
  
  const {user, initialSearch} = props;

  React.useEffect(() => {
    initialSearch(searchString, selectedFilters, selectedStateFilter).then(res => {
      saveInformationInState(res);           
    })
    .catch(err => {        
      errorCallback(err);
    })
  }, []);

  const errorCallback = (err) => {
    cogoToast.error(err.message, {
      position: 'top-center',
      
    });
    setData({ results: [] });
    setPages([]);
    console.log(err.message);
  }

  const saveInformationInState = (res) => {
    setData(res.data);
    console.log(res.data);
    const count = res.data.count;
    let numberOfRequiredPages = Math.round(count / pageSize);
    if (count < pageSize) {
      setPages([1]);
      setSelectedPage(1);
    }
    else {
      if (numberOfRequiredPages === count / pageSize) {
        const numberOfArrays = [];
        for (var i = 1; i <= numberOfRequiredPages; i++) {
          numberOfArrays.push(i);
        }
        setPages(numberOfArrays);
      }
      else {
        numberOfRequiredPages += 1;
        const numberOfArrays = [];
        for (var i = 1; i <= numberOfRequiredPages; i++) {
          numberOfArrays.push(i);
        }
        setPages(numberOfArrays);
      }
      let selectedPageElem = 0;
      const isFirstPage = !res.data.previous;
      if (isFirstPage) {
        setSelectedPage(1);
      } else {
        const pageArray = res.data.previous.split('?page=');
        const isSecondPage = pageArray.length === 1;
        if (isSecondPage) {
          selectedPageElem = 2;
        } else {
          selectedPageElem = pageArray[1][0] + 1;
        }
        setSelectedPage(selectedPageElem);
      }      
    }
    setLoad(true); 
  }

  const searchAnimals = () => {
    console.log(props);
    getInitialsAnimals(searchString, selectedFilters, selectedStateFilter)
      .then(res => {
        saveInformationInState(res);           
      })
      .catch(err => {        
        errorCallback(err);
      })    
  }

  const getAnimalsPage = (page) => {
    getAnimalsByPage(page, searchString, selectedFilters, selectedStateFilter)
    .then(res => {
      saveInformationInState(res);           
    })
    .catch(err => {   
      errorCallback(err);
    }) 
  }

  const getPrevPage = (page) => {
    const prevPage = page - 1;
    getAnimalsPage(prevPage);
  }

  const getNextPage = (page) => {
    const nextPage = page + 1;
    getAnimalsPage(nextPage);
  }

  const applySearch = () => {
    searchAnimals();
  }

  if (!load) {
    return (
      <div className='container'>
        <div className='center'>
          <MDSpinner size={88} />
        </div>
      </div>
      );
  }

  return (
    <div className='root'>
      {<AnimalsToolbar
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        selectedStateFilter={selectedStateFilter}
        setSelectedStateFilter={setSelectedStateFilter}
        setSearchString={setSearchString} 
        applySearch={applySearch} /> }

      {data.count === 0 
        ? <p data-testid='emptyResponse'> Por favor intente buscar nuevamente </p>
        : <React.Fragment>
          <AnimalsGrid 
            reload={searchAnimals} 
            isLanding={isLanding} 
            data={data} 
            user={user} />
          <AnimalsPagination  
            getAnimalsPage={getAnimalsPage} 
            getPrevPage={getPrevPage}
            getNextPage={getNextPage}
            previousUrl={data.previous}
            nextUrl={data.next}
            pages={pages}
            selectedPage={selectedPage}
          />
        </React.Fragment>
        
      }
    </div>
  );
};

export default AnimalList;

