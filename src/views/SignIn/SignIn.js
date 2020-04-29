import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {getOrCreateProfile} from './SignInApi';


// import { GoogleLogout, GoogleLogin } from '../src/index'
// import GoogleLogin, { GoogleLogout } from '../dist/google-login'
// import FontAwesome from 'react-fontawesome';

const clientId = '520250969211-39m3tjqhlf6nm61emdm65k8nifmbn648.apps.googleusercontent.com';

const responseGoogle = (response) => {
  console.log('Todo bien')
  console.log(response);
  getOrCreateProfile(response.profileObj).then(function (response) {
    console.log('Todo bien');
    console.log(response);
    localStorage.setItem("googleUser", JSON.stringify(response));
  })
  .catch(function (error) {
    console.log(error);
  });

  // Make HTTP call to backend to register or check user alredy there
  // save in app state user after successfull
}

const errorResponseGoogle = (response) => {
  console.log('Error')
  console.log(response);
}

const SignIn = props => {
  return (
    <GoogleLogin
    clientId={clientId}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={errorResponseGoogle}
    cookiePolicy={'single_host_origin'}
  />)
}

export default withRouter(SignIn);
