import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  AnimalList as AnimalListView,
  NotFound as NotFoundView,
  Account as AccountView,
  Landing as LandingView,
  Complaint as ComplaintView,
  Colaboration as ColaborationView,
  Donation as DonationView
} from './views';

const isLanding = false; 

const Routes = (props) => {
  return (
    <Switch>
      <RouteWithLayout
        component={LandingView}
        user={props.user}
        setUser={props.setUser}
        exact
        layout={MainLayout}
        path="/"
      />

      <RouteWithLayout
        component={AnimalListView}
        user={props.user}
        setUser={props.setUser}
        exact
        layout={MainLayout}
        path="/animales"
      />

      <RouteWithLayout
        component={AccountView}
        user={props.user}
        setUser={props.setUser}
        exact
        layout={MainLayout}
        path="/perfil"
      />

      <RouteWithLayout
        component={DonationView}
        user={props.user}
        setUser={props.setUser}
        exact
        layout={MainLayout}
        path="/donacion"
      />

      <RouteWithLayout
        component={ComplaintView}
        user={props.user}
        setUser={props.setUser}
        exact
        layout={MainLayout}
        path="/denuncia"
      />

      <RouteWithLayout
        component={ColaborationView}
        user={props.user}
        setUser={props.setUser}
        isLanding={isLanding}
        exact
        layout={MainLayout}
        path="/colaborar"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect
        exact
        from="/donacion/exito"
        to="/donacion"
      />
      <Redirect
        exact
        from="/donacion/pendiente"
        to="/donacion"
      />
      <Redirect
        exact
        from="/donacion/fallo"
        to="/donacion"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
