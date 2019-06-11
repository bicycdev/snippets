import React, { Component, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSnippet, getSnippet, getFile } from "../../actions/snippets";
import moment from "moment";
import { Link } from "react-router-dom";

import { Controlled as CodeMirror } from "react-codemirror2";

const DetailCore = props => {
  const {
    author_name,
    views,
    url_hash,
    title,
    text,
    visibility,
    syntax,
    syntax_name,
    created_date
  } = props.snippet;
  let { syntax_mode, visibility_display } = props.snippet;
  if (visibility_display === "Public") visibility_display = undefined;
  if ((syntax_mode !== "null") & (syntax_mode !== undefined)) {
    console.log(syntax_mode);
    require(`codemirror/mode/${syntax_mode}/${syntax_mode}`);
  }

  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-3">
              <aside className="is-medium menu">
                <h2 className="title">/{url_hash}</h2>

                <ul className="menu-list">
                  <li>
                    <div className="field is-grouped">
                      <p className="control">
                        <Link
                          to={`${url_hash}/raw`}
                          className="button is-info is-medium"
                        >
                          <span>Raw</span>
                        </Link>
                      </p>

                      <p className="control">
                        <Link
                          to={`${url_hash}/download`}
                          className="button is-info is-medium"
                        >
                          <span>Download</span>
                        </Link>
                      </p>
                    </div>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="column is-9">
              <div className="content is-medium">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <div className="content">
                        <p className="title is-3">{title}</p>
                        <p className="subtitle is-5">
                          Created by{" "}
                          <strong>
                            {author_name ? `${author_name} ` : "a Guest User "}{" "}
                          </strong>
                          on{" "}
                          <strong>
                            {moment(created_date).format("MMM Do YYYY")}
                          </strong>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="level-right">
                    {visibility_display ? (
                      <div className="level-item">
                        <p className="subtitle is-5">
                          <strong>{visibility_display}</strong>
                        </p>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="level-item">
                      <p className="subtitle is-5">
                        <strong>{views}</strong> views
                      </p>
                    </div>
                    <div className="level-item">
                      <p className="button is-success is-medium is-static">
                        {syntax_name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <CodeMirror
                      value={text}
                      options={{
                        mode: syntax_mode,
                        theme: "material",
                        lineNumbers: true,
                        lineWrapping: true,
                        readOnly: true
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default DetailCore;
