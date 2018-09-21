import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Tweet } from 'react-twitter-widgets';

import { ArticleCardConnect } from './News/Article';
import { VideoCardConnect } from './Videos/Video';
import { EmptyListConnect } from './shared/EmptyList';
import { fethcMoreContentUser } from '../store/content/actions';
import { ChuneSupplyConnect } from './blocks';
import { Loading } from './shared/Loading';

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
    width: 650,
    paddingTop: 24,
    margin: '0 auto',
    boxShadow: 'none'
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
  // renderWaypoint = () => <Waypoint onEnter={this.loadMore} threshold={2.0} />

  renderItems = (contentFeed) => {
    const { classes } = this.props;
    return contentFeed.map((item) => {
      switch (item.type) {
        case 'video':
          return (
            <li className={classes.gridRow} key={item.id}>
              <VideoCardConnect video={item} autoplay={false} />
            </li>);
        case 'tweet': {
          const str = item.embed_url.split('/');
          return (
            <li className={classes.gridRow} key={item.id}>
              <div className="tweet">
                <Tweet tweetId={str[str.length - 1]} options={{ width: 500 }} />
              </div>
            </li>);
        }
        case 'article':
          return (
            <li className={classes.gridRow} key={item.id}>
              <ArticleCardConnect article={item} />
            </li>);
        default:
          return null;
      }
    });
  }

  // loadMore = () => {
  //   const { loadMoreItems } = this.props;
  //   loadMoreItems();
  // }

  render() {
    const {
      classes, contentFeed, artistTracks
    } = this.props;
    if (contentFeed.length === 0) return <Loading />;
    if (contentFeed.length) {
      return (
        <div className="foryou">
          <Grid container spacing={24} className="foryou-container">
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={classes.container}>
                <div className={classes.root}>
                  <ul className={classes.gridList}>
                    {this.renderItems(contentFeed)}
                    {/* {this.renderWaypoint()} */}
                  </ul>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4} className="rightGridListWrapper">
              <div className="chuneSupply">
                <ChuneSupplyConnect
                  supplies={artistTracks}
                  playingSupply={1}
                  onPlayPauseSupply={this.handleSupplyPlay}
                  foryou
                />
              </div>
            </Grid>
          </Grid>
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
  artists: store.dataArtists.artists,
  artistTracks: store.dataContent.artistTracks
});

export const ForYouConnect = withStyles(styles)(withRouter(connect(mapStateToProps, mapActionsToProps)(ForYou)));
