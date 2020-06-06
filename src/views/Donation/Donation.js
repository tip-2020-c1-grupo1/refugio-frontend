import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Divider } from '@material-ui/core';
import { withRouter, Redirect } from "react-router-dom";
import DonationModal from './components/DonationModal';


import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import {getPreference} from './DonationApi'; 
import cogoToast from 'cogo-toast';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    },
    input:{
      width: "40%"
    }
  }));

const Donation = props => {
    const classes = useStyles();

    const [amount, setAmount] = useState('100');
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');



    const handleChange = (event) => {
      setAmount(event.target.value)
    }

    const handleOpen = () => {
      const preference_url = getPreference(amount)
      preference_url.then(successCallback, failCallback)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function successCallback(result) {
      setUrl(result.data);
    } 
    
    function failCallback(error) {
      console.log("Error with Mercadopago " + error);
    }

    if (props.user.email === '') {
      return <Redirect to='/' />
    }

    const onlyNumbersRegex = /^[0-9]*$/;

    const validateAmount = !amount || parseInt(amount) <= 0

    const onChangeWithRegex = (regex, event) => {
      const targetValue = event.target.value
      if (targetValue === '' || regex.test(targetValue) && !targetValue.startsWith(' ')) {
        handleChange(event)
      } 
    }

    const onlyNumbers = (event) => onChangeWithRegex(onlyNumbersRegex, event)

    const triggerToast = () => {
      if(this.props.location.state.status){
        this.props.location.state.status === 'success' ? cogoToast.success('Gracias por tu donación a Refug.io!') : cogoToast.error('Hubo un error en la transacción');
      }
    }

    return (
      <div className={classes.root}>
        {/* {triggerToast()} */}
        <Typography variant='h2'>
          Ingrese el monto que desea donar
          <Divider light/>
          <Input className={classes.input}
            id="standard-adornment-amount"
            value={amount}
            onChange={onlyNumbers}
            error={validateAmount}
            margin='dense'
            placeholder='Por favor ingrese un monto mayor a cero'
            startAdornment={<InputAdornment position="start">(ARS) $</InputAdornment>}
          />
        </Typography>
        <Typography>
          <IconButton disabled>
            <Avatar src={'https://www.mgscreativa.com/images/jamp/page/logo-mercadopago9.png'} />
          </IconButton>
          <Button
            disabled={validateAmount}
            onClick={handleOpen}
            color="primary"
            variant="contained">Donar</Button>
          <DonationModal 
            handleClose={handleClose}
            open={open}
            url={url}/>
        </Typography> 
      </div>
    );
  };
  
export default withRouter(Donation);