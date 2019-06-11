import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Footer extends Component {
    static propTypes = {
      auth: PropTypes.object.isRequired,
      logout: PropTypes.func.isRequired
    };
  
    render() {
      const { isAuthenticated, user } = this.props.auth;
      return (
  
        <footer className="footer">
          <section className="section">
            <div className="container">
              <div className="columns is-multiline">
                <div className="column is-half">
                  <article className="notification media has-background-white">
                    <figure className="media-left">
                      <span className="icon">
                        <i className="has-text-warning fas fa-columns fa-lg" />
                      </span>
                    </figure>
                    <div className="media-content">
                      <div className="content">
                        <h1 className="title is-size-4">Sitemap</h1>
                        <p className="is-size-5 subtitle">
                          <a className="is-active">About</a>
                        </p>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="column is-half">
                  <article className="notification has-background-white media">
                    <figure className="media-left">
                      <span className="icon has-text-danger">
                        <i className="fas fa-lg fa-cubes" />
                      </span>
                    </figure>
                    <div className="media-content">
                      <div className="content">
                        <h1 className="title is-size-4">Built with</h1>
                        <p className="is-size-5 subtitle">
                          Django REST, ReactJS and Bulma
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
          <hr />
          <div className="columns is-mobile is-centered">
            <div className="field is-grouped is-grouped-multiline">
              <div className="control">

              </div>
              
              </div>
            </div>
        
        </footer>
      );
    }
  }
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logout }
  )(Footer);
  