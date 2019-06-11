import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTrends } from "../../actions/snippets";
import moment from "moment";
import { UnControlled as CodeMirror } from "react-codemirror2";

import { Link } from "react-router-dom";
import queryString from "query-string";

export class Trending extends Component {
  state = {
    title: "",
    text: "",
    visibility: "PU",
    syntax: "95",
    sortvalue: "views",
    sortorder: "desc"
  };

  static propTypes = {
    getTrends: PropTypes.func.isRequired
  };

  onSortValueClick = e => {
    this.setState({ sortvalue: e.target.dataset.sortvalue });
    // rather not use e.target.text
    const sortby = `${e.target.dataset.sortvalue}.${this.state.sortorder}`;
  };

  onSortOrderClick = e => {
    this.setState({ sortorder: e.target.dataset.sortorder });
    const sortby = `${this.state.sortvalue}.${e.target.dataset.sortorder}`;
  };


  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    //console.log(values.sort); // "top"
    this.props.getTrends(this.props.match.params.time_period, values.sort);
  }

  componentDidUpdate(prevProps, prevState) {
    // initial
    if (prevProps == undefined) {
      return false;
    }
    // changed?

    if (
      prevProps.match.params.time_period != this.props.match.params.time_period
    ) {
      this.props.getTrends(this.props.match.params.time_period);
    }

    

    //console.log("We have updated"); // "top"
    if (prevProps.location.search != this.props.location.search) {
      const values = queryString.parse(this.props.location.search);
      //console.log(values.sort); // "top"
      this.props.getTrends(this.props.match.params.time_period, values.sort);
    }
  }

  render() {
    const time_period = this.props.match.params.time_period;
    let { sortorder, sortvalue } = this.state;
    // intialize default values hack
    // not done in state to allow for functionality without any queries
    let sort = `${sortvalue}.${sortorder}`;
    //console.log(sortvalue);
    //console.log(this.props.isLoading)

    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-3">
                <aside className="is-medium menu">
                  <h2 className="title">
                    Trending{" "}
                    {this.props.isLoading ? (
                      <i className="fas fa-spinner fa-spin" />
                    ) : (
                      ""
                    )}
                  </h2>
                  <ul className="menu-list">
                    <li>
                      {console.log(this.props.isLoading)}
                      <div className="field is-grouped is-grouped-multiline">
                        <p className="control">
                          <Link
                            to={`./now?sort=${sort}`}
                            className={`button is-text ${
                              time_period === "now" ? "is-active" : ""
                            }`}
                          >
                            now
                          </Link>
                        </p>
                        <p className="control">
                          <Link
                            to={`./week?sort=${sort}`}
                            className={`button is-text ${
                              time_period === "week" ? "is-active" : ""
                            }`}
                          >
                            past week
                          </Link>
                        </p>
                        <p className="control">
                          <Link
                            to={`./month?sort=${sort}`}
                            className={`button is-text ${
                              time_period === "month" ? "is-active" : ""
                            }`}
                          >
                            this month
                          </Link>
                        </p>
                        <p className="control">
                          <a className="button is-text"> all time</a>
                        </p>
                      </div>
                    </li>
                  </ul>
                  <p className="menu-label">Sort</p>
                  <ul className="menu-list">
                    <li>
                      <label className="label"> by </label>
                      <div className="field is-grouped is-grouped-multiline">
                        <p className="control">
                          <Link
                            to={`?sort=title.${sortorder}`}
                            data-sortvalue="title"
                            onClick={this.onSortValueClick}
                            className={`button is-text ${
                              sortvalue === "title" ? "is-active" : ""
                            }`}
                          >
                            title
                          </Link>
                        </p>
                        <p className="control">
                          <Link
                            to={`?sort=date.${sortorder}`}
                            data-sortvalue="date"
                            onClick={this.onSortValueClick}
                            className={`button is-text ${
                              sortvalue === "date" ? "is-active" : ""
                            }`}
                          >
                            date
                          </Link>
                        </p>
                        <p className="control">
                          <Link
                            to={`?sort=language.${sortorder}`}
                            data-sortvalue="language"
                            onClick={this.onSortValueClick}
                            className={`button is-text ${
                              sortvalue === "language" ? "is-active" : ""
                            }`}
                          >
                            language
                          </Link>
                        </p>
                        <p className="control">
                        <Link
                            to={`?sort=views.${sortorder}`}
                            data-sortvalue="views"
                            onClick={this.onSortValueClick}
                            className={`button is-text ${
                              sortvalue === "views" ? "is-active" : ""
                            }`}
                          >
                            views
                          </Link>
                        </p>
                      </div>
                    </li>

                    <li>
                      <label className="label"> order </label>
                      <div className="field is-grouped is-grouped-multiline">
                        <p className="control">
                          <Link
                            to={`?sort=${sortvalue}.asc`}
                            data-sortorder="asc"
                            onClick={this.onSortOrderClick}
                            className={`button is-text ${
                              sortorder === "asc" ? "is-active" : ""
                            }`}
                          >
                            asc
                          </Link>
                        </p>
                        <p className="control">
                        <Link
                            to={`?sort=${sortvalue}.desc`}
                            data-sortorder="desc"
                            onClick={this.onSortOrderClick}
                            className={`button is-text ${
                              sortorder === "desc" ? "is-active" : ""
                            }`}
                          >
                            desc
                          </Link>
                        </p>
                      </div>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className="column is-9">
                <div className="content is-medium">
                  {this.props.snippets.map(snippet => (
                    <div className="box" key={snippet.url_hash}>
                      <div className="level">
                        <div className="level-left">
                          <div className="level-item">
                            <div className="content">
                              <Link
                                to={`/snippets/${snippet.url_hash}`}
                                className=" is-size-4 is-spaced is-link"
                              >
                                {snippet.title}
                              </Link>

                              <p className=" is-size-6">
                                Created by{" "}
                                <strong>
                                  {snippet.author_name ? snippet.author_name : "a Guest User "}{" "}
                                </strong>
                                on{" "}
                                <strong>
                                  {moment(snippet.created_date).format(
                                    "MMM Do YYYY"
                                  )}
                                </strong>{" "}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="level-right">
                          <div className="level-item">
                            <p className="subtitle is-6">
                              <strong>{snippet.views}</strong> views
                            </p>
                          </div>
                          <div className="level-item">
                            <p className="button is-success is-normal is-static">
                              {snippet.syntax_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/*              
                  <div className="box">
                    <div className="level">
                      <div className="level-left">
                        <div className="level-item">
                          <div className="content">
                            <Link to={``} className="">
                              <p className="title is-4 ">Test</p>
                            </Link>
                            <p className="subtitle is-6">
                              Created by <strong> a Guest User </strong>
                              on <strong>May 27 2018</strong>{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="level-right">
                        <div className="level-item">
                          <p className="subtitle is-6">
                            <strong>6</strong> views
                          </p>
                        </div>
                        <div className="level-item">
                          <p className="button is-success is-normal is-static">
                            Python
                          </p>
                        </div>
                                          
          <pre><code className="language-javascript">let i = 0;</code></pre> 
                      </div>
                    </div>
                  </div> */}
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
  snippets: state.snippets.snippets,
  isLoading: state.snippets.isLoading
});

export default connect(
  mapStateToProps,
  { getTrends }
)(Trending);
