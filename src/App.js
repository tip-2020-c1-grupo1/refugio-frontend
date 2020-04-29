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

const [googleUser, setGoogleUser] = React.useState('');

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

  render() {

    setGoogleUser(localStorage.getItem('googleUser'))

    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes user={googleUser} />
        </Router>
      </ThemeProvider>
    );
  }
}
