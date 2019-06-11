import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        password,
        email
      };
      this.props.register(newUser);
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (



      <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <aside className="is-medium menu">
              <h2 className="title">Register</h2>
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
                      className="input is-success"
                      name="username"
                      onChange={this.onChange}
                      value={username}
                      placeholder="Text input"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </div>
                  <p className="help is-success">This username is available</p>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="email"
                      className="input"
                      name="email"
                      onChange={this.onChange}
                      value={email}
                      placeholder="Text input"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
          
                </div>



                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="password"
                      className="input"
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


                <div className="field">
                  <label className="label">Confirm Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="password"
                      className="input"
                      name="password2"
                      onChange={this.onChange}
                      value={password2}
                      placeholder="Text input"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-key" />
                    </span>
         
                  </div>
              
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link">Register</button>
                  </div>
                  <div className="control" />
                </div>

                <div className="field">
                  <div className="control">
                  <p>
              Already have an account? <Link to="/login">Login</Link>
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
  { register, createMessage }
)(Register);
