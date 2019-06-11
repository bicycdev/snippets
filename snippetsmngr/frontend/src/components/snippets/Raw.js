import React, { Component, Fragment,useEffect  } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSnippet, getSnippet } from "../../actions/snippets";
import moment from 'moment'
import { Link } from "react-router-dom";

import {UnControlled as CodeMirror} from 'react-codemirror2'



export class Detail extends Component {
  state = {
    title: "",
    text: "",
    visibility: "PU", 
    syntax: ""
  };

  static propTypes = {
    addSnippet: PropTypes.func.isRequired,
    snippet: PropTypes.object.isRequired
  };



  onChange = e => this.setState({ [e.target.name]: e.target.value });
  

  onCodeMirrorChange = (editor, data, value) => this.setState({ 'text':value });

  onSubmit = e => {
    e.preventDefault();
    const { title, text, visibility, syntax, syntax_name  } = this.state;
    const snippet = { title, text, visibility, syntax, syntax_name };
    this.props.addSnippet(snippet);

  };

  componentDidMount() {
    this.props.getSnippet(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    // initial
   if(prevProps == undefined) {
       return false
   }
   // changed?
   
   if (prevProps.match.params.id != this.props.match.params.id) {
    this.props.getSnippet(this.props.match.params.id); 
    // require(`codemirror/mode/${syntax_mode}/${syntax_mode}`)};
   }

}


  render() {
    const { author, views, url_hash, title, text, visibility, syntax, syntax_name, created_date } = this.props.snippet;
    let {syntax_mode, visibility_display} = this.props.snippet;
    if (visibility_display === 'Public') visibility_display = undefined;
    if (syntax_mode !== 'null' & syntax_mode !== undefined) {console.log(syntax_mode); require(`codemirror/mode/${syntax_mode}/${syntax_mode}`);} 
    return (
<Fragment>

<pre className="pre-reset">{text}</pre>


      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  snippets: state.snippets.snippets,
  snippet: state.snippets.snippet,
});

export default connect(
  mapStateToProps,
  { addSnippet, getSnippet }
)(Detail);
