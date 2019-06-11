import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Splash extends Component {
  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <div className="columns is-mobile is-multiline is-centered">
              <div className="column is-one-third" />

              <div className="column" />
            </div>
            <div className="columns is-mobile is-multiline is-centered">
              <div className="column is-one-third">
                <div className="content">
                  <p className="is-size-3">
                    <strong>Coder</strong> is a free code editor and sharing
                    site. With lorem ipsum levels of quality, start writing
                    and sharing your code.
                  </p>
                </div>
                <div className="content">
                  <Link to="/create" className="button is-primary is-large">
                    <span>Start coding</span>
                  </Link>
                </div>
              </div>
              <div className="column ">
                <img
                  className="img-splash"
                  src="/static/frontend/screenshot.png"
                  alt="Logo"
                />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  (null)
)(Splash);
