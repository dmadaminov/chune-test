import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { ArticleCardConnect } from './News/Article';
import { VideoCardConnect } from './Videos/Video';
import { EmptyListConnect } from './shared/EmptyList';
import { fethcMoreContentUser } from '../store/content/actions';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  gridList: {
    width: 643,
    borderRadius: 4,
  },
  subheader: {
    width: '100%',
  },
  gridRow: {
    height: 'auto',
    marginBottom: 24,
    width: '100%'
  },
  container: {
    backgroundColor: '#fafafa',
    width: 643,
    paddingTop: 24,
    margin: '0 auto'
  },
  noentries: {
    width: 643,
    height: 300,
    margin: '178px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class ForYou extends React.Component {
  renderWaypoint = () => <Waypoint onEnter={this.loadMore} threshold={2.0} />

  renderItems = (contentFeed) => {
    const { classes } = this.props;
    return contentFeed.map(item => (
      <li className={classes.gridRow} key={item.id}>
        {
            item.type === 'video'
              ? <VideoCardConnect video={item} autoplay={false} />
              : <ArticleCardConnect article={item} />
          }
      </li>
    ));
  }

  loadMore = () => {
    const { loadMoreItems } = this.props;
    loadMoreItems();
  }

  render() {
    const {
      classes, contentFeed, artists
    } = this.props;

    if (artists.length) {
      return (
        <div>
          <Paper className={classes.container}>
            <div className={classes.root}>
              <ul className={classes.gridList}>
                {this.renderItems(contentFeed)}
                {this.renderWaypoint()}
              </ul>
            </div>
          </Paper>
        </div>
      );
    }
    return (
      <div>
        <EmptyListConnect
          messageOne="Sorry, no recent media about your artists."
          messageTwo="Try using the search bar to follow another artist. Or go to artists page to follow artists related to your favorite ones."
        />
      </div>
    );
  }
}

const mapActionsToProps = dispatch => bindActionCreators({
  loadMoreItems: fethcMoreContentUser
}, dispatch);

const mapStateToProps = store => ({
  contentFeed: store.dataContent.contentFeed,
  artists: store.dataArtists.artists
});

export const ForYouConnect = withStyles(styles)(withRouter(connect(mapStateToProps, mapActionsToProps)(ForYou)));
