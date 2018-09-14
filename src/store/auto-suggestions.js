import axios from 'axios';

const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
const MAYBE_UPDATE_SUGGESTIONS = 'MAYBE_UPDATE_SUGGESTIONS';
const LOAD_SUGGESTIONS_BEGIN = 'LOAD_SUGGESTIONS_BEGIN';


export const loadSuggestionsBegin = () => {
  return {
    type: LOAD_SUGGESTIONS_BEGIN
  };
}

export const maybeUpdateSuggestions = (suggestions, value) => {
  return {
    type: MAYBE_UPDATE_SUGGESTIONS,
    suggestions,
    value
  };
}

export const loadSuggestions = (value) => {
  return dispatch => {
    dispatch(loadSuggestionsBegin());

    console.log("Calling ajax artists");
    axios.post('/autocomplete', { name: value })
        .then(res => { 
          // console.log("Returning res", res);
          // var transformedArtists = Object.keys(res.data);
          return dispatch(maybeUpdateSuggestions(res.data, value))
        }).catch( res => {
          console.log("ERROR calling suggestions", res);
        });
  };
}

export const updateInputValue = (value) => {
  return {
    type: UPDATE_INPUT_VALUE,
    value
  };
}

export const clearSuggestions = () => {
  return {
    type: CLEAR_SUGGESTIONS
  };
}


const initialState = {
  value: '',
  suggestions: [],
  isLoading: false
};

const autoSuggestionReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        value: action.value
      };

    case CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: []
      };

    case LOAD_SUGGESTIONS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case MAYBE_UPDATE_SUGGESTIONS:
      // Ignore suggestions if input value changed
      if (action.value !== state.value) {
        return {
          ...state,
          isLoading: false
        };
      }

      return {
        ...state,
        suggestions: action.suggestions,
        isLoading: false
      };

    default:
      return state;
  }
}

export default autoSuggestionReducer;
