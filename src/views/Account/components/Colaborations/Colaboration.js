import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ColaborationGrid} from './components';
import cogoToast from 'cogo-toast';
import MDSpinner from 'react-md-spinner';
import {getInitialsColaborations} from './ColaborationApi';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import './Colaboration.css';

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
  root: {
  },
}))(MuiExpansionPanelDetails);

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
    // paddingTop: theme.spacing(3)
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
  container: containerCss,
  center: centerCss
}));

const Colaboration = props => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [expanded, setExpanded] = React.useState('panel1');

  const {user, isLanding, status_request} = props

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
    getInitialsColaborations(status_request,user.email)
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

  const isAvailable = status_request === 'Disponible' 
  const title = isAvailable ? 'Mis colaboraciones activas por confirmar' : 'Mis colaboraciones pasadas';
  
  function showColabs() {
    return (<div className={!isLanding ? classes.root : ''}>

      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <p className='titleText'>{title}</p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ColaborationGrid reloadColabs={searchColaboration} isLanding={isLanding} classes={classes} data={data} user={user} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

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
