import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSnippet, getSyntaxes } from "../../actions/snippets";

import { Controlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/python/python");

export class Create extends Component {
  state = {
    title: "",
    text: "",
    visibility: "PU",
    syntax: "95",
    codeMirrorMode: "python"
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  static propTypes = {
    addSnippet: PropTypes.func.isRequired,
    getSyntaxes: PropTypes.func.isRequired,
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSyntaxChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    const optiontext = e.target.options[
      e.target.selectedIndex
    ].text.toLowerCase();
    const optionmode = e.target.options[e.target.selectedIndex].dataset.mode;
    this.setState({ codeMirrorMode: optionmode });
    //console.log(`codemirror/mode/${optionmode}/${optionmode}`);
    if (optionmode != "null") {
      require(`codemirror/mode/${optionmode}/${optionmode}`);
    }
  };

  onCodeMirrorChange = (editor, data, value) => this.setState({ text: value });

  onSubmit = e => {
    e.preventDefault();
    const { title, text, visibility, syntax } = this.state;
    const snippet = { title, text, visibility, syntax };
    this.props.addSnippet(snippet, this.props.history);
  };

  componentDidMount() {
    this.props.getSyntaxes();
  }

  render() {
    const { title, text, visibility, syntax } = this.state;

    const { isAuthenticated, user } = this.props.auth;

    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-3">
                <aside className="is-medium menu">
                  <h2 className="title">Create New Snippet</h2>

                  <ul className="menu-list">
                    <li>
                      <div className="field">
                        <label className="label">Syntax Highlighting </label>
                        <div className="control has-icons-left">
                          <div className="select">
                            <select
                              form="myform"
                              name="syntax"
                              onChange={this.onSyntaxChange}
                              value={syntax}
                            >
                              {this.props.syntaxes.map(syntax => (
                                <option
                                  key={syntax.id}
                                  value={syntax.id}
                                  data-mode={syntax.mode}
                                >
                                  {syntax.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="icon is-small is-left">
                            <i className="fas fa-globe" />
                          </div>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Expiration</label>
                        <div className="control has-icons-left">
                          <div className="select">
                            <select form="myform" name="expiration">
                              <option defaultValue>Never</option>
                              <option>10 minutes</option>
                              <option>1 day</option>
                            </select>
                          </div>
                          <div className="icon is-small is-left">
                            <i className="fas fa-clock" />
                          </div>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label"> Exposure </label>
                        <div className="control has-icons-left">
                          <div className="select">
                            <select
                              form="myform"
                              name="visibility"
                              onChange={this.onChange}
                            >
                              <option value="PU" defaultValue>
                                Public
                              </option>
                              <option value="UN">Unlisted</option>
                              <option value="PR" disabled={isAuthenticated ? false : true} >
                                Private
                              </option>
                            </select>
                          </div>
                          <div className="icon is-small is-left">
                            <i className="fas fa-user-secret" />
                          </div>
                        </div>
                      </div>

                      <div className="field">
                        <div className="control">
                          <input
                            className="button is-info is-medium "
                            form="myform"
                            type="submit"
                            value="Create"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className="column is-9">
                <div className="content is-medium">
                  <form id="myform" onSubmit={this.onSubmit}>
                    {/*                 <div className="box">

            <article className="message is-primary">
              <span className="icon has-text-primary">
                <i className="fas fa-info-circle"></i>
              </span>
              <div className="message-body">
               Ooops. Please enter a title. Please enter some code.
              </div>
            </article>
            </div> */}
                    <div className="field">
                      <div className="control">
                        <input
                          className="input title is-4"
                          type="text"
                          name="title"
                          onChange={this.onChange}
                          value={title}
                          placeholder="Enter title here... ¯\_(ツ)_/¯"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">


                      <CodeMirror
  value={text}
  options={{
    mode: this.state.codeMirrorMode,
    theme: "material",
    lineNumbers: true,
    lineWrapping: "True"
  }}
  onBeforeChange={(editor, data, value) => {
    this.onCodeMirrorChange(editor, data, value);
  }}
  onChange={(editor, data, value) => {
  }}
/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  syntaxes: state.snippets.syntaxes,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addSnippet, getSyntaxes }
)(Create);
