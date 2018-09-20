import React from 'react';
import MediaQuery from 'react-responsive';
import { Row, Col, ProgressBar } from 'react-materialize';
import chunk from 'lodash/chunk';
import isEqual from 'lodash/isEqual';
import { objectOf, arrayOf, any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';

import { RelatedArtistCardConnect } from './RelatedArtistCard';

const styles = () => ({
  root: {
    width: 1080,
    height: 350,
    margin: '0 auto',
    '@media (max-width: 1023px)': {
      width: '100vw',
      margin: 0,
    }
  },
  subMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 27,
    '@media (max-width: 1023px)': {
      width: 348,
      margin: '24px auto',
    }
  },
  recommendedArtistHeading: {
    width: 244,
    height: 36,
    paddingTop: 3,
    paddingLeft: 4,
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    color: '#000000',
    '@media (max-width: 1023px)': {
      width: 124,
    }
  },
  moreButton: {
    width: 104,
    height: 36,
    backgroundColor: 'rgba(98, 2, 238, 0)',
    border: 'solid 1px rgba(0, 0, 0, 0.12)',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.14,
    letterSpacing: 1.3,
    textAlign: 'center',
    color: '#6200ee',
    '&:hover': {
      backgroundColor: 'rgba(98, 2, 238, 0)',
    },
    '&:focus': {
      backgroundColor: 'rgba(98, 2, 238, 0)',
    },
    '@media (max-width: 1023px)': {
      width: 72,
      border: 'none',
      paddingRight: 0,
      textAlign: 'right',
    }
  },
  heading: {
    width: 283,
    height: 28,
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    color: '#000000',
  },
  mobileListContainer: {
    '@media (max-width: 1023px)': {
      width: 357,
      margin: '18px 0px 18px 16px',
    }
  },
  gridList: {
    '@media (max-width: 1023px)': {
      width: 357,
      marginRight: 0,
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    }
  },
  gridListTile: {
    height: 260,
    '@media (max-width: 1023px)': {
      width: 249,
    }
  },
  container: {
    backgroundColor: '#fafafa',
    width: '100%',
    paddingTop: 24,
  }
});

class RelatedArtists extends React.Component {
  constructor(props) {
    super(props);
    const { relatedArtists } = this.props;
    const pages = chunk(relatedArtists, 3);
    this.state = {
      pages,
      totalPages: pages.length,
      currentPage: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { relatedArtists } = this.props;
    if (!isEqual(relatedArtists, prevProps.relatedArtists)) {
      const pages = chunk(relatedArtists, 3);
      this.setState({
        pages,
        totalPages: pages.length,
      });
    }
  }

  incrementPage = () => {
    const { currentPage, totalPages } = this.state;
    const newPage = (currentPage + 1) % totalPages;
    this.setState({
      currentPage: newPage,
    });
  }

  render() {
    const { classes } = this.props;
    const { pages, currentPage, totalPages } = this.state;

    if (totalPages > 0) {
      const activeArtists = pages[currentPage];
      const newArray = activeArtists.map(e => (
        <GridListTile key={e.id} className={classes.gridListTile}>
          <RelatedArtistCardConnect artist={e} />
        </GridListTile>
      ));
      return (
        <div className={classes.root}>
          <div className={classes.subMenuContainer}>
            <div className={classes.recommendedArtistHeading}>Recommended Artists</div>
            <Button className={classes.moreButton} onClick={this.incrementPage}>MORE</Button>
          </div>
          <MediaQuery minWidth={1024}>
            <GridList cols={3} className={classes.gridList} cellHeight={260} spacing={29}>
              {newArray}
            </GridList>
          </MediaQuery>
          <MediaQuery maxWidth={1023}>
            <div className={classes.mobileListContainer}>
              <GridList cols={1.37} className={classes.gridList} cellHeight={260} spacing={16} style={{ marginRight: 0 }}>
                {newArray}
              </GridList>
            </div>
          </MediaQuery>
        </div>
      );
    }
    return (
      <div>
        <div className="chune-feed-container">
          <h3 className={classes.heading}>Recommended Artists</h3>
          <Row>
            <Col s={12}>
              <ProgressBar className="chune-progressbar" color="cyan" />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export const RelatedArtistsConnect = withStyles(styles)(RelatedArtists);

RelatedArtists.propTypes = {
  classes: objectOf(any).isRequired,
  relatedArtists: arrayOf(any).isRequired
};
