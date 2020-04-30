import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {getOrCreateProfile} from './SignInApi';


// import { GoogleLogout, GoogleLogin } from '../src/index'
// import GoogleLogin, { GoogleLogout } from '../dist/google-login'
// import FontAwesome from 'react-fontawesome';

const clientId = '520250969211-39m3tjqhlf6nm61emdm65k8nifmbn648.apps.googleusercontent.com';



const SignIn = props => {
  console.log('Props de sign In');
  const {user, setUser} = props; 
  console.log(user);

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
      console.log(responseUser);
      setUser(responseUser);
      
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
