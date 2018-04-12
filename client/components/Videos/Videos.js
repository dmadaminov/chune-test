import React from 'react'
import Nav from '../Nav'
import { Row, Collapsible, CollapsibleItem, Button, Col, ProgressBar } from 'react-materialize'
import { connect } from 'react-redux'
import { fetchVideos } from '../../store/videos'
import Player from './Player'
import { addVideo } from '../../store/currentVideo'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'

const Videos = props => {

    // const selectVideo = e => props.addVideo(e.target.value)
    const selectVideo = e => {
      props.addVideo(e.target.value)
      $("html, body").animate({ scrollTop: -10000 }, 1000);
    }


    if (!props.artists.length) return <Redirect to="/artists"/>
    if (!props.videos.length) Promise.all(props.artists.map(artist => props.fetchVideos(artist)))

    if (props.videos.length) {
      return (
          <div>
              <Row> <Nav /> </Row>
              <Row style={{ paddingLeft: 10 }}> <h2> Videos </h2> </Row>
              { props.currentVideo && <Row style={{paddingLeft:10, paddingRight:10}}><Player url={props.currentVideo} /> </Row>}
              <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Collapsible>
                      {
                          props.videos.length &&
                          props.artists.map(artist => (
                              <CollapsibleItem key={artist} header={artist}>
                                  {
                                      props.videos.map(video => {
                                          if (video.artist === artist) return <Row key={video.url}> <Button onClick={selectVideo} value={video.url}> {video.title} </Button> </Row>
                                      })
                                  }
                              </CollapsibleItem>
                          ))
                      }
                  </Collapsible>
              </Row>
          </div>
        )
    } else {
      return (
        <div>
            <Row> <Nav /> </Row>
            <Row style={{ paddingLeft: 10 }}> <h2> News </h2> </Row>
            <Row>
              <Col s={12}>
                <ProgressBar />
              </Col>
            </Row>
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
