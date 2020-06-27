import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Typography, Divider, Button, Box } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import cogoToast from 'cogo-toast';
import {makeComplaint} from './ComplaintApi';
import './Complaint.css'


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

const Complaint = props => {
  const classes = useStyles();
  const [description, setDescription] = useState('');

  const { user } = props;

  console.log(user)

  if (props.user.email === '') {
    return <Redirect to='/' />
  }

  const handleChange = event => {
    const value = event.target.value;
    if(noWhiteSpaceRegex.test(value) || value===''){
      setDescription(value);
    }
  };

  const errorCallback = (err) => {
    cogoToast.error(err.message, {
      position: 'top-center'
    });
    console.log(err.message);
  }

  const sendComplaint = () => {
    makeComplaint(user.email, description)
      .then(res => {
        cogoToast.success('Denuncia enviada con exito', {
          position: 'top-center'
        });        
        setDescription('')  
      })
      .catch(err => {        
        errorCallback(err);
      })    
  }

  const noWhiteSpaceRegex = /[^-\s]/

  const disableButton = !description || description.length < 10

  const helperTextHandler = disableButton && description!='' ? 'La descripción debe tener al menos 10 caracteres' : ''

  const errorHandler = description === '' ? false : disableButton

  const fiveDivider = [...Array(5)].map((e, i) => <Divider light />);

  return (
    <div className={classes.root}>
      <Grid 
        item 
        xs={3}
        md={3}>
      <Typography variant='h4'>
        Email:
      </Typography>
        <TextField 
          value={user.email} 
          disabled 
          className={classes.disabledInput}
          fullWidth
          variant="outlined"/>
      </Grid>
      {fiveDivider}      
      <Grid item >
      <Typography variant='h4'>
          Descripción:
      </Typography>
        <TextField 
          multiline
          className={classes.input}
          error={errorHandler}
          helperText={helperTextHandler}
          value={description}
          onChange={handleChange}
          rows={2}
          rowsMax={10}
          fullWidth
          variant="outlined"/>
      </Grid>
      {fiveDivider}
      <Button 
        onClick={sendComplaint}
        color="primary"
        variant="contained"
        disabled={disableButton}>
          Enviar denuncia
        </Button>
    </div>

    
  );
};
  
export default Complaint;