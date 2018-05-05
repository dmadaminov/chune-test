import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Collection, CollectionItem, Button, Row } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { fetchArtist } from '../../store/currentArtist'
import Player from './Player'
import Nav from '../Nav'

const Music = props => {
    const loadSongs = e => { 
        const artist = e.target.value
        props.fetchArtist(artist)
    }
    if (!props.artists.length) return <Redirect to="/artists"/>
    return (
        <div>
            <Nav />
            <Row style={{ paddingLeft: 10 }}> <h2> Music </h2> </Row>
            {props.currentArtist && <Row style={{ paddingLeft: 10, paddingRight: 10 }}> <Player artistId={props.currentArtist} /> </Row>}
            <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Collection >
                {props.artists.map(artist => <CollectionItem key={artist}> <Button onClick={loadSongs} value={artist}> {_.startCase(artist)} </Button> </CollectionItem>)}
            </Collection>
            </Row>
        </div>
    )
}

const mapState = store => ({ artists: store.artists, currentArtist: store.currentArtist })
const mapDispatch = dispatch => ({ fetchArtist: name => dispatch(fetchArtist(name)) })

export default connect(mapState, mapDispatch)(Music)
