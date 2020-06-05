import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ColaborationGrid} from './components';
import cogoToast from 'cogo-toast';
import MDSpinner from 'react-md-spinner';
import {getInitialsColaborations} from './ColaborationApi';

const containerCss = {
  display: 'flex',
  width: '100%', 
  height: '100vh',
  justifyContent: 'center'
};

const centerCss = {
  alignSelf: 'center'
};

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

const Colaboration = props => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  
  const {user, isLanding} = props

  useEffect(() => {
    searchColaboration();
  }, []);

  const errorCallback = (err) => {
    cogoToast.error(err.message, {
      position: 'top-center'
    });
    setData({ results: [] });
    console.log(err.message);
  }

  const saveInformationInState = (res) => {
    setData(res.data);
    setLoad(true); 
  }

  const searchColaboration = () => {
    getInitialsColaborations()
      .then(res => {
        saveInformationInState(res);           
      })
      .catch(err => {        
        errorCallback(err);
      })    
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

  function showColabs() {
    return (<div className={classes.root}>
      <h2>Colaboraciones</h2>
      {data.results.length > 0 ? <h5>Si queres ayudarnos, podes comprometerte con alguna de estas tareas</h5> : <React.Fragment />}
      <ColaborationGrid reloadColabs={searchColaboration} isLanding={isLanding} classes={classes} data={data} user={user} />

    </div>)
  }

  if (data.results.length === 0 && isLanding) {
    
    return <React.Fragment />
  }

  else {
    return showColabs()
  }
};

export default Colaboration;
