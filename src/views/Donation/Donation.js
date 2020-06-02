import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Divider } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import DonationModal from './components/DonationModal';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

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

    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('100');

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
      setAmount(event.target.value)
    }

    if (props.user.email === '') {
      return <Redirect to='/' />
    }

    const onlyNumbersRegex = /^[0-9]*$/;

    const onChangeWithRegex = (regex, event) => {
      const targetValue = event.target.value
      if (targetValue === '' || regex.test(targetValue) && !targetValue.startsWith(' ')) {
        handleChange(event)
      } 
    }

    const onlyNumbers = (event) => onChangeWithRegex(onlyNumbersRegex, event)

    return (
      <div className={classes.root}>
        {/* <Button 
            className={classes.button} 
            size="small" 
            variant="contained" 
            onClick={handleOpen}> Podes donar? </Button> */}
        <Typography variant='h2'>
          Ingrese el monto que desea donar
          <Divider light/>
          <Input className={classes.input}
            id="standard-adornment-amount"
            value={amount}
            onChange={onlyNumbers}
            error={!amount || amount === '0'}
            margin='dense'
            placeholder='Por favor ingrese un monto mayor a cero'
            startAdornment={<InputAdornment position="start">(ARS) $</InputAdornment>}
          />
        </Typography>
        <DonationModal 
            handleClose={handleClose}
            open={open}
        />
            <Typography>
            <IconButton disabled>
              <Avatar src={'https://www.mgscreativa.com/images/jamp/page/logo-mercadopago9.png'} />
            </IconButton>
                    <Button
                        disabled={!amount || amount === '0'}
                        color="primary"
                        variant="contained">Donar</Button>
            </Typography> 
      </div>
    );
  };
  
export default Donation;