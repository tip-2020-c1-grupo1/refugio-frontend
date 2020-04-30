import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import cogoToast from 'cogo-toast';
import { getOrCreateProfile } from 'views/SignIn/SignInApi';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const clientId = '520250969211-39m3tjqhlf6nm61emdm65k8nifmbn648.apps.googleusercontent.com';


const Topbar = props => {
  const { user, setUser, className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const responseGoogle = (response) => {
    getOrCreateProfile(response.profileObj).then(function (response) {
      const responseUser = {
        googleId: response.data.google_id,
        imageUrl: response.data.image_url,
        typeOfProfile: response.data.type_of_profile,
        username: response.data.username,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        email: response.data.email
        // animals: []
      }
      setUser(responseUser);
      
    })
    .catch(function (error) {
      cogoToast.error('Ocurrio un error al intentar ingresar, intente nuevamente', {
        position: 'top-center'
      });
    });
  
    // Make HTTP call to backend to register or check user alredy there
    // save in app state user after successfull
  }
  
  const errorResponseGoogle = (response) => {
    console.log('Error')
    console.log(response);
    cogoToast.error('No pudimos ingresar, intente nuevamente', {
      position: 'top-center'
    });

  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img style={{height: '40px', width: '40px'}}
            alt="Logo"
            src="/images/logos/logo--white.svg"
          />
          <span style={{marginLeft: '10px',
            marginTop: '20px',
            position: 'absolute',
            alignItems: 'center'}}>Refugio App</span>
        </RouterLink>
        <div className={classes.flexGrow} />
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={errorResponseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
