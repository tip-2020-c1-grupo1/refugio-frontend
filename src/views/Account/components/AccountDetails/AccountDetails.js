import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import cogoToast from 'cogo-toast';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import {isEmpty} from 'lodash';
import {submitAccountDetails} from './AccountDetailsApi'; 

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, user, setUser, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || ''
  });


  const validateAndSubmit = () => {
    if (isEmpty(values.firstName) || 
    isEmpty(values.lastName) || 
    isEmpty(values.email) ||
    isEmpty(values.phone)) {
      cogoToast.warn('Todos los campos deben tener valores', {
        position: 'top-center'
      });
    } else {
      cogoToast.loading('Salvando tus cambios ...').then(() => {
        submitAccountDetails(values)
          .then(response => {
            cogoToast.success('Ha guardado el cambio en el perfil con exito', {
              position: 'top-center'
            });
            const newUser = {
              googleId: user.googleId,
              imageUrl: user.imageUrl,
              // typeOfProfile: user.typeOfProfile,
              username: user.username,
              firstName: values.firstName,
              lastName: values.lastName,
              email: user.email,
              phone: values.phone
              // animals: []
            }
            setUser(newUser);
          }
        )        
      });
      
    }
  }

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const hasSameValues = () => { return values.firstName === user.firstName && values.lastName === user.lastName && values.phone === user.phone}

  const hasEmptyValues = () => { return !values.firstName || !values.lastName }
  
  const disableSaveButton = hasSameValues() || hasEmptyValues()

  const onlyNumbersRegex = /^\d+$/;

  const onlyLettersRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;


  const onChangeWithRegex = (regex, event) => {
    if (event.target.value === '' || regex.test(event.target.value)) {
      handleChange(event)
   }
  }
  
  const onlyLetters = (event) => onChangeWithRegex(onlyLettersRegex, event)
  
  const onlyNumbers = (event) => onChangeWithRegex(onlyNumbersRegex, event)

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="La información puede ser editada"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Ingrese su nombre aquí"
                label="Nombre"
                margin="dense"
                name="firstName"
                onChange={onlyLetters}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Apellido"
                margin="dense"
                name="lastName"
                onChange={onlyLetters}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                disabled
                fullWidth
                label="Email"
                margin="dense"
                name="email"
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Teléfono"
                margin="dense"
                name="phone"
                onChange={onlyNumbers}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            disabled={disableSaveButton}
            onClick={validateAndSubmit}
            color="primary"
            variant="contained"
          >
            Guardar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
