import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {getOrCreateProfile} from './SignInApi';


const clientId = '520250969211-39m3tjqhlf6nm61emdm65k8nifmbn648.apps.googleusercontent.com';



const SignIn = props => {
  const {user, setUser} = props; 

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
