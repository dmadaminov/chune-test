import React from 'react'
import Nav from '../Nav'
import { Row, Collapsible, CollapsibleItem } from 'react-materialize'
import { connect } from 'react-redux'
import { fetchVideos } from '../../store/videos'
import VidModal from './VidModal'

const Videos = props => {
    if (!props.artists.length) return <Redirect to="/artists"/>
    if (!props.videos.length) Promise.all(props.artists.map(artist => props.fetchVideos(artist)))
    return (
        <div>
            <Row> <Nav /> </Row>
            <Row style={{ paddingLeft: 10 }}> <h2> Videos </h2> </Row>
            <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Collapsible>
                    {
                        props.videos.length &&
                        props.artists.map(artist => (
                            <CollapsibleItem key={artist} header={artist}>
                                {
                                    props.videos.map(video => {
                                        if (video.artist === artist) return <Row key={video.url}> <VidModal url={video.url} title={video.title}/> </Row>
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

const mapState = store => ({ videos: store.videos, artists: store.artists })
const mapDispatch = dispatch => ({ fetchVideos: artists => dispatch(fetchVideos(artists)) })

export default connect(mapState, mapDispatch)(Videos)