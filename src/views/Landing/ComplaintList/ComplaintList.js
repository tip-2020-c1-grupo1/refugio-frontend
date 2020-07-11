import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from "react-router-dom";
import cogoToast from 'cogo-toast';
import {getApprovedComplaints} from './ComplaintApi';
import {
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import './ComplaintList.css'
import Complaint from './Complaint';


const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    },
    input:{
      backgroundColor: "white",
      minWidth: "400px"
    },
    disabledInput:{
      minWidth: "400px"
    }
  }));

const prepareLongDescription = (elem) => {
  const RawHTML = ({children, className = ""}) => 
  <div className={className} dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />')}} />
  return <RawHTML>{elem}</RawHTML>;
}

const ComplaintList = props => {
  const classes = useStyles();
  const [data, setData] = useState({results : []});

  const { user } = props;

  useEffect(() => {
    console.log('En COMPLAINT LIST');
    getComplaints();
  }, []);

  if (props.user.email === '') {
    return <Redirect to='/' />
  }

  const errorCallback = (err) => {
    cogoToast.error(err.message, {
      position: 'top-center'
    });
  }

  const getComplaints = () => {
    console.log('getApprovedComplaints');
    getApprovedComplaints()
      .then(res => {
        console.log(res);
        setData({results : res.data.results});
      })
      .catch(err => { 
        setData({results : []});    
        errorCallback(err);
      })    
  }

  return (
    <div >
      <Typography variant='h2'>Denuncias</Typography>
      <Divider style={{marginBottom: '20px'}}/>
      {
        data.results.length === 0 
        ? <p style={{marginBottom: '5px'}} > No se encuentran denuncias </p> 
        : data.results.map(elem => (
          elem.description ? 
          <Complaint data={prepareLongDescription(elem.description)} />
          : <React.Fragment />   
        ))
      }
    </div>

    
  );
};
  
export default ComplaintList;