import { GET_SNIPPETS, DELETE_SNIPPET, ADD_SNIPPET, CLEAR_SNIPPETS, GET_SNIPPET, GET_SYNTAXES, GET_TRENDS, TRENDS_LOADING, GET_FILE, SUCCESS_UNKNOWN, TRENDS_LOADED } from "../actions/types.js";

const initialState = {
  snippets: [],
  snippet: {},
  syntaxes: [],
  isLoading: false,
  file: {},
  isSuccessKnown: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SNIPPETS:
      return {
        ...state,
        snippets: action.payload
      };
    case DELETE_SNIPPET:
      return {
        ...state,
        snippets: state.snippets.filter(snippet => snippet.id !== action.payload)
      };
    case ADD_SNIPPET:
      return {
        ...state,
        snippets: [...state.snippets, action.payload]
      };
    case CLEAR_SNIPPETS:
      return {
        ...state,
        snippets: []
      };
    case GET_SNIPPET:
      return {
        ...state,
        snippet: action.payload,
        isSuccessKnown: true
      };
    case GET_FILE:
        return {
          ...state,
          file: action.payload
        };
    case GET_SYNTAXES:
      return {
        ...state,
        syntaxes: action.payload
      };
      case GET_TRENDS:
        return {
          ...state,
          snippets: action.payload,
          isLoading: false
        };
      case TRENDS_LOADING:
          return {
            ...state,
            isLoading: true
          };
      case TRENDS_LOADED:
            return {
              ...state,
              isLoading: false
            };
      case SUCCESS_UNKNOWN:
            return {
              ...state,
              isSuccessKnown: false
            };
        
    default:
      return state;
  }
}
