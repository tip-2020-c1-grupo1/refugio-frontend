import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  AnimalList as AnimalListView,
  NotFound as NotFoundView,
  SignIn,
  Account as AccountView
} from './views';

const Routes = (props) => {
  return (
    <Switch>

      <Redirect
        exact
        from="/"
        to="/animals"
      />


      <RouteWithLayout
        component={SignIn}
        user={props.user}
        setUser={props.setUser}
        exact
        layout={MainLayout}
        path="/signIn"
      />


      <RouteWithLayout
        component={AnimalListView}
        user={props.user}
        setUser={props.setUser}
        exact
        layout={MainLayout}
        path="/animals"
      />

      <RouteWithLayout
        component={AccountView}
        user={props.user}
        setUser={props.setUser}
        exact
        layout={MainLayout}
        path="/account"
      />

      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
