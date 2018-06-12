import React from 'react'
import Navbar from '../Navbar'
import _ from 'lodash'
import { Row, Collapsible, CollapsibleItem, Button, Col, ProgressBar, Card } from 'react-materialize'

import GridList from '@material-ui/core/GridList';
import Paper from '@material-ui/core/Paper';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux'
import { fetchVideos } from '../../store/videos'
import Player from './Player'
import VideoCard from './Video'
import { addVideo } from '../../store/currentVideo'
import { Redirect } from 'react-router-dom'
import { timestampToDate } from '../../helpers/populateArticles'
import '../../assets/global.css'

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

class Videos extends React.Component {

  componentDidMount() {
    if(!this.props.videos.length) {
      Promise.all(this.props.artists.map(artist => {
        console.log("Fetch videos of ", artist);
          artist = artist.toLowerCase()
          this.props.fetchVideos(artist)
      }))
    }
  }

  render() {
    const { artists, videos, classes, addVideo} = this.props;
    // const startVideoInThumbArea = e => {
    //   e.preventDefault()
    //   addVideo(e.target.dataset.vid)
    // }

    if (!artists.length) return <Redirect to="/artists"/>
    if (videos.length) {
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
                {
                  arrangedEntries.map(video => {
                    return (
                      <li key={`${video.url}::${video.ID}`} className={classes.gridRow}>
                        <VideoCard video={video} autoplay={false}/>
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
          <Row> <Navbar value={3} /> </Row>
            <div className="chune-feed-container">
              <Row style={{marginBottom: 0}}><h2 className="chune-feed-title">Videos</h2></Row>
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

const mapState = store => ({ videos: store.videos, artists: store.artists, currentVideo: store.currentVideo })
const mapDispatch = dispatch => ({
    fetchVideos: artist => dispatch(fetchVideos(artist)),
    addVideo: url => dispatch(addVideo(url))
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Videos));
