import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Typography, Divider, Button, Box } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import cogoToast from 'cogo-toast';
import {makeComplaint} from './ComplaintApi';


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
    setDescription(value);
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

  const fiveDivider = [...Array(5)].map((e, i) => <Divider light />);
      // return <Box>
      //         <Divider light />
      //         <Divider light />
      //         <Divider light />
      //         <Divider light />
      //         <Divider light />
      //     </Box>

  return (
    <div className={classes.root}>
      <Typography>
        <Grid 
          item 
          xs={3}
          md={3}>
          Email:
          <TextField 
            value={user.email} 
            disabled 
            className={classes.disabledInput}
            fullWidth
            variant="outlined"/>
        </Grid>
      </Typography>
      {fiveDivider}
      <Typography>
        <Grid item >
            Descripción:
            
          <TextField 
            multiline
            className={classes.input}
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
          variant="contained">Enviar denuncia</Button>
      </Typography> 
    </div>

    
  );
};
  
export default Complaint;