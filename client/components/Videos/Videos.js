import React from 'react'
import Navbar from '../Navbar'
import _ from 'lodash'
import { Row, Collapsible, CollapsibleItem, Button, Col, ProgressBar, Card } from 'react-materialize'

import GridList from '@material-ui/core/GridList';
import Paper from '@material-ui/core/Paper';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux'
import { fetchVideosForMultipleArtists } from '../../store/videos'
import Player from './Player'
import VideoCard from './Video'
import { Redirect } from 'react-router-dom'
import { timestampToDate } from '../../helpers/populateArticles'
import '../../assets/global.css'
import Waypoint from 'react-waypoint';
import Loading from '../shared/Loading';
import EmptyList from '../shared/EmptyList';

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
  novideos: {
    width: 716,
    height: 300,
    margin: '178px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class Videos extends React.Component {

  componentDidMount() {
    if(!this.props.videos.length) {
      this.props.fetchVideosForMultipleArtists(this.props.artists.map(artist => artist.name))
    }
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

  _renderItems = (arrangedEntries) => {
    const {classes} = this.props;

    return arrangedEntries.map(video => {
      return (
        <li key={`${video.url}::${video.ID}`} className={classes.gridRow}>
          <VideoCard video={video} autoplay={false}/>
        </li>
      )
    })
  }

  _loadMoreItems = () => {
    const props = this.props;
    props.fetchVideosForMultipleArtists(props.artists.map(artist => artist.name), props.currentPage + 1);
  }

  render() {
    const { artists, videos, classes, addVideo, initialLoading} = this.props;

    if (!artists.length) return <Redirect to="/artists"/>
    if (!initialLoading) {
      if(videos.length > 0) {
        var arrangedEntries = videos ? [].concat.apply([], videos) : []

        arrangedEntries.sort((x,y) => {
            return y.date - x.date
        })
        if(arrangedEntries.length  <= 0) {
          return <div> Currently, there is no videos for artists you followed </div>;
        }
        return (
          <div>
            <Navbar value={3} />
            <Paper className={classes.container}>
              <div className={classes.root}>
                <ul className={classes.gridList}>
                  {this._renderItems(arrangedEntries)}
                  {this._renderWaypoint()}
                </ul>
              </div>
            </Paper>
          </div>
        );
      } else {
        return (
          <div>
            <Navbar value={3} />
            <EmptyList 
              messageOne={"Sorry, no recent videos about your artists."}
              messageTwo={"Try using the search bar to follow another artist. Or go to artists page to follow artists related to your favorite ones."} />
          </div>
        )
      }

    } else {
      return (
        <div>
          <Navbar value={2} />
          <Loading />
        </div>
      )
    }
  }
}

const mapState = store => ({ 
  videos: store.videos.videos,
  currentPage: store.videos.currentPage,
  fetching: store.videos.fetching,
  endOfList: store.videos.endOfList,
  initialLoading: store.videos.initialLoading,
  artists: store.followingArtists.artists,
  userID: store.user
})
const mapDispatch = dispatch => ({
    fetchVideosForMultipleArtists: (names, page) => dispatch(fetchVideosForMultipleArtists(names, page)),
    addVideo: url => dispatch(addVideo(url))
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Videos));
