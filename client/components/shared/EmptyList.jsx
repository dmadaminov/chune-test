import React from 'react';
import { objectOf, any, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SearchForm2 from './SearchForm2';

const styles = () => ({
  root: {
    width: 412,
    margin: '178px auto',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 1023px)': {
      width: '100vw',
      margin: '80px auto',
    }
  },
  searchRing: {
    margin: '0px auto',
    width: 98,
    height: 98,
    marginBottom: 29,
  },
  description: {
    width: 412,
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.6,
    letterSpacing: 0.3,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.5)',
    '@media (max-width: 1023px)': {
      width: 344,
      margin: '0px auto',
    }
  },
});

const EmptyList = ({ classes, messageOne, messageTwo }) => (
  <div className={classes.root}>
    <img src="images/search-ring.svg" className={classes.searchRing} />
    <div className={classes.description}>
      { messageOne }
      <br />
      { messageTwo }
    </div>
    <div className={classes.searchBar}>
      <SearchForm2 />
    </div>
  </div>
);

export const EmptyListConnect = withStyles(styles)(EmptyList);

EmptyList.propTypes = {
  classes: objectOf(any).isRequired,
  messageOne: string.isRequired,
  messageTwo: string.isRequired
};
