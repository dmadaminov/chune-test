import React from 'react'
import { connect } from 'react-redux'
import Artists from './Artists/Artists'
import Navbar from './Navbar'
import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'
import { fetchRecentEntries, fetchAllRecentEntries} from '../store/recentEntries'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { Redirect } from 'react-router-dom'
import { database, auth } from '../firebase'
import { addUser } from '../store/user';
import { fetchArticles } from '../store/articles'
import { timestampToDate } from '../helpers/populateArticles'
import { addArtists } from '../store/artists'
import { addVideo } from '../store/currentVideo'
import VideoPlayer from './Videos/Player'
import '../assets/global.css'
import '../assets/landing.css'
import ArticleCard from './News/Article'
import VideoCard from './Videos/Video'
import SearchForm from './SearchForm'

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
  }
});

class Landing extends React.Component {

  componentDidMount() {
    //fetch latest recent entries list
    if (this.props.artists.length >= 0) {
      this.props.fetchAllRecentEntries(this.props.artists)
    }
  }

  render() {
    const { classes, artists, recentEntries } = this.props;

    if (!artists.length) return <Redirect to="/artists"/>

    if (recentEntries.length) {
 
      return (
        <div>
          <Navbar value={0} />
          <Paper className={classes.container}>
            <div className={classes.root}>
              <ul className={classes.gridList}>
                {
                  recentEntries.map(item => {
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
              </ul>
            </div>
          </Paper>
        </div>
      );
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
  addArtists: artists => dispatch(addArtists(artists)),
  fetchArticles: name => dispatch(fetchArticles(name)),
	addUser: userID => dispatch(addUser(userID)),
  fetchAllRecentEntries: artists => dispatch(fetchAllRecentEntries(artists)),
	fetchRecentEntries: artists => dispatch(fetchRecentEntries(artists)),
  fetchVideos: artists => dispatch(fetchVideos(artists)),
  addVideo: url => dispatch(addVideo(url))
})
const mapState = store => ({ 
	userID: store.user,
  articles: store.articles,
 	recentEntries: store.recentEntries,
 	artists: store.artists,
  currentVideo: store.currentVideo 
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Landing));


