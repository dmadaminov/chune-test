import React from 'react'
import Nav from '../Nav'
import { Row, Collapsible, CollapsibleItem, Button } from 'react-materialize'
import { connect } from 'react-redux'
import { fetchVideos } from '../../store/videos'
import Player from './Player'
import { addVideo } from '../../store/currentVideo'
import { Redirect } from 'react-router-dom'

class Videos extends React.Component{
    componentWillMount(){
        Promise.all(this.props.artists.map(artist => this.props.fetchVideos(artist)))
    }
    
    render(){
        const selectVideo = e => this.props.addVideo(e.target.value)
        if (!this.props.artists.length) return <Redirect to="/artists"/>
        return(
            <div>
            <Row> <Nav /> </Row>
            <Row style={{ paddingLeft: 10 }}> <h2> Videos </h2> </Row>
            { this.props.currentVideo && <Row style={{paddingLeft:10, paddingRight:10}}><Player url={this.props.currentVideo} /> </Row>}
            <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Collapsible>
                    {
                        this.props.videos.length &&
                        this.props.artists.map(artist => (
                            <CollapsibleItem key={artist} header={artist}>
                                {
                                    this.props.videos.map(video => {
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
    }
}

const mapState = store => ({ videos: store.videos, artists: store.artists, currentVideo: store.currentVideo })
const mapDispatch = dispatch => ({ 
    fetchVideos: artists => dispatch(fetchVideos(artists)),
    addVideo: url => dispatch(addVideo(url)) 
})

export default connect(mapState, mapDispatch)(Videos)