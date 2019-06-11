import React, { Component, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead, getLead, getFile } from "../../actions/snippets";
import moment from "moment";
import { Link } from "react-router-dom";

import { UnControlled as CodeMirror } from "react-codemirror2";

const GenericError = props => {
  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-3">
              <aside className="is-medium menu">
                <h2 className="title">
                  Encountered error {` ${props.error_type}`}{" "}
                </h2>
              </aside>
            </div>
            <div className="column is-9">
              <div className="content is-medium" />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default GenericError;
