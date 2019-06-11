import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_SNIPPETS, DELETE_SNIPPET, ADD_SNIPPET, GET_SNIPPET, GET_SYNTAXES, GET_TRENDS, TRENDS_LOADING, TRENDS_LOADED, GET_FILE, SUCCESS_UNKNOWN} from "./types";
import { Router, Route, Link, Redirect } from "react-router-dom";

// GET SNIPPETS
export const getSnippets = () => (dispatch, getState) => {
  axios
    .get("/api/snippets", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SNIPPETS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET A SNIPPET
export const getSnippet  = id => (dispatch, getState) => {


    // success uknown
    dispatch({ type: SUCCESS_UNKNOWN });
  // we are loading
  dispatch({ type: TRENDS_LOADING });

  axios
    .get(`/api/snippets/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SNIPPET,
        payload: res.data
      });
       // we are done loading
    dispatch({ type: TRENDS_LOADED });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
       // we are done loading
    dispatch({ type: TRENDS_LOADED });
    }
    );
   
};

// GET FILE
export const getFile  = (id, history) => (dispatch, getState) => {
  const tokC = tokenConfig(getState).responseType = 'blob';


  axios.get(`/api/download/${id}`, tokC).then((response) => {
    const blob = new Blob([response.data], {type: response.data.type});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'unknown';
    if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2)
            fileName = fileNameMatch[1];
    }
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
  }).then(res => {
    console.log('File download')
    history.replace(`/snippets/${id}`);
  });
};




// DELETE SNIPPET
export const deleteSnippet = id => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteSnippet: "Snippet Deleted" }));
      dispatch({
        type: DELETE_SNIPPET,
        payload: id
      })

    })
    .catch(err => console.log(err));
};

// ADD SNIPPET
export const addSnippet = (lead, history) => (dispatch, getState) => {
  axios
    .post("/api/snippets", lead, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addSnippet: "Snippet Added" }));
      dispatch({
        type: ADD_SNIPPET,
        payload: res.data
      });
      console.log(res.data)
      history.push(`/snippets/${res.data.url_hash}`);
    })
    .catch(err => {
      console.log(err.response);
      dispatch(createMessage({ postSnippetError: "Error adding snippet" }));
    
    });
};


// GET SYNTAXES
export const getSyntaxes = () => (dispatch, getState) => {
  axios
    .get("/api/syntaxes", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SYNTAXES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};


// GET TRENDS 
export const getTrends= (time_period, sort) => (dispatch, getState) => {

  // we are loading
  dispatch({ type: TRENDS_LOADING });

console.log(`/api/trends/${time_period}${sort ? `?sort=${sort}` : ''}`)
  axios
    .get(`/api/trends/${time_period}${sort ? `?sort=${sort}` : ''}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TRENDS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  };

