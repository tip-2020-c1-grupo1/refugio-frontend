import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AnimalCard, AnimalsToolbar, AnimalsPagination } from './components';
import cogoToast from 'cogo-toast';
import MDSpinner from 'react-md-spinner';
import {getInitialsAnimals, getAnimalsByPage} from './AnimalsApi';

const containerCss = {
  display: 'flex',
  width: '100%', 
  height: '100vh',
  justifyContent: 'center'
};

const centerCss = {
  alignSelf: 'center'
};

const pageSize = 5;
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  nonSelectedPage: {
    padding: '5px'
  },
  selectedPage: {
    padding: '5px',
    borderRadius: '15px',
    border: 'solid lightblue'
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  typographyClass: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  container: containerCss,
  center: centerCss
}));

const AnimalList = props => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [load, setLoad] = useState(false);  
  const [selectedFilters, setSelectedFilters] = useState([{ label: "Nombre", value: "name" }]);
  const [searchString, setSearchString] = useState('');
  
  const {user} = props

  useEffect(() => {
    searchAnimals();
  }, []);

  const errorCallback = (err) => {
    cogoToast.error(err.message, {
      position: 'top-center'
    });
    setData({ results: [] });
    setPages([]);
    console.log(err.message);
  }

  const saveInformationInState = (res) => {
    setData(res.data);
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
    getInitialsAnimals(searchString, selectedFilters)
      .then(res => {
        saveInformationInState(res);           
      })
      .catch(err => {        
        errorCallback(err);
      })    
  }

  const getAnimalsPage = (page) => {
    getAnimalsByPage(page, searchString, selectedFilters)
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
      <div className={classes.container}>
        <div className={classes.center}>
          <MDSpinner size={88} />
        </div>
      </div>
      );
  }

  return (
    <div className={classes.root}>
      {<AnimalsToolbar
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        setSearchString={setSearchString} 
        applySearch={applySearch} /> }

      
      <div className={classes.content}>
        {data.count === 0 
        ? <h2> No hay mascotas que coincidan con tu busqueda </h2>
        
        : <Grid
          container
          spacing={3}
        >
          {data.results.map(animal => (
            <Grid
              item
              key={animal.id}
              lg={4}
              md={6}
              xs={12}
            >
              <AnimalCard animal={animal} user={user}/>
            </Grid>
          ))}
        </Grid> }
      </div>

      {data.count === 0 
        ? <h2> Por favor intente buscar nuevamente </h2>
        : <AnimalsPagination 
          classes={classes}  
          getAnimalsPage={getAnimalsPage} 
          getPrevPage={getPrevPage}
          getNextPage={getNextPage}
          previousUrl={data.previous}
          nextUrl={data.next}
          pages={pages}
          selectedPage={selectedPage}
        />
      }
    </div>
  );
};

export default AnimalList;
