import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSnippet, getFile } from "../../actions/snippets";

import DetailCore from "./DetailCore";

import GenericError from "../layout/GenericError";

export class DetailWrap extends Component {
  state = {
    title: "",
    text: "",
    visibility: "PU",
    syntax: ""
  };

  static propTypes = {
    snippet: PropTypes.object.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { title, text, visibility, syntax, syntax_name } = this.state;
    const snippet = { title, text, visibility, syntax, syntax_name };
    this.props.addSnippet(snippet);
  };

  componentDidMount() {
    this.props.getSnippet(this.props.match.params.id);
    if (this.props.match.params.download === "download") {
      this.props.getFile(this.props.match.params.id, this.props.history);
      // require(`codemirror/mode/${syntax_mode}/${syntax_mode}`)};
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // initial
    if (prevProps == undefined) {
      return false;
    }
    // changed?
    if (prevProps.match.params.id != this.props.match.params.id) {
      this.props.getSnippet(this.props.match.params.id);
      // require(`codemirror/mode/${syntax_mode}/${syntax_mode}`)};
    }

    //console.log(prevProps.match.params.download);
    //console.log(this.props.match.params.download);
    if (prevProps.match.params.download != this.props.match.params.download) {
      if (this.props.match.params.download == "download") {
        this.props.getFile(this.props.match.params.id, this.props.history);
        // require(`codemirror/mode/${syntax_mode}/${syntax_mode}`)};
      }
    }
  }

  render() {
    const isSuccessKnown = this.props.isSuccessKnown;
    const isLoading = this.props.isLoading;
    // need to refactor this
    console.log(this.props.isSuccessKnown);

    console.log(this.props.isLoading);
    console.log(this.props.snippet);
    return (
      <>
        {!isSuccessKnown && !isLoading ? (
          <GenericError error_type="from detail wrap" />
        ) : (
          <DetailCore {...this.props} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  snippets: state.snippets.snippets,
  snippet: state.snippets.snippet,
  isSuccessKnown: state.snippets.isSuccessKnown,
  isLoading: state.snippets.isLoading
});

export default connect(
  mapStateToProps,
  {getSnippet, getFile }
)(DetailWrap);
