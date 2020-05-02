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

  // El set de state de arriba esta perfecto, pero tiene que haber un save
  // Que haga un post http !!! 
  // Check !!!

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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
