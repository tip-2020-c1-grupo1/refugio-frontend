import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Divider } from '@material-ui/core';
import { withRouter, useHistory, Redirect } from "react-router-dom";
import DonationModal from './components/DonationModal';


import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import {getPreference} from './DonationApi'; 
import cogoToast from 'cogo-toast';

import './Donation.css'

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    },
    input:{
      width: "40%",
      backgroundColor: "white",
      minWidth: "400px"
    }
  }));

const Donation = props => {
    const classes = useStyles();

    const [amount, setAmount] = useState('100');
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let collection_status = params.get('collection_status')
    let history = useHistory();

    useEffect(() => {
      switch(collection_status) {
        case 'approved': 
          cogoToast.success('Gracias por tu donación a Refug.io!', {
            position: 'top-center'
          });
          history.push('/donacion')
          break;
        case 'in_process': 
          cogoToast.warn('Su pago se encuentra pendiente de aprobación', {
            position: 'top-center'
          });
          history.push('/donacion')
          break;
        case 'rejected': 
          cogoToast.error('Hubo un error al procesar el pago. Inténtelo nuevamente', {
            position: 'top-center'
          })
          history.push('/donacion')
          break;
        default:
    }
  });

    
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
      cogoToast.error('Hubo un error al conectarse con MercadoPago', {
        position: 'top-center'
      });
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

    return (
      <div className={classes.root}>
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