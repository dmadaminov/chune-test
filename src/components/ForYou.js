import React from 'react'
import { connect } from 'react-redux'
import Artists from './Artists/Artists'
import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'
import { fetchRecentEntriesForMultipleArtists, clearRecentEntries } from '../store/recentEntries'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { Redirect } from 'react-router-dom'
import { database, auth } from '../firebase'
import { addUser } from '../store/user';
import { fetchArticles } from '../store/articles'
import { timestampToDate } from '../helpers/populateArticles'
import { addArtists } from '../store/artists'
import VideoPlayer from './Videos/Player'
import ArticleCard from './News/Article'
import VideoCard from './Videos/Video'
import SearchForm from './SearchForm'
import Waypoint from 'react-waypoint';
import Loading from './shared/Loading';
import EmptyList from './shared/EmptyList';
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "#fafafa",
  },
  gridList: {
    width: 716,
    borderRadius: 4,
  },
  subheader: {
    width: '100%',
  },
  gridRow: {
    height: "auto",
    marginBottom: 24,
    width: '100%'
  },
  container: {
    backgroundColor: "#fafafa",
    width: '100%',
    paddingTop: 24,
  },
  noentries: {
    width: 716,
    height: 300,
    margin: '178px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class ForYou extends React.Component {

  componentDidMount() {
    //fetch latest recent entries list
    if (this.props.artists.length >= 0) {
      this.props.fetchRecentEntriesForMultipleArtists(this.props.artists.map(artist => artist.name))
    }
  }

  componentDidMount() {
    this.props.clearRecentEntries();
    this.props.fetchRecentEntriesForMultipleArtists(this.props.artists.map(artist => artist.name))
  }

  _renderWaypoint = () => {
    if (!this.props.fetching && !this.props.endOfList) {
      return (
        <Waypoint onEnter={this._loadMoreItems} threshold={2.0} />
      );
    } else {
      return this.props.endOfList ? null : <Loading />;
    }
  }

  _renderItems = (recentEntries) => {
    const {classes} = this.props;

    return recentEntries.map(item => {
      return (
        <li className={classes.gridRow} key={`${item.url}::${item.ID}`} >
          {
            item.isVideo
            ? <VideoCard video={item} autoplay={false}/>
            : <ArticleCard article={item} />
          }
        </li>
      )
    })
  }

  _loadMoreItems = () => {
    const props = this.props;
    props.fetchRecentEntriesForMultipleArtists(props.artists.map(artist => artist.name), props.currentPage + 1);
  }

  render() {
    const { classes, artists, recentEntries, initialLoading } = this.props;

    if (!artists.length) return <Redirect to="/artists"/>

    if(!initialLoading) {
      if (recentEntries.length) {
        return (
          <div>
            <Paper className={classes.container}>
              <div className={classes.root}>
                <ul className={classes.gridList}>
                  {this._renderItems(recentEntries)}
                  {this._renderWaypoint()}
                </ul>
              </div>
            </Paper>
          </div>
        );
      } else {

        return (
          <div>
            <EmptyList
              messageOne={"Sorry, no recent media about your artists."}
              messageTwo={"Try using the search bar to follow another artist. Or go to artists page to follow artists related to your favorite ones."} />
          </div>
        )
      }
    } else {
      return (
        <div>
          <Loading />
        </div>
      )
    }
  }
}

const mapDispatch = dispatch => ({
  fetchRecentEntriesForMultipleArtists: (names, page) => dispatch(fetchRecentEntriesForMultipleArtists(names, page)),
  clearRecentEntries: () => dispatch(clearRecentEntries()),
})
const mapState = store => ({
  recentEntries: store.recentEntries.recentEntries,
  currentPage: store.recentEntries.currentPage,
  fetching: store.recentEntries.fetching,
  endOfList: store.recentEntries.endOfList,
  initialLoading: store.recentEntries.initialLoading,
  artists: store.followingArtists.artists,
  userID: store.user.uid,
})

export default withStyles(styles)(withRouter(connect(mapState, mapDispatch)(ForYou)));


