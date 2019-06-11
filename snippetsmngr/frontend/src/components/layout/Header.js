import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="field is-grouped is-pulled-right">
        <div className="control">
          <p className="is-size-5">
            <strong>{user ? `Welcome, ${user.username}` : ""}</strong>
          </p>
        </div>

        <div className="control">
          <a onClick={this.props.logout} className="button is-primary is-large">
            <span className="icon">
              <i className="fas fa-sign-out-alt" />
            </span>
            <span>Logout</span>
          </a>
        </div>
      </div>
    );

    const guestLinks = (
      <div className="field is-grouped is-pulled-right">
        <div className="control">
          <Link to="/login" className="button is-primary is-large">
            <span className="icon">
              <i className="fas fa-sign-in-alt" />
            </span>
            <span>Login</span>
          </Link>
        </div>
        <div className="control">
          <Link to="/register" className="button is-primary is-large">
            <span className="icon">
              <i className="fas fa-user-plus" />
            </span>
            <span>Register</span>
          </Link>
        </div>
      </div>
    );

    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="columns">
            <div className="column is-12">
              <div className="container content">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <Link to="">
                        <h1 className="title is-1">
                          <em>Coder</em>
                        </h1>
                      </Link>
                    </div>
                    <div className="level-item">
                      <i className="is-large fas fa-code" />
                    </div>
                  </div>
                </div>

                <h1 className="title">Code. Create. Share.</h1>

                <h3 className="subtitle">
                  Powerfull code editing and sharing platform 
                </h3>

                <div className="field is-grouped is-pulled-left">
                  <div className="control">
                    <Link to="/create" className="button is-primary is-large">
                      <span className="icon">
                        <i className="fas fa-plus-circle"> </i>
                      </span>
                      <span>Create New</span>
                    </Link>
                  </div>
                  <div className="control">
                    <Link
                      to="/trending/now"
                      className="button is-primary is-large"
                    >
                      <span className="icon">
                        <i className="fas fa-chart-line"> </i>
                      </span>
                      <span>Trending</span>
                    </Link>
                  </div>
                </div>

                {isAuthenticated ? authLinks : guestLinks}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
