import React from 'react'
import { connect } from 'react-redux'
import Artists from './Artists/Artists'
import Navbar from './Navbar'
import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'
import { fetchRecentEntriesForMultipleArtists } from '../store/recentEntries'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { Redirect } from 'react-router-dom'
import { database, auth } from '../firebase'
import { addUser } from '../store/user';
import { fetchArticles } from '../store/articles'
import { timestampToDate } from '../helpers/populateArticles'
import { addArtists } from '../store/artists'
import VideoPlayer from './Videos/Player'
import '../assets/global.css'
import '../assets/landing.css'
import ArticleCard from './News/Article'
import VideoCard from './Videos/Video'
import SearchForm from './SearchForm'
import Waypoint from 'react-waypoint';
import Loading from './shared/Loading';
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

class Landing extends React.Component {

  componentDidMount() {
    //fetch latest recent entries list
    if (this.props.artists.length >= 0) {
      this.props.fetchRecentEntriesForMultipleArtists(this.props.artists.map(artist => artist.name))
    }
  }

  componentDidMount() {
    //fetch latest recent entries list
    if (this.props.artists.length >= 0) {
      this.props.fetchRecentEntriesForMultipleArtists(this.props.artists.map(artist => artist.name))
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
            <Navbar value={0} />
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
            <Navbar value={0} />
            <Paper className={classes.noentries}>
              <div> Oops! Looks like there is no recent articles or videos of artists you followed.</div>
            </Paper>
          </div>
        )
      }
    } else {
      return (
        <div>
            <Row> <Navbar value={0} /> </Row>
            <div className="chune-feed-container">
            	<Row style={{marginBottom: 0}}><h2 className="chune-feed-title">Recent Entries</h2></Row>
    	        <Row>
    	          <Col s={12}>
    	            <ProgressBar className="chune-progressbar" color="cyan" />
    	          </Col>
    	        </Row>
    	    </div>
        </div>
      )
    }
  }
}

const mapDispatch = dispatch => ({ 
  fetchRecentEntriesForMultipleArtists: (names, page) => dispatch(fetchRecentEntriesForMultipleArtists(names, page)),
})
const mapState = store => ({ 
  recentEntries: store.recentEntries.recentEntries,
  currentPage: store.recentEntries.currentPage,
  fetching: store.recentEntries.fetching,
  endOfList: store.recentEntries.endOfList,
  initialLoading: store.recentEntries.initialLoading,
  artists: store.followingArtists,
  userID: store.user
})

export default withStyles(styles)(withRouter(connect(mapState, mapDispatch)(Landing)));


