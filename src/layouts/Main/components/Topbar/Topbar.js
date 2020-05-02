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
import './Topbar.css';
import { white } from 'color-name';

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
        email: response.data.email,
        phone: response.data.phone
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
    console.log(response);
    cogoToast.error('No pudimos ingresar, intente nuevamente', {
      position: 'top-center'
    });

  }

  const responseGoogleLogout = () => {
    const responseUser = {
      googleId: '',
      imageUrl: '',
      typeOfProfile: '',
      username: '',
      firstName: '',
      lastName: '',
      email: ''
    }
    setUser(responseUser);
  }

  function googleLoginHandler(){
    if(user.googleId){
      return <GoogleLogout
        className='signOutGoogleButton'
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={responseGoogleLogout}
      />
    }
    return <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          className='signInGoogleButton'
          onSuccess={responseGoogle}
          onFailure={errorResponseGoogle}
          cookiePolicy={'single_host_origin'}
        />
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img style={{
            height: '40px',
            color: 'white',
            width: '40px'}}
            alt="Logo"
            src="/images/logos/logo--white.svg"
          />
          <span className='refugioAppTitle'>Refugio App</span>
        </RouterLink>
        <div className={classes.flexGrow} />
        
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {googleLoginHandler()}
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
