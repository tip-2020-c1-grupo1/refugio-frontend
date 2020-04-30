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

const browserHistory = createBrowserHistory();

validate.validators = {
  ...validate.validators,
  ...validators
};

// const user = {
//   name: 'Example User2',
//   city: 'Los Angeles',
//   country: 'USA',
//   timezone: 'GTM-7',
//   avatar: '/images/avatars/avatar_11.png'
// };



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
        // animals: []
      }
    };
    this.setUser = this.setUser.bind(this);
    this.fromLocalStorage = this.fromLocalStorage.bind(this);
    this.setUserInfoFromLocalStorage = this.setUserInfoFromLocalStorage.bind(this);
    this.checkCredentials = this.checkCredentials.bind(this);
  }

  componentDidMount() {
    this.checkCredentials()
  }

  setUser(user) {
    this.setState({user});
  }

  setUserInfoFromLocalStorage() {

    const user = {
      googleId: this.fromLocalStorage('googleId'),
      imageUrl: this.fromLocalStorage('imageUrl'),
      // typeOfProfile: '',
      username: this.fromLocalStorage('username'),
      firstName: this.fromLocalStorage('firstName'),
      lastName: this.fromLocalStorage('lastName'),
      email: this.fromLocalStorage('email'),
      // animals: []
    }

    this.setUser(user);
  }

  fromLocalStorage(stringProperty) {
    return window.localStorage.getItem(stringProperty);
  }

  checkCredentials() {
    const googleIdLocalStorage = this.fromLocalStorage('googleId');
    const emailLocalStorage = this.fromLocalStorage('email');
    const imageUrl = this.state.imageUrl;
    const googleId = this.state.googleId;
    const email = this.state.email;

    const basicUserInfoInLocalStorage = emailLocalStorage && googleIdLocalStorage;
    const basicUserInfoInState = email !== '' && imageUrl !== '' && googleId !== '';
    
    if (!basicUserInfoInLocalStorage && !basicUserInfoInState){
      /* 
      redirect to sign In , remembering that signIn will call the sso service and
      use setUser function
      */
      console.log('FALTA QUE ME SETEEN LAS CREDENCIALES');
    } else {
      if (!basicUserInfoInState) {
        this.setUserInfoFromLocalStorage();
      } else {
        // La tengo en el state y no en localstorage ...
      }
      
    }
  }

  render() {


    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes user={this.state.user} />
        </Router>
      </ThemeProvider>
    );
  }
}
