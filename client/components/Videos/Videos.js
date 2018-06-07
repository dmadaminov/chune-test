import React from 'react'
import Navbar from '../Navbar'
import _ from 'lodash'
import { Row, Collapsible, CollapsibleItem, Button, Col, ProgressBar, Card } from 'react-materialize'
import { connect } from 'react-redux'
import { fetchVideos } from '../../store/videos'
import Player from './Player'
import { addVideo } from '../../store/currentVideo'
import { Redirect } from 'react-router-dom'
import { timestampToDate } from '../../helpers/populateArticles'
import '../../assets/global.css'

const Videos = props => {

    const startVideoInThumbArea = e => {
      e.preventDefault()
      props.addVideo(e.target.dataset.vid)
    }

    if (!props.artists.length) return <Redirect to="/artists"/>
    if (!props.videos.length) {
        Promise.all(props.artists.map(artist => {
            artist = artist.toLowerCase()
            props.fetchVideos(artist)
        }))
    }
    if (props.videos.length) {
      var arrangedEntries = props.videos ? [].concat.apply([], props.videos) : []

        arrangedEntries.sort((x,y) => {
            return y.date - x.date
        })
    }
    if (props.videos.length) {
      return (
          <div>
            <Row> <Navbar value={3} /> </Row>
            <div className="chune-feed-container">
              <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">Videos</h2></Row>
              <Row style={{paddingLeft: '10px', paddingRight: '10px'}}>

                  <Collapsible className="chune-collapsible">
                      {
                          props.artists.map((artist, index) => (
                              <CollapsibleItem key={artist} header={[_.startCase(artist), <i className="material-icons">expand_less</i>]} style={{backgroundColor: "#eeeeee"}}>
                                <Row style={{marginRight: '-10px', marginLeft: '-10px'}}>
                                  {
                                      arrangedEntries.map(video => {
                                          if (video.artist === artist.toLowerCase()) {
                                            let formattedDate = video.date ? ' -- '+timestampToDate(video.date) : ''

                                            return ( 
                                            <Col s={12}>
                                              <Card className='chune-card' key={video.ID}>
                                                    <div className="chune-card-image" style={{backgroundImage: 'url("'+video.image+'")'}}>
                                                        { props.currentVideo && props.currentVideo === video.url && <Player url={props.currentVideo} />}
                                                      </div>
                                                    <div className="chune-card-content-inner">
                                                      <span style={{fontSize:'12px', lineHeight: 1.3}}>via {video.source}{formattedDate} -- <a href={"/Artist?n="+encodeURI(video.artist)} style={{textTransform: 'capitalize'}} title={"You see this post because you follow "+video.artist}>{video.artist}</a></span>
                                                    <h4 style={{fontSize: '18px', lineHeight: 1.3, marginTop: '10px', marginBottom: '10px'}}>{video.title}</h4>
                                                    <a onClick={startVideoInThumbArea} data-vid={video.url} target="_blank" className={"chune-card-link chune-video-trigger"}>Watch Video</a>

                                                    </div>
                                              </Card>
                                            </Col>
                                          )
                                        }
                                      })
                                  }
                                </Row>
                              </CollapsibleItem>
                          ))
                      }
                  </Collapsible>
              </Row>
            </div>
          </div>
      )
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

const mapState = store => ({ videos: store.videos, artists: store.artists, currentVideo: store.currentVideo })
const mapDispatch = dispatch => ({
    fetchVideos: artists => dispatch(fetchVideos(artists)),
    addVideo: url => dispatch(addVideo(url))
})

export default connect(mapState, mapDispatch)(Videos)
