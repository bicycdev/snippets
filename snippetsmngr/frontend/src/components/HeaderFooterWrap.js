import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import DetailWrap from "./snippets/DetailWrap";

import Create from "./snippets/Create";
import Splash from "./snippets/Splash";
import Trending from "./snippets/Trending";

import Alerts from "./layout/Alerts";
import GenericError from "./layout/GenericError";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";


import HelmetRoute from "./common/HelmetRoute";

const HeaderFooterWrap = () => (
  <>
        <Header />
                <Switch>
                  <HelmetRoute exact path="/" component={Splash} title='Home'/>
                  <HelmetRoute exact path="/create" component={Create} title='Create New'/>
                  <HelmetRoute exact path="/register" component={Register} title='Register'/>
                  <HelmetRoute exact path="/login" component={Login} title='Login' />
                  <HelmetRoute exact path="/trending/:time_period([a-zA-Z]+)" component={Trending} title='Trending'/>
                  <HelmetRoute exact path="/snippets/:id([a-zA-Z0-9]{8})" component={DetailWrap} title='Snippet Detail'/>
                  <Route exact path="/snippets/:id([a-zA-Z0-9]{8})/:download(download)" component={DetailWrap}/>
                  <Route render={(props) => <GenericError error_type={'404'} />}/>
                </Switch>
                <Footer />
     </>
);


export default HeaderFooterWrap;