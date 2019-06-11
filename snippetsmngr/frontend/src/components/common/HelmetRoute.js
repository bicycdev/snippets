import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Helmet from 'react-helmet'

const HelmetRoute = ({ component: Component, title, ...rest }) => (
  <>
  <Helmet>
  <title>Application - {title}</title>
</Helmet>
  <Route
    {...rest}
    render={props => {
        return <Component {...props} />;
      
    }}
  />
     </>
);


export default HelmetRoute;
