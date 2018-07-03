import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest'; 
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import { loadSuggestions, updateInputValue, clearSuggestions } from '../store/auto-suggestions';

import { connect } from 'react-redux'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const styles = (theme) => {
  return {
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100%',
      minHeight: '100vh',
      zIndex: 10000,
      boxSizing: 'border-box',
      backgroundColor: 'white',
      opacity: 1,
    },
    logoContainer: {
      height: 56,
      width: 95,
      paddingLeft: 25,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      paddingLeft: 24,
      margin: 0,
      height: 127,
      width: "100%",
      minHeight: 28,
      border: 'none',
      transition: "all 2s!important",
      backgroundColor: "#ffffff",
      fontSize: 96,
      // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.14)",
      boxSizing: 'border-box',
      '&::placeholder': {
        fontFamily: "Roboto",
        fontSize: 96,
        fontWeight: "normal",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "normal",
        letterSpacing: 0.3,
        color: "#757575",
      },
      '&:focus': {
        border: 'none',
        outline: 'none',
      },
      '@media (max-width: 1023px)': {
        height: 36,
        paddingLeft: 16,
        fontSize: 36,
        '&::placeholder': {
          fontFamily: "Roboto",
          fontSize: 36,
          fontWeight: "normal",
          fontStyle: "normal",
          fontStretch: "normal",
          lineHeight: "normal",
          letterSpacing: 0.3,
          color: "#757575",
        },
      }
    },
    inputFocused: {
      border: 'none',
    },
    suggestionHighlighted: {
      backgroundColor: "#552e89",
      opacity: 1,
    },
    suggestionDivider: {
      height: 13,
      borderTop: '1px solid rgba(0, 0, 0, 0.87)',
      marginTop: 50,
      '@media (max-width: 1023px)': {
        marginTop: 20,
        marginLeft: 16,
        marginRight: 16,
      },
    },
    suggestionContainer: {
      backgroundColor: 'white',
      opacity: 1,
      zIndex: 10,
      top: -10,
      height: 80,
      width: '100vw',
      boxSizing: 'border-box',
      paddingLeft: 24,
      '&:hover': {
        backgroundColor: "#552e89",
        color: 'white',
        opacity: 1,
        paddingLeft: 24,
      },
      '@media (max-width: 1023px)': {
        height: 50,
        marginLeft: 16,
        width: 'calc(100vw - 32px)',
        marginRight: 16,
        paddingLeft: 16,
        '&:hover': {
          backgroundColor: "#552e89",
          color: 'white',
          opacity: 1,
          paddingLeft: 16,
        },
      }
    },
    suggestionItem: {
      fontSize: 24,
      height: 35,
      paddingLeft: 30,
      display: 'flex',
      alignItems: 'center',
      '@media (max-width: 1023px)': {
        height: 35,
        paddingLeft: 0,
      }
    },
    container: {
      height: 73,
      '@media (max-width: 1023px)': {
        height: 56,
      }
    },
    closeIcon: {
      position: 'absolute',
      top: 10,
      right: 25,
      color: "#757575",
      cursor: 'pointer',
      width: 35,
      height: 35,
    }
  };
};

class SearchForm extends React.Component {
  componentDidMount() {
    var searchInput = document.getElementById('search-input');
    searchInput.focus();
  }

  render() {
    const userId = auth.currentUser.uid;
    const {
      value, suggestions, isLoading,
      onChange, onSuggestionsFetchRequested,
      onSuggestionsClearRequested, classes,
      resetSearch, cancelSearch,
    } = this.props;
    const inputProps = {
      placeholder: "Search artists",
      value,
      style: {},
      onChange,
      id: 'search-input',
    };

    const getSuggestionValue = (suggestion) => {
      return suggestion;
    }

    const renderSuggestion = (suggestion, { query, isHighlighted }) => {
      return (
        <MenuItem component="div" className={classes.suggestionContainer}>
          <div className={classes.suggestionItem}>
            {suggestion}
          </div>
        </MenuItem>
      );
    }

    const renderSuggestionsContainer = (options) => {
      const { containerProps, children } = options;
      const divider = <div className={classes.suggestionDivider} />;

      return (
        <div {...containerProps}>
          {children !== null ? divider : null}
          {children}
        </div>
      );
    }

    const onSuggestionSelected = (event, { suggestion }) => {
      // database.ref(`users/${userId}/artists`).update({[suggestion]: true});
      resetSearch();
      cancelSearch();
      this.props.history.push(`/Artist/${suggestion}`);
    };

    const onCloseClick = () => {
      resetSearch();
      cancelSearch();
    }

    return (
      <div className={classes.root}>
        <div className={classes.logoContainer}>
          <img src="images/logotype-color.svg" />
        </div>
        <div style={{margin: "0 auto", width: '100%'}}>
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
            inputProps={inputProps} />
            <CloseIcon className={classes.closeIcon} onClick={onCloseClick} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.artistAutosuggestions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange(event, { newValue }) {
      dispatch(updateInputValue(newValue));
    },
    resetSearch() {
      dispatch(updateInputValue(''));
    },
    onSuggestionsFetchRequested({ value }) {
      dispatch(loadSuggestions(value));
    },
    onSuggestionsClearRequested() {
      dispatch(clearSuggestions());
    },
  };
}
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm)));