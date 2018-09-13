import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';

const styles = () => ({
  root: {
    width: 412,
    margin: '0px auto',
    '& .search-container': {
      width: 342,
      margin: '0px auto',
      height: 48,
    },
    '& .search-icon': {
      position: 'relative',
      top: 38,
      left: 47,
      width: 18,
      height: 18,
      color: '#7c7c7c',
    },
    '@media (max-width: 1023px)': {
      width: 350,
      '& .search-icon': {
        position: 'relative',
        top: 38,
        left: 22,
        width: 18,
        height: 18,
        color: '#7c7c7c',
      },
    },
  },
  input: {
    boxSizing: 'border-box',
    width: 342,
    height: 48,
    borderRadius: 4,
    backgroundColor: 'rgba(124, 124, 124, 0.08)',
    boxShadow: 'none',
    border: 'none',
    paddingLeft: 48,
    fontSize: 16,
    '&::placeholder': {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 0.1,
      color: '#7c7c7c',
    },
    '&:focus': {
      backgroundColor: '#ffffff',
      color: '#000000',
    }
  },
  resultsContainer: {
    backgroundColor: 'white',
    overflow: 'auto',
    width: '100%',
    height: 200,
  },
  suggestionHighlighted: {
    backgroundColor: '#552e89',
    opacity: 1,
    color: 'white',
    '& .suggestionItem': {
      color: 'white',
    }
  },
  suggestionContainer: {
    overflow: 'auto',
    backgroundColor: 'white',
  }
});
const SearchForm2 = ({
  value, suggestions,
  onChange, onSuggestionsFetchRequested,
  onSuggestionsClearRequested, classes,
  resetSearch, history
}) => {
  const inputProps = {
    placeholder: 'Search artists',
    value,
    style: {},
    onChange,
    id: 'search-input-inline',
  };

  const getSuggestionValue = suggestion => suggestion;

  const renderSuggestion = suggestion => (
    <MenuItem component="div" className={classes.suggestionContainer}>
      <div className="suggestionItem">
        {suggestion}
      </div>
    </MenuItem>
  );

  const renderSuggestionsContainer = (options) => {
    const { containerProps, children } = options;
    if (children) {
      return (
        <div {...containerProps} className={classes.resultsContainer}>
          {children}
        </div>
      );
    }
    return (
      <div {...containerProps}>
        {children}
      </div>
    );
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    resetSearch();
    history.push(`/Artist/${suggestion}`);
  };

  return (
    <div className={classes.root}>
      <SearchIcon className="search-icon" />
      <div className="search-container">
        <Autosuggest
          id="search-bar"
          theme={classes}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderSuggestionsContainer={renderSuggestionsContainer}
          inputProps={inputProps}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ...state.artistAutosuggestions
  };
}

function mapDispatchToProps(dispatch) {
}
export const SearchForm2Connect = withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm2)));
