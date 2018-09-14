import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';

import { searchArtists, clearListSearch, searchSelectArtist } from '../store/autosuggest/actions';

const styles = () => ({
  root: {
    position: 'relative',
    height: 74,
    boxSizing: 'border-box',
    backgroundColor: 'white',
    opacity: 1,
  },
  input: {
    paddingLeft: 40,
    margin: '5px auto 0 auto',
    height: 69,
    width: '99%',
    display: 'block',
    border: 'none',
    transition: 'all 2s',
    backgroundColor: '#ffffff',
    fontSize: 24,
    boxShadow: '0 0 4px 2px rgba(0, 0, 0, 0.25)',
    boxSizing: 'border-box',
    '&::placeholder': {
      fontFamily: 'Roboto',
      fontSize: 24,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 0.3,
      color: '#757575',
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
        fontFamily: 'Roboto',
        fontSize: 36,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 0.3,
        color: '#757575',
      },
    }
  },
  inputFocused: {
    border: 'none',
  },
  suggestionHighlighted: {
    backgroundColor: '#552e89',
    opacity: 1,
  },
  suggestionDivider: {
    marginTop: 5,
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
    height: 80,
    boxSizing: 'border-box',
    paddingLeft: 10,
    '&:hover': {
      backgroundColor: '#552e89',
      color: 'white',
      opacity: 1,
    },
    '@media (max-width: 1023px)': {
      height: 50,
      marginLeft: 16,
      width: 'calc(100vw - 32px)',
      marginRight: 16,
      paddingLeft: 16,
      '&:hover': {
        backgroundColor: '#552e89',
        color: 'white',
        opacity: 1,
        paddingLeft: 16,
      },
    }
  },
  suggestionItem: {
    fontSize: 24,
    height: 35,
    paddingLeft: 'calc(30px + 0.5%)',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 1023px)': {
      height: 35,
      paddingLeft: 0,
    }
  },
  container: {
    height: '100%',
    '@media (max-width: 1023px)': {
      height: '100%',
    }
  },
  closeIcon: {
    position: 'absolute',
    top: 17,
    right: 25,
    color: '#757575',
    cursor: 'pointer',
    width: 35,
    height: 35,
  }
});

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    const searchInput = document.getElementById('search-input');
    searchInput.focus();
  }

  getSuggestionValue = suggestion => suggestion

  renderSuggestion = (suggestion) => {
    const { classes } = this.props;
    return (
      <MenuItem component="div" className={classes.suggestionContainer}>
        <div className={classes.suggestionItem}>
          {suggestion.name}
        </div>
      </MenuItem>
    );
  }

  renderSuggestionsContainer = (options) => {
    const { classes } = this.props;
    const { containerProps, children } = options;
    const divider = <div className={classes.suggestionDivider} />;

    return (
      <div {...containerProps}>
        {children !== null ? divider : null}
        {children}
      </div>
    );
  }

  onSuggestionSelected = (event, { suggestion }) => {
    const { cancelSearch, selectArtist } = this.props;
    cancelSearch();
    selectArtist(suggestion.name);
  };

  onCloseClick = () => {
    const { cancelSearch } = this.props;
    cancelSearch();
  }


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    clearTimeout(this.timeout);
    const { searchListArtists } = this.props;
    this.timeout = setTimeout(() => {
      searchListArtists(value);
    }, 450);
  };

  onSuggestionsClearRequested = () => {
    const { clearListArtists } = this.props;
    clearListArtists();
    this.setState({
      value: ''
    });
  };

  timer;

  render() {
    const { suggestions, classes } = this.props;
    const { value } = this.state;
    const inputProps = {
      placeholder: 'Search artists',
      value,
      style: {},
      onChange: this.onChange,
      id: 'search-input',
    };
    return (
      <div className={classes.root}>
        <div>
          <Autosuggest
            id="search-bar"
            theme={classes}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
            inputProps={inputProps}
          />
          <CloseIcon className={classes.closeIcon} onClick={this.onCloseClick} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  suggestions: store.dataSearch.suggestions
});

const mapActionsToProps = dispatch => bindActionCreators({
  searchListArtists: searchArtists,
  clearListArtists: clearListSearch,
  selectArtist: searchSelectArtist
}, dispatch);

export const SearchFormConnect = withStyles(styles)(withRouter(connect(mapStateToProps, mapActionsToProps)(SearchForm)));
