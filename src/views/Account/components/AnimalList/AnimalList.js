import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { AnimalsGrid, AnimalsToolbar, AnimalsToolbarWithDefaultValue, AnimalsPagination } from './components';
import cogoToast from 'cogo-toast';
import MDSpinner from 'react-md-spinner';
import {getInitialsAnimals, getAnimalsByPage} from './AnimalsApi';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const containerCss = {
  display: 'flex',
  width: '100%', 
  height: '100vh',
  justifyContent: 'center'
};

const isLanding = false;

const centerCss = {
  alignSelf: 'center'
};

const pageSize = 5;
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
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

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  
}))(MuiExpansionPanelDetails);


const AnimalList = props => {
  
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [expanded, setExpanded] = React.useState('panel1');  

  const [selectedFilters, setSelectedFilters] = useState([{ label: "Nombre", value: "name" }]);
  const [searchString, setSearchString] = useState('');
  
  const {user, role} = props
  const isRequester = role === 'requester';
  const defaltState = isRequester ? [{ label: 'Disponible', value: 'Disponible' }] 
    : [{ label: 'Adoptado', value: 'Adoptado' }]


  const [selectedStateFilter, setSelectedStateFilter] = 
    useState(defaltState);

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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
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
    getInitialsAnimals(searchString, selectedFilters, selectedStateFilter, user.email, role)
      .then(res => {
        saveInformationInState(res);           
      })
      .catch(err => {        
        errorCallback(err);
      })    
  }

  const getAnimalsPage = (page) => {
    getAnimalsByPage(page, searchString, selectedFilters, selectedStateFilter, user.email, role)
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
  const title =  isRequester ? 'Mis solicitudes de adopción' : 'Mis adopciones';
  const message = isRequester ? 'No tiene solicitudes de adopción nuevas' : 'Todavia no realizo adopciones';

  return (
    <div className={classes.root}>

      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <h2>{title}</h2>
        </ExpansionPanelSummary>
        

        <ExpansionPanelDetails>
          {
            !isRequester ? <AnimalsToolbarWithDefaultValue
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              setSearchString={setSearchString} 
              applySearch={applySearch} />
          
            : <AnimalsToolbar
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              selectedStateFilter={selectedStateFilter}
              setSelectedStateFilter={setSelectedStateFilter}
              setSearchString={setSearchString} 
              applySearch={applySearch} /> }
        </ExpansionPanelDetails>

        <ExpansionPanelDetails>
          
          <AnimalsGrid isLanding={isLanding} classes={classes} data={data} user={user} />
        </ExpansionPanelDetails>

        <ExpansionPanelDetails>
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
          />}
        </ExpansionPanelDetails>        
      
      </ExpansionPanel>
    </div>
  );
};

export default AnimalList;

