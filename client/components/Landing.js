import React from 'react'
import { connect } from 'react-redux'
import Auth from './Auth'
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

const Landing = (props) => {

  const { classes } = props;

    const startVideoInThumbArea = e => {
      e.preventDefault()
      props.addVideo(e.target.dataset.vid)
    }

    auth.onAuthStateChanged(user => {
        if (user) props.addUser(user.uid)
    })


    if (!props.userID) return ( // Renders SignIn and SignUp if there isn't anyone logged in
        <div>
            <Auth />
        </div>
    )

    if (!props.artists.length) {
	    const userId = auth.currentUser.uid
	    const userRef = database.ref(`users/${userId}/artists`)
	    userRef.on('value', snapshot => {
	        if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
	    })
    }

    if (!props.artists.length) return <Redirect to="/artists"/>
    if (!props.recentEntries.length) Promise.all(props.artists.map(artist => props.fetchRecentEntries(artist)))
    if (props.artists.length && !props.recentEntries.length) { 
      props.fetchAllRecentEntries(props.artists)
    }
    if (props.recentEntries.length) {
      // var recentEntriesFormatted = [].concat.apply([], props.recentEntries)
    	var recentEntriesFormatted = props.recentEntries
 
      return (
        <div>
          <Navbar value={0} />
          <Paper className={classes.container}>
            <div className={classes.root}>
              <ul className={classes.gridList}>
                {
                  recentEntriesFormatted.map(item => {
                    return (
                      <li key={item.ID} className={classes.gridRow}>
                        {
                          item.isVideo
                          ? <VideoCard video={item} autoplay={false}/>
                          : <ArticleCard article={item} key={item.ID}/>
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


