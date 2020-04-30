import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  console.log('props en RouteWithLayout');
  console.log(props);

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component setUser={props.setUser} user={props.user} {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
