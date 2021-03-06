import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

import 'react-image-gallery/styles/css/image-gallery.css';


const browserHistory = createBrowserHistory();

validate.validators = {
  ...validate.validators,
  ...validators
};


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user : {
        googleId: '',
        imageUrl: '',
        // typeOfProfile: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
        // animals: []
      }
    };
    this.setUser = this.setUser.bind(this);
    this.fromLocalStorage = this.fromLocalStorage.bind(this);
    this.setUserInfoFromLocalStorage = this.setUserInfoFromLocalStorage.bind(this);
    this.checkCredentials = this.checkCredentials.bind(this);
    this.toStorage = this.toStorage.bind(this);
    this.setUserInfoToLocalStorage = this.setUserInfoToLocalStorage.bind(this);
    this.existsInLocalStorage = this.existsInLocalStorage.bind(this);
  }

  componentDidMount() {
    this.checkCredentials()
  }

  setUser(user, callback) {
    console.log(user);
    this.setState({user}, 
      () => {
        this.setUserInfoToLocalStorage();
        if (callback) {
          callback();
        }
        
      }
    );
  }

  setUserInfoToLocalStorage() {
    const array = [
      'googleId',
      'imageUrl',
      'typeOfProfile',
      'username',
      'firstName',
      'lastName',
      'email',
      'phone'  
    ];
    const self = this;
    array.forEach(element => {
      self.toStorage(element);
    });
  }

  setUserInfoFromLocalStorage() {

    const user = {
      googleId: this.fromLocalStorage('googleId'),
      imageUrl: this.fromLocalStorage('imageUrl'),
      typeOfProfile: this.fromLocalStorage('typeOfProfile'),
      username: this.fromLocalStorage('username'),
      firstName: this.fromLocalStorage('firstName'),
      lastName: this.fromLocalStorage('lastName'),
      email: this.fromLocalStorage('email'),
      phone: this.fromLocalStorage('phone')
      // animals: []
    }

    this.setState({user});
  }

  toStorage(stringProperty) {
    const value = this.state.user[stringProperty];
    return window.localStorage.setItem(stringProperty, value);
  }

  fromLocalStorage(stringProperty) {
    return window.localStorage.getItem(stringProperty);
  }

  existsInLocalStorage(stringProperty) {
    const value = this.fromLocalStorage(stringProperty);
    return value !== undefined && value !== null;
  }

  checkCredentials() {
    const hasGoogleIdLocalStorage = this.existsInLocalStorage('googleId');
    const hasEmailLocalStorage = this.existsInLocalStorage('email');
    const hasImageUrl = this.state.user.imageUrl.length !== 0;
    const hasGoogleId = this.state.user.googleId.length !== 0;
    const hasEmail = this.state.user.email.length !== 0;

    const hasBasicUserInfoInLocalStorage = hasEmailLocalStorage && hasGoogleIdLocalStorage;
    const hasBasicUserInfoInState = hasEmail && hasImageUrl && hasGoogleId;
    
    if (!hasBasicUserInfoInState) {
      this.setUserInfoFromLocalStorage();
    } else {
      if (!hasBasicUserInfoInLocalStorage) {
        // La tengo en el state y no en localstorage ...
        this.setUserInfoToLocalStorage();
      }     
    }   
  }

  render() {


    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes setUser={this.setUser} user={this.state.user} />
        </Router>
      </ThemeProvider>
    );
  }
}
