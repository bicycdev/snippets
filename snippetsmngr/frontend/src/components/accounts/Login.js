import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/create" />;
    }
    const { username, password } = this.state;
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-3">
              <aside className="is-medium menu">
                <h2 className="title">Login</h2>
              </aside>
            </div>
            <div className="column is-9">
              <div className="content is-medium">
                <form onSubmit={this.onSubmit}>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        type="text"
                        className="input "
                        name="username"
                        onChange={this.onChange}
                        value={username}
                        placeholder="Text input"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                  
                    </div>
                   
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        type="password"
                        className="input "
                        name="password"
                        onChange={this.onChange}
                        value={password}
                        placeholder="Text input"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-key" />
                      </span>
                    
                    </div>
                   
                  </div>

                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-link">Login</button>
                    </div>
                    <div className="control" />
                  </div>

                  <div className="field">
                    <div className="control">
                      <p>
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
